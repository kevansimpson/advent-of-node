/**
 * @module 2024_day10
 */

import { cardinal, toKey, Point, inGrid } from "../helpers/point"

export type Trailheads = {
    sum: number,
    rating: number
}

export function solve (input: string[]): Trailheads {
  const size = input.length
  const trails: Trailheads[] = []
  let sum = 0
  let rating = 0
  for (let r = size - 1; r >= 0; r--) {
    for (let c = 0; c < size; c++) {
      if (input[r][c] == '0')
        trails.push(ascendTrail([c, size - r - 1], input, size))
    }
  }
  trails.forEach(t => {
    sum += t.sum
    rating += t.rating
  })

  return ({ sum: sum, rating: rating })
}

function ascendTrail(head: Point, allTrails: string[], size: number): Trailheads {
  let height = 0
  let steps = [head]
  while (steps.length > 0 && height < 9) {
    const h = `${++height}`
    const next: Point[] = []
    steps.forEach(step => {
      cardinal(step)
        .filter(pt => inGrid(pt, size, size) && allTrails[size - pt[1] - 1][pt[0]] === h)
        .forEach(pt => next.push(pt))
    })
    steps = next
  }

  return ({ sum: new Set(steps.map(pt => toKey(pt))).size, rating: steps.length })
}
