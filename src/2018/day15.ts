/**
 * @module 2018_day15
 */
import { Point, toKey } from '../helpers/point'
import { debug, sum } from '../helpers/util'

/**
 * Calling python script because my Typescript solution is correct but
 * not efficient enough for day's input.
 *
 * Calling python script from
 * <a href="https://gist.github.com/tredfern0/796f5d9c415f8a429fdc4e3a2334257f">
 * https://gist.github.com/tredfern0/796f5d9c415f8a429fdc4e3a2334257f</a>
 */
export function fastBattle (): number[] {
  const { execSync } = require('child_process')
  const output: string = execSync(`python ./src/2018/day15.py`).toString()
  console.log(`FOO => ${output}`)
  console.log(`BAR => ${typeof output}`)
  console.log(`JSN => ${JSON.stringify(output)}`)
  return output.split(/\s/g).map(str => +str).filter(num => num > 0)
}

enum MapPin {
  WALL = '#',
  CAVERN = '.',
  GOBLIN = 'G',
  ELF = 'E'
}

export function fightGoblins (input: string[]): Aftermath {
  const b: Battle = new Battle(input)

  // b.display()
  // let run = true

  outer:
    while (b.hasFoes()) {
      let dmgd = { 'G': false, 'E': false }
      const units = Object.values(b.units).sort((a, b) => a.readOrder() - b.readOrder())
      for (const u of units) {
        if (!b.hasFoes()) break outer
        dmgd[u.type] = combat(b, u.location[0], u.location[1]) || dmgd[u.type]
        // debug(`${JSON.stringify(u)} => ${b.hasFoes()} => ${dmgd}`)
        // if (!b.hasFoes() && !dmgd) break outer
      }

      // b.display()
      if (b.rounds > 50) {
        console.log(`dmgd => `, dmgd)
        Object.values(b.units).forEach(u => console.log(`#${JSON.stringify(u)}`))
      }
      // if (dmgd[MapPin.ELF] && dmgd[MapPin.GOBLIN]) {
      b.rounds += 1
      // debug(`============================================ ROUND ${b.rounds}`)
      // }
      // run = b.hasFoes()
    }

  // debug(`Finished w/ rounds = ${b.rounds}`)
  // Object.values(b.units).forEach(u => console.log(`#${JSON.stringify(u)}`))
  const dmg = sum(Object.values(b.units).map(u => u.hp).filter(hp => hp > 0))
  return {
    rounds: b.rounds,
    damage: dmg,
    outcome: dmg * b.rounds
  }
}

function combat (battle: Battle, x: number, y: number): boolean {
  const pin = battle.ground[y][x]
  const loc: Point = [x, y]
  switch (pin) {
    case MapPin.GOBLIN:
    case MapPin.ELF:
      const unit = battle.units[toKey(loc)]
      if (unit) {
        if (attack(unit, battle)) return true
        // identify target
        const target = identifyClosestTarget(battle, loc)
        if (target) {
          battle.move(unit, target[2])
          return attack(unit, battle)
        }
      } else throw new Error(`No Unit @ ${loc}`)
      break
    default:
      break
  }

  return false
}

function attack (unit: Unit, battle: Battle): boolean {
  let foe = inRange(unit, battle)
  if (foe) { // attack
    foe.hp -= unit.attack
    if (foe.hp <= 0) {
      battle.honorFallen(foe)
    }
    return true
  }

  return false
}

function inRange (unit: Unit, battle: Battle): Unit | undefined {
  // if (unit.type === MapPin.ELF && battle.rounds > -1) {
  //   console.log(`InRange  => ${JSON.stringify(surrounding(unit.location, battle))}`)
  // }
  const neighbors = surrounding(unit.location, battle)
    .map(pt => battle.units[toKey(pt)])
    .filter(u => (u) && u.type !== unit.type)
    .sort((a, b) => (a.hp === b.hp) ? a.readOrder() - b.readOrder() : a.hp - b.hp)

  // if (unit.type === MapPin.ELF && battle.rounds > -1) {
  //   console.log(`Neighbors=> ${JSON.stringify(neighbors)}`)
  // }
  return neighbors.length > 0 ? neighbors[0] : undefined
}

function identifyClosestTarget (battle: Battle, loc: Point): Target {
  const unit: Unit = battle.units[toKey(loc)]
  let closest: [number, Unit, Point] = [Number.MAX_VALUE, unit, loc]
  for (const pt of Object.keys(battle.units)) {
    const foe: Unit = battle.units[pt]
    if (foe.type !== unit.type) {
      const path: Point | undefined = findPath(unit, foe, battle)
      if (path) {
        const d = path.length
        if (d < closest[0] || // is this foe closer?
          // or is foe same distance but lower read order?
          (d === closest[0] && foe.readOrder() < closest[1].readOrder())) {
          // and there's a path to this foe?
          closest = [ d, foe, path ]
        }
      }
    }
  }
  // closest distance will still be MAX if no target is found
  return closest[0] === Number.MAX_VALUE ? undefined : closest
}

function findPath (unit: Unit, foe: Unit, battle: Battle): Point | undefined {
  let goodPaths: Point[][] = []
  let paths: Point[][] = surrounding(unit.location, battle).map(pt => [unit.location, pt])
  while (paths.length > 0) {
    const newPaths: Point[][] = []
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i]
      const l = p.length
      const last = p[l - 1]
      if (MapPin.CAVERN !== battle.ground[last[1]][last[0]]) continue

      const neighbors = surrounding(last, battle)
      for (let n of neighbors) {
        if (p.findIndex((pt: Point) => pt[0] === n[0] && pt[1] === n[1]) < 0) {
          if (foe.location[0] === n[0] && foe.location[1] === n[1]) {
            const gp = [...p, n]
            if (goodPaths.length === 0) goodPaths.push(gp)
            else if (gp.length < goodPaths[0].length) goodPaths = [gp]
            else if (gp.length === goodPaths[0].length) {
              if (readOrder(gp[0]) < readOrder(goodPaths[0][0])) goodPaths = [gp]
            }
          } else if (MapPin.CAVERN === battle.ground[n[1]][n[0]]) newPaths.push([...p, n])
        }
      }
    }

    paths = newPaths
  }

  return (goodPaths.length > 0) ? goodPaths.sort((a, b) => b.length - a.length)[0][1] : undefined
}

function readOrder (location: Point): number {
  return location[1] * 100 + location[0]
}

// no walls
function surrounding (pt: Point, battle: Battle): Point[] {
  const [ x, y ] = pt
  const pts: Point[] = []
  if (y > 0) pts.push([x, y - 1])
  if (x > 0) pts.push([x - 1, y])
  if (x < battle.width) pts.push([x + 1, y])
  if (y < battle.height) pts.push([x, y + 1])
  return pts.filter((loc: Point) => battle.ground[loc[1]][loc[0]] !== MapPin.WALL)
}

type Target = [number, Unit, Point] | undefined

type Aftermath = {
  rounds: number
  damage: number
  outcome: number
}

class Battle {
  ground: string[][]
  width: number  // x
  height: number // y
  rounds: number
  elvesHP: number
  outcome: number
  units: { [location: string]: Unit }

  constructor (input: string[]) {
    this.ground = input.map(str => str.split(''))
    this.width = this.ground[0].length
    this.height = this.ground.length
    this.rounds = 0
    this.elvesHP = 0
    this.outcome = 0
    this.units = {}
    let id = 0
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const pin = this.ground[y][x]
        switch (pin) {
          case MapPin.GOBLIN:
          case MapPin.ELF:
            const loc: Point = [x, y]
            this.units[toKey(loc)] = new Unit(id++, pin, loc)
            break
          default:
            break
        }

      }
    }
  }

  display (): void {
    for (let h = 0; h < this.height; h++) {
      debug(this.ground[h].join(''))
    }
  }

  honorFallen (fallen: Unit) {
    const loc = fallen.location
    delete this.units[toKey(loc)]
    this.ground[loc[1]][loc[0]] = MapPin.CAVERN
  }

  move (unit: Unit, newLocation: Point): void {
    delete this.units[toKey(unit.location)]
    const [x1, y1] = unit.location
    this.ground[y1][x1] = MapPin.CAVERN
    unit.location = newLocation
    this.units[toKey(newLocation)] = unit
    const [x2, y2] = newLocation
    this.ground[y2][x2] = unit.type
  }

  hasFoes () {
    const set = new Set(Object.values(this.units).map(u => u.type))
    return set.size > 1
  }
}

class Unit {
  id: number
  type: MapPin.ELF | MapPin.GOBLIN
  location: Point
  attack: number
  hp: number

  constructor (uuid: number, t: MapPin.ELF | MapPin.GOBLIN, pt: Point) {
    this.id = uuid
    this.type = t
    this.location = pt
    this.attack = 3
    this.hp = 200
  }

  readOrder () {
    return readOrder(this.location)
  }
}
