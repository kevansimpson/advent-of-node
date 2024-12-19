/**
 * @module 2024_day15
 */

import { splitByBlankLine } from '../helpers/input'
import { PointMap } from "../helpers/map"
import { Arrow, Point, move, moveXY } from "../helpers/point"

export function solveStandard(input: string[]): number {
  return solve(input, (lines: string[]) => new StandardWarehouse(lines))
}

export function solveWide(input: string[]): number {
  return solve(input, (lines: string[]) => new WideWarehouse(lines))
}

function solve(input: string[], factory: Factory, debug?: boolean): number {
  const data = splitByBlankLine(input)
  const warehouse = factory(data[0])

  if (debug)
    warehouse.display()

  const movements = data[1].join('').split('')
  for (let i = 0; i < movements.length; i++)
    warehouse.moveGuard(movements[i] as Arrow)

  if (debug)
    warehouse.display()

  return warehouse.sumGps()
}

type Factory = (input: string[]) => Warehouse

type Warehouse = {
  guard: Point
  moveGuard(dir: Arrow): void
  display(): void
  sumGps(): number
}

abstract class BaseWarehouse implements Warehouse {
  public width: number
  public height: number
  public grid: Array<string[]>
  guard: Point = [0,0]

  constructor(w: number, h: number) {
    this.width = w
    this.height = h
    this.grid = new Array(h)
  }

  abstract moveGuard(dir: Arrow): void
  abstract sumGps(): number

  move(dir: Arrow, pos: Point, moving: string): boolean {
    const at = this.get(pos)
    switch (at) {
      case '#': return false
      case '.': {
        this.set(pos, moving)
        return true
      }
      case 'O':
      case '[':
      case ']': {
        if (this.move(dir, move(pos, dir), at)) {
          this.set(pos, moving)
          return true
        }
      }
    }
    return false
  }

  public display() {
    console.log()
    for (let h = this.height - 1; h >= 0; h--) {
      const row = this.grid[h]
      console.log(row.join('').replaceAll(',', ''))
    }
    console.log()
  }

  sumGpsWith(box: string): number {
    let gps = 0
    for (let r = 0; r < this.height; r++)
      for (let c = 0; c < this.width; c++)
        if (this.grid[r][c] === box)
          gps += 100 * (this.height - r - 1) + c

    return gps
  }

  get(pos: Point): string {
    return this.grid[pos[1]][pos[0]]
  }

  set(pos: Point, at: string) {
    this.grid[pos[1]][pos[0]] = at
  }
}

class StandardWarehouse extends BaseWarehouse {

  constructor(input: string[]) {
    super(input.length, input.length)
    for (let r = this.height - 1; r >= 0; r--) {
      this.grid[this.height - r - 1] = new Array(this.width)
      for (let c = 0; c < this.width; c++) {
        const at = input[r][c]
        this.grid[this.height - r - 1][c] = at
        if (at === '@')
          this.guard = [c, this.height - r - 1]
      }
    }
  }

  public moveGuard(dir: Arrow) {
    const next = move(this.guard, dir)
    if (this.move(dir, next, '@')) {
      this.set(this.guard, '.')
      this.guard = next
    }
  }

  public sumGps(): number {
    return this.sumGpsWith('O')
  }
}


class WideWarehouse extends BaseWarehouse {

  constructor(input: string[]) {
    super(input.length * 2, input.length)
    for (let r = this.height - 1; r >= 0; r--) {
      const h = this.height - r - 1
      this.grid[h] = new Array(2 * this.width)
      for (let c = 0; c < this.height; c++) {
        const at = input[r][c]
        const w = 2 * c
        switch (at) {
          case '@': {
            this.guard = [w, h]
            this.grid[h][w] = at
            this.grid[h][w + 1] = '.'
            break
          }
          case 'O': {
            this.grid[h][w] = '['
            this.grid[h][w + 1] = ']'
            break
          }
          case '#':
          case '.': {
            this.grid[h][w] = at
            this.grid[h][w + 1] = at
            break
          }
        }
      }
    }
  }

  public moveGuard(dir: Arrow) {
    const next = move(this.guard, dir)
    switch (dir) {
      case '<':
      case '>': {
        if (this.move(dir, next, '@')) {
          this.set(this.guard, '.')
          this.guard = next
        }
        break
      }
      case '^':
      case 'v': {
        const moves = this.moveVertically(dir, this.guard, '@')
        if (moves.size > 0) {
          moves.forEach((at, pt) => this.set(pt, at))
          this.guard = next
        }
        break
      }
    }
  }

  public sumGps(): number {
    return this.sumGpsWith('[')
  }

  moveVertically(dir: Arrow, pos: Point, moving: string): PointMap<string> {
    const next = move(pos, dir)
    const at = this.get(next)
    switch (at) {
      case '.': {
        const map = new PointMap<string>()
        map.set(next, moving)
        map.set(pos, '.')
        return map
      }
      case '[': {
        const move1 = this.moveVertically(dir, next, at)
        const move2 = this.moveVertically(dir, moveXY(next, 1, 0), ']')
        if (move1.size > 0 && move2.size > 0) {
          const map = this.merge(move1, move2)
          map.set(next, moving)
          map.set(pos, '.')
          return map
        }
        break
      }
      case ']': {
        const move1 = this.moveVertically(dir, next, at)
        const move2 = this.moveVertically(dir, moveXY(next, -1, 0), '[')
        if (move1.size > 0 && move2.size > 0) {
          const map = this.merge(move1, move2)
          map.set(next, moving)
          map.set(pos, '.')
          return map
        }
        break
      }
    }
    return new PointMap<string>()
  }

  merge(m1: PointMap<string>, m2: PointMap<string>): PointMap<string> {
    const total = new PointMap<string>()
    m1.forEach((v, pt) => total.set(pt, v))
    m2.forEach((v, pt) => {
      if (!total.has(pt) || v !== '.')
        total.set(pt, v)
    })

    return total
  }
}