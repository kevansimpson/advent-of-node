/**
 * @module 2024_day08
 */

import { inGrid, moveXY, Point, toKey } from "../helpers/point"
import { combinations } from "../helpers/util"

export function solve (input: string[]): [number, number] {
  const size = input.length
  const scan: Map<string, Point[]> = scanAntennas(input)
  const nodes = new Set<string>
  const harmonics = new Set<string>

  scan.forEach(antennas => {
    const pairs = combinations(antennas, 2)
    pairs.forEach(pair => {
      const a = pair[0]
      const b = pair[1]
      harmonics.add(toKey(a))
      harmonics.add(toKey(b))
      const dx1 = a[0] - b[0]
      const dy1 = a[1] - b[1]
      const dx2 = b[0] - a[0]
      const dy2 = b[1] - a[1]
      let next1: Point = [a[0] + dx1, a[1] + dy1]
      let next2: Point = [b[0] + dx2, b[1] + dy2]
      if (inGrid(next1, size, size))
        nodes.add(toKey(next1))
      if (inGrid(next2, size, size))
        nodes.add(toKey(next2))
      while (inGrid(next1, size, size)) {
        harmonics.add(toKey(next1))
        next1 = moveXY(next1, dx1, dy1)
      }
      while (inGrid(next2, size, size)) {
        harmonics.add(toKey(next2))
        next2 = moveXY(next2, dx2, dy2)
      }
    })
  })
    
  return [nodes.size, harmonics.size]
}

function scanAntennas(input: string[]): Map<string, Point[]> {
  const map = new Map()
  for (let r = input.length - 1; r >= 0; r--) {
    for (let c = 0; c < input.length; c++) {
      const at = input[r][c]
      if (at != '.') {
        if (!map.has(at))
          map.set(at, [])
        map.get(at).push([c, r])
      }
    }
  }

  return map
}
