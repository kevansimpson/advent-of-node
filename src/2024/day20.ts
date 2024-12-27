/**
 * @module 2024_day20
 */

import { PointMap } from "../helpers/map"
import { createRootNode, Node } from "../helpers/node"
import { cardinal, manhattanDistance, samePoint, Point } from "../helpers/point"

export function solve(input: string[]): [number, number] {
  const visited = findPath(createCourse(input))
  const list = visited.entries().sort((a, b) => a[1] - b[1])
  let part1 = 0
  let part2 = 0
  for (let p = 0; p < list.length - 1; p++) {
    const entry = list[p]
    for (let i = list.length - 1; i >= p + 1; i--) {
      const last = list[i]
      const md = manhattanDistance(entry[0], last[0])
      if (md <= 20) {
        if (Math.abs((entry[1] + md) - last[1]) >= 100) {
          part2++
          if (md === 2)
            part1++
        }
      }
    }
  }
  
  return [part1, part2]
}

function findPath(course: Course): PointMap<number> {
  const visited = new PointMap<number>()
  const paths: Node<Point>[] = []
  paths.push(createRootNode(course.start))

  while (paths.length > 0) {
    const node = paths.shift()!
    const pos = node.data!
    if (!visited.has(pos)) {
      visited.set(pos, node.depth)
      if (samePoint(pos, course.end))
        return visited
      else {
        cardinal(pos).forEach(next => {
          if (!visited.has(next) && course.grid[next[1]][next[0]] != '#')
            paths.push(node.addChild(next))
        })
      }
    }
  }
  return visited
}

type Course = {
  grid: string[][]
  size: number
  start: Point
  end: Point
}

function createCourse(input: string[]): Course {
  const size = input.length
  const grid: string[][] = []
  let start: Point = [0,0]
  let end: Point = [0,0]

  for (let r = size - 1; r >= 0; r--) {
    const row = size - r - 1
    grid.push([])
    for (let c = 0; c < size; c++) {
      const at = input[row][c]
      grid[row].push(at)
      if (at == 'S')
        start = [c, row]
      else if (at == 'E')
        end = [c, row]
    }
  }

  return ({ grid: grid, size: size, start: start, end: end })
}
