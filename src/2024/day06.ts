/**
 * @module 2024_day06
 */

import { Point, ORIGIN, move, Arrow, key, toKey, toPoint } from "../helpers/point"

export type GuardSteps = {
    unique: number,
    loops: number
}

export function solve (input: string[]): GuardSteps {
  const lab = createLab(input)
  // console.log(`lab = ${lab.obstacles.size}`) // same obstacles
  const path = lab.followGuard()
  // console.log(`path = ${path}`)

  return ({ unique: path.path.size, loops: lab.findLoops(path.path) })
}

function createLab(input: string[]): Lab {
  const size = input.length
  const obstacles = new Set<string>()
  let guard = ORIGIN
  let direction = -1
  for (let r = size - 1; r >= 0; r--) {
    for (let c = 0; c < size; c++) {
      const at = input[r][c]
      if (at === '#')
        obstacles.add(key(c, r))
      else if (DIR.indexOf(at) >= 0) {
        guard = [c, r]
        direction = DIR.indexOf(at)
      }
    }
  }

  console.log(`guard = ${guard}`)
  return new Lab(size, obstacles, guard, direction)
}


const DIR = ['^','>','v','<']

class Lab {
  private size: number
  obstacles: Set<string>
  private guard: Point = ORIGIN
  private direction: number = -1

  public constructor(sz: number, obs: Set<string>, g: Point, dir: number) {
    this.size = sz
    this.obstacles = obs
    this.guard = g
    this.direction = dir
  }

  public findLoops(path: Set<string>): number {
    let loops = 0
    path.forEach(pt => {
      const clone = this.cloneLab(toPoint(pt))
      if (clone.followGuard().isLoop)
        loops++
    })
    return loops
  }

  public followGuard(): GuardPath {
    const encounters = new Set<string>()
    const path = new Set<string>()
    let pos = this.guard
    let dir = this.direction
    while (this.inLab(pos)) {
      path.add(toKey(pos))
      let next = move(pos, DIR[dir] as Arrow)
      // console.log(`next = ${next}`)
      while (this.obstacles.has(toKey(next))) {
        const e = `${toKey(next)}-${dir}`
        // console.log(`encounter = ${e}`)
        if (encounters.has(e))
          return ({ path: path, isLoop: true})
        else
          encounters.add(e)
        dir = (dir + 1) % 4
        next = move(pos, DIR[dir] as Arrow)
      }
      pos = next
      // console.log(`${toKey(pos)} - ${dir}`)
    }

    return ({ path: path, isLoop: false})
  }

  private inLab(loc: Point): boolean {
    return loc[0] >= 0 && loc[0] < this.size && loc[1] >= 0 && loc[1] < this.size
  }

  public cloneLab(newObstacle: Point): Lab {
    const newObstacles = new Set(this.obstacles)
    newObstacles.add(toKey(newObstacle))
    return new Lab(this.size, newObstacles, this.guard, this.direction)
  }
}

type GuardPath = {
  path: Set<string>,
  isLoop: boolean
}