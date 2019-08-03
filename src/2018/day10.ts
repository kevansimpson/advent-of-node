/**
 * @module 2018_day01
 */
import { Answer } from '../types/advent'
import { Point } from '../helpers/point'
import { debug } from '../helpers/util'

export function alignStars (points: MovingPoint[], threshold: number): Answer {
  let secs = 0
  let deltaY = Number.MAX_VALUE
  let list: MovingPoint[] = [...points]

  while (true) {
    secs += 1
    const next: MovingPoint[] = list.map(mpt => {
      return {
        point: [mpt.point[0] + mpt.velocity[0], mpt.point[1] + mpt.velocity[1]],
        velocity: mpt.velocity
      }
    })
    const minY = calcMin(list, 1)
    const maxY = calcMax(list, 1)
    const newDeltaY = Math.abs(maxY - minY)

    if (newDeltaY > deltaY) break
    else deltaY = newDeltaY

    if (deltaY < threshold) {
      if (debug()) display(next).forEach(line => console.log(line))
      break
    }

    list = next
  }

  return secs
}

export function toMovingPoints (input: string[]): MovingPoint[] {
  return input.map(str => {
    const match: RegExpMatchArray | null = str.match(/(-?\d+)/g)
    if (match) {
      return {
        point: [+match[0], +match[1]],
        velocity: [+match[2], +match[3]]
      }
    } else throw new Error(`Not a MovingPoint: ${str}`)
  })
}

function calcMax (mpts: MovingPoint[], index: 0 | 1): number {
  let max = Number.MIN_VALUE
  for (let mpt of mpts) {
    if (mpt.point[index] > max) max = mpt.point[index]
  }

  return max
}

function calcMin (mpts: MovingPoint[], index: 0 | 1): number {
  let min = Number.MAX_VALUE
  for (let mpt of mpts) {
    if (mpt.point[index] < min) min = mpt.point[index]
  }

  return min
}

function display (points: MovingPoint[]): string[] {
  const border = 1
  const minX = calcMin(points, 0) - border
  const maxX = calcMax(points, 0) + border
  const minY = calcMin(points, 1) - border
  const maxY = calcMax(points, 1) + border
  const list: Point[] = points.map(mpt => mpt.point)

  const buff: string[] = []
  for (let y = minY; y <= maxY; y++) {
    const line: string[] = []
    for (let x = minX; x <= maxX; x++) {
      line.push(includes(list, [x, y]) ? '#' : '.')
    }
    buff.push(line.join(''))
  }

  return buff
}

function includes (list: Point[], target: Point): boolean {
  for (let pt of list) {
    if (pt[0] === target[0] && pt[1] === target[1]) return true
  }
  return false
}

export type Velocity = [number, number] // horizontal, vertical

export type MovingPoint = {
  point: Point
  velocity: Velocity
}
