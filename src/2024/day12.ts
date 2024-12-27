/**
 * @module 2024_day12
 */

import { cardinal, inGrid, Point } from "../helpers/point"
import { PointSet } from "../helpers/set"

export function solve (input: string[]): [number, number] {
  const size = input.length
  let perimeter = 0
  let sides = 0
  const visited: boolean[][] = []
  for (let v = 0; v < size; v++)
    visited.push(new Array(size).fill(false))

  for (let r = size - 1; r >= 0; r--) {
    for (let c = 0; c < size; c++) {
      if (!visited[c][size - r - 1]) {
        const region = mapRegion(input[r][c], [c, size - r - 1], visited, input, size)
        perimeter += regionCost(region, size)
        sides += sidesCost(region, size)
        region.plot.forEach(pt => visited[pt[0]][pt[1]] = true)
      }
    }
  }

  return [perimeter, sides]
}

function regionCost(region: Region, size: number): number {
  let perimeter = 0
  region.plot.forEach(pt => {
    cardinal(pt).forEach(c => {
      if (!inGrid(c, size, size) || !region.plot.has(c))
        perimeter++
    })
  })

  return perimeter * region.plot.size
}

function sidesCost(region: Region, size: number): number {
  let sides = 0
  let vertical = new Set<number>
  for (let i = 0; i < size; i++) {
    let vert1 = new Set<number>
    region.plot.forEach(pt => {
      if (pt[0] == i) {
        vert1.add(-1 * (pt[1] + 1))
        vert1.add(pt[1] + 2)
      }
    })

    let vert2 = new Set<number>
    vert1.forEach(v => {
      if (!vert1.has(-1 * v))
        vert2.add(v)
    })

    vert2.forEach(v => {
      if (!vertical.has(v))
        sides++
    })
    vertical = vert2
  }

  let horizontal = new Set<number>
  for (let i = 0; i < size; i++) {
    let horiz1 = new Set<number>
    region.plot.forEach(pt => {
      if (pt[0] == i) {
        horiz1.add(-1 * (pt[1] + 1))
        horiz1.add(pt[1] + 2)
      }
    })

    let horiz2 = new Set<number>
    horiz1.forEach(v => {
      if (!horiz1.has(-1 * v))
        horiz2.add(v)
    })

    horiz2.forEach(v => {
      if (!horizontal.has(v))
        sides++
    })
    horizontal = horiz2
  }

  return sides * region.plot.size
}

function mapRegion(plant: string, start: Point, visited: boolean[][], input: string[], size: number): Region {
  const garden = new PointSet()
  let plot = [start]
  while (plot.length > 0) {
    plot.forEach(pt => {
      garden.add(pt)
      visited[pt[0]][pt[1]] = true
    })
  
    const next: Point[] = []
    plot.forEach(pt => {
      cardinal(pt).forEach(c => {
        const nextHas = (item: Point) => item[0] === c[0] && item[1] === c[1]
        if (inGrid(c, size, size) &&
            plant === input[size - c[1] - 1][c[0]] &&
            !visited[c[0]][c[1]] &&
            next.findIndex(nextHas) < 0)
          next.push(c)
      })
    })
    plot = next
  }

  return new Region(plant, garden)
}

class Region {
  public plant: string
  public plot: PointSet

  constructor(p: string, set: PointSet) {
    this.plant = p
    this.plot = set
  }

  public toString = () : string => {
    return `Region(plant=${this.plant},plot=${this.plot.toString()})`
  }
}
