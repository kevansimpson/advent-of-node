import { Answer } from '../types/advent'

export function sum (intArray: number[]): Answer {
  return intArray.reduce((a: number, b: number) => a + b)
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
