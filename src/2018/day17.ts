/**
 * @module 2018_day17
 */
import { Direction, Point, key, move, toKey } from '../helpers/point'

enum Square {
  CLAY = '#',
  SAND = '.',
  PATH = '|',
  SPRING = '+',
  WATER = '~'
}

export function mapReservoir (input: string[]): Reservoir {
  const regex = /([xy\d]+)/g
  const reservoir: Reservoir = new Reservoir()

  for (const line of input) {
    const match = line.match(regex)
    if (!match) throw new Error(`Failed to parse: ${line}`)

    const xy1 = match[0]
    const d1 = +match[1]
    const d2 = +match[3]
    const d3 = +match[4]
    if (xy1 === 'x') {
      for (let y = d2; y <= d3; y++) reservoir.markClay(d1, y)
    } else if (xy1 === 'y') {
      for (let x = d2; x <= d3; x++) reservoir.markClay(x, d1)
    }
  }

  reservoir.ground[key(500, 0)] = Square.SPRING
  return reservoir
}

type Ground = { [ pt: string ]: Square }

export class Reservoir {
  ground: Ground = {}
  minX: number = 500
  maxX: number = 500
  minY: number = 500
  maxY: number = -1
  drops: Set<string> = new Set()

  water (): { 'water': number, 'path': number } {
    return Object.keys(this.ground).reduce((total, key) => {
      const y = +(key.split(',')[1].replace(']',''))
      if (y >= this.minY) {
        const ground = this.ground[key]
        if (ground === Square.WATER) total['water'] += 1
        if (ground === Square.PATH) total['path'] += 1
      }
      return total
    }, { 'water': 0, 'path': 0 })
  }

  dropOfWater (water: Point = [500, 0]) {
    // console.log(`DROP => ${water}`)
    const key = toKey(water)
    if (this.drops.has(key)) return
    else this.drops.add(key)
    // this.display()
    drop: while (true) { // trickle down
      const next = move(water, 'v')
      if (this.oob(next)) return

      switch (this.scanAt(next)) {
        case Square.WATER:
        case Square.CLAY:
          // check for left CLAY *and* right CLAY before filling row w/ water
          const left = this.hasClayLeft(water)
          const right = this.hasClayRight(water)
          if (left && right && this.hasFloor(left, right)) {
            // console.log(`hasFloor => ${left} => ${right}`)
            this.fillFloor(left, right)
            water = move(water, '^')
            continue drop
          }
          // console.log(`h2O => ${water}`)
          // if (!this.isPassableAt(water) && this.scanAt(water) !== Square.WATER)
          this.markAt(water, Square.PATH)
          this.flow(water, '<')
          this.flow(water, '>')
          break drop
        case Square.SAND:
        case Square.PATH:
          this.markAt(next, Square.PATH)
          water = next
          if (next[1] > this.maxY) return
          break
      }
    }
  }

  hasFloor (left: Point, right: Point): boolean {
    const floorY = left[1] + 1
    for (let x = left[0]; x <= right[0]; x++) {
      const ground = this.scan(x, floorY)
      if (ground !== Square.CLAY && ground !== Square.WATER) return false
    }
    return true
  }

  fillFloor (left: Point, right: Point): void {
    const floorY = left[1]
    for (let x = 1 + left[0]; x < right[0]; x++) this.mark(x, floorY, Square.WATER)
  }

  flow (xy: Point, dir: Direction): void {
    let flow = move(xy, dir)
    while (true) {
      if (this.oob(flow)) return

      const below = move(flow, 'v')
      if (!this.isPassableAt(flow)) break

      this.markAt(flow, Square.PATH)
      if (this.isPassableAt(below)) {
        this.dropOfWater(flow)
        break
      }
      flow = move(flow, dir)
    }
  }

  hasClayLeft (xy: Point): Point | undefined {
    for (let x = xy[0]; x >= this.minX; x--) {
      if (this.scan(x, xy[1]) === Square.CLAY) return [x, xy[1]]
    }
    return
  }

  hasClayRight (xy: Point): Point | undefined {
    for (let x = xy[0]; x <= this.maxX; x++) {
      if (this.scan(x, xy[1]) === Square.CLAY) return [x, xy[1]]
    }
    return
  }

  isPassable (x: number, y: number): boolean {
    const ground = this.scan(x, y)
    return (ground !== Square.CLAY && ground !== Square.WATER)
  }

  isPassableAt (xy: Point): boolean {
    return this.isPassable(xy[0], xy[1])
  }

  scan (x: number, y: number) {
    return this.ground[key(x, y)] || Square.SAND
  }

  scanAt (xy: Point) {
    return this.scan(xy[0], xy[1])
  }

  mark (x: number, y: number, type: Square) {
    this.ground[key(x, y)] = type
  }

  markAt (xy: Point, type: Square) {
    this.mark(xy[0], xy[1], type)
  }

  markClay (x: number, y: number) {
    this.mark(x, y, Square.CLAY)
    if (x < this.minX) this.minX = x - 2
    if (x > this.maxX) this.maxX = x + 2
    if (y < this.minY) this.minY = y
    if (y > this.maxY) this.maxY = y
  }

  oob (xy: Point): boolean {
    return (xy[1] > this.maxY || xy[1] < 0)
  }

  display () {
    for (let y = 0; y <= this.maxY; y++) {
      let row = ''
      for (let x = this.minX; x <= this.maxX; x++) {
        row += this.ground[key(x, y)] || Square.SAND
      }
      console.log(row)
    }
  }
}
