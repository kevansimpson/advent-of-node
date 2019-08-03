/**
 * @module 2018_day01
 */
import { sum as utilSum } from '../helpers/util'

export function sum (intArray: number[]): number {
  return utilSum(intArray)
}

export function findDuplicateFrequency (intArray: number[]): number {
  const frequencies: Set<number> = new Set()
  let sum = 0
  frequencies.add(sum)

  while (true) {
    for (let val of intArray) {
      sum += val
      if (frequencies.has(sum)) {
        return sum
      } else {
        frequencies.add(sum)
      }
    }
  }
}
