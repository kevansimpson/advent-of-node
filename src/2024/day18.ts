/**
 * @module 2024_day18
 */

import { PointMap } from "../helpers/map"
import { Node, createRootNode } from "../helpers/node"
import { Point, cardinal, inGrid, samePoint } from "../helpers/point"

const SIZE = 71

export function solve(input: string[]): [number, string] {
  const unsafe: Point[] = []
  input.forEach(coord => {
    const arr = coord.split(',')
    unsafe.push([+arr[1], +arr[0]])
  })

  const memory = corruptMemory(unsafe)
  const part1 = findPath(memory)
  let firstBlocker: Point
  do {
    firstBlocker = unsafe.shift()!
    memory[firstBlocker[1]][firstBlocker[0]] = true
  } while (findPath(memory) > 0)

    return [part1, `${firstBlocker[1]},${firstBlocker[0]}`]
}

function findPath(memory: boolean[][]): number {
  let found = false
  const visited = new PointMap<number>
  const target: Point = [SIZE - 1, SIZE - 1]
  let minSteps = Number.MAX_SAFE_INTEGER
  const paths: Node<Point>[] = [createRootNode([0,0])]

  while (paths.length > 0) {
    const node = paths.shift()!
    const pos = node.data!
    if (!visited.has(pos)) {
      visited.set(pos, node.depth)

      if (samePoint(pos, target)) {
        found = true
        minSteps = node.depth
      }
      else {
        cardinal(pos).forEach(next => {
          if (inGrid(next, SIZE, SIZE) && !visited.has(next) && !memory[next[1]][next[0]])
            paths.push(node.addChild(next))
        })
      }
    }
  }

  return (found) ? minSteps - 1 : -1
}

function corruptMemory(unsafe: Point[]): boolean[][] {
  const memory = []
  for (let r = 0; r < SIZE; r++)
    memory.push(new Array(71).fill(false))

  for (let i = 0; i < 1024; i++) {
    const corrupted = unsafe.shift()!
    memory[corrupted[1]][corrupted[0]] = true
  }
  return memory
}