/**
 * @module 2024_day06
 */

import { Point, ORIGIN, move, Arrow, toKey } from "../helpers/point"
import { PointSet, SetWithContentEquality } from "../helpers/set"

export function solve (input: string[]): [number, number] {
  const lab = createLab(input)
  const path = lab.followGuard()

  return [path.path.size, lab.findLoops(path.path)]
}

function createLab(input: string[]): Lab {
  const size = input.length
  const obstacles = new PointSet()
  let guard = ORIGIN
  let direction = -1
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const at = input[r][c]
      if (at === '#')
        obstacles.add([c, -r])
      else if (DIR.indexOf(at) >= 0) {
        guard = [c, -r]
        direction = DIR.indexOf(at)
      }
    }
  }

  return new Lab(size, obstacles, guard, direction)
}

const DIR = ['^','>','v','<']

class Lab {
  private size: number
  obstacles: PointSet
  private guard: Point = ORIGIN
  private direction: number = -1

  public constructor(sz: number, obs: PointSet, g: Point, dir: number) {
    this.size = sz
    this.obstacles = obs
    this.guard = g
    this.direction = dir
  }

  public findLoops(path: PointSet): number {
    let loops = 0
    path.forEach(pt => {
      const clone = this.cloneLab(pt)
      if (clone.followGuard().isLoop)
        loops++
    })
    return loops
  }

  public followGuard(): GuardPath {
    const encounters = new SetWithContentEquality<Encounter>(e => `${toKey(e.obstacle)}-${e.dir}`)
    const path = new PointSet()
    let pos = this.guard
    let dir = this.direction
    while (this.inLab(pos)) {
      path.add(pos)
      let next = move(pos, DIR[dir] as Arrow)
      while (this.obstacles.has(next)) {
        const e = { obstacle: next, dir: dir }
        if (encounters.has(e))
          return ({ path: path, isLoop: true})
        else
          encounters.add(e)
        dir = (dir + 1) % 4
        next = move(pos, DIR[dir] as Arrow)
      }
      pos = next
    }

    return ({ path: path, isLoop: false})
  }

  private inLab(loc: Point): boolean {
    return loc[0] >= 0 && loc[0] < this.size && loc[1] <= 0 && loc[1] > -this.size
  }

  public cloneLab(newObstacle: Point): Lab {
    const newObstacles = new PointSet()
    this.obstacles.forEach(o => newObstacles.add(o))
    newObstacles.add(newObstacle)
    return new Lab(this.size, newObstacles, this.guard, this.direction)
  }
}

type GuardPath = {
  path: PointSet
  isLoop: boolean
}

type Encounter = {
  obstacle: Point
  dir: number
}