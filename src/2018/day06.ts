/**
 * @module 2018_day01
 */
import { Point, key, manhattanDistance } from '../helpers/point'
import { Answer } from '../types/advent'

export function findLargestArea (points: Point[]): Answer {
  const maxX = points.reduce((a, b) => a[0] > b[0] ? a : b)[0]
  const maxY = points.reduce((a, b) => a[1] > b[1] ? a : b)[1]
  const grid: Map<string, number> = new Map()
  const regions: Map<number, number> = new Map()

  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      let closest = maxX + maxY
      let targetId = -1

      for (let id = 0; id < points.length; id++) {
        const distance = manhattanDistance(points[id], [x, y])
        if (distance < closest) {
          closest = distance
          targetId = id
        } else if (distance === closest) {
          targetId = -1
        }
      }

      grid.set(key(x, y), targetId)
      const tally = regions.get(targetId) || 0
      regions.set(targetId, 1 + tally)
    }
  }

  // remove infinite regions
  for (let x = 0; x <= maxX; x++) {
    regions.delete(grid.get(key(x, 0)) || -2)
    regions.delete(grid.get(key(x, maxY)) || -2)
  }
  for (let y = 0; y <= maxY; y++) {
    regions.delete(grid.get(key(0, y)) || -2)
    regions.delete(grid.get(key(maxX, y)) || -2)
  }

  return Math.max(...regions.values())
}

export function findSafestArea (points: Point[], threshhold: number = 10000): Answer {
  const maxX = points.reduce((a, b) => a[0] > b[0] ? a : b)[0]
  const maxY = points.reduce((a, b) => a[1] > b[1] ? a : b)[1]
  let area = 0
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      let size = 0
      for (let pt of points) size += manhattanDistance(pt, [x, y])

      if (size < threshhold) area++
    }
  }

  return area
}

export function toPoints (input: string[]): Point[] {
  return input.map(str => str.split(/,\s*/g)).map(xy => [+xy[0], +xy[1]])
}
