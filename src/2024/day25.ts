/**
 * @module 2024_day25
 */

import { splitByBlankLine } from '../helpers/input'

export function solve(input: string[]): number {
  const keys: number[][] = []
  const locks: number[][] = []
  splitByBlankLine(input).forEach(schematic => {
    if (schematic[0] === '#####') // lock
      locks.push(toHeights(schematic))
    else
      keys.push(toHeights(schematic))
  })

  let count = 0
  keys.forEach(k => {
    locks.forEach(l => {
      if (fits(k, l))
        count++
    })
  })
  return count
}

function fits(key: number[], lock: number[]): boolean {
  for (let i = 0; i < 5; i++)
    if (key[i] + lock[i] > 5)
      return false
  return true
}

function toHeights(keyOrLock: string[]): number[] {
  const heights = new Array(5)
  heights.fill(-1)
  keyOrLock.forEach(kl => {
    for (let i = 0; i < 5; i++)
      if (kl[i] === '#')
        heights[i]++
  })
  return heights
}
