/**
 * @module 2018_day01
 */
import { Answer } from '../types/advent'
import { sum as utilSum } from '../helpers/util'

export function sum (intArray: number[]): Answer {
  return utilSum(intArray)
}

export function findDuplicateFrequency (intArray: number[]): Answer {
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
