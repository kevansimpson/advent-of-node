/**
 * @module 2018_day02
 */

export function checksum (input: string[]): number {
  let two = 0
  let three = 0
  input.map(countPairsAndTriples)
  .forEach(match => {
    if (Object.values(match).includes(2)) {
      two += 1
    }
    if (Object.values(match).includes(3)) {
      three += 1
    }
  })

  return two * three
}

export function countPairsAndTriples (text: string): any {
  const array: string[] = text.split('')
  const counts: any = {}
  array.forEach((value: string) => {
    if (counts[value]) {
      counts[value] += 1
    } else {
      counts[value] = 1
    }
  })

  return counts
}

export function findPrototype (input: string[]): string {
  const len = input.length
  const distance = require('fast-levenshtein')

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (distance.get(input[i], input[j]) === 1) {
        return removeDiff(input[i], input[j])
      }
    }
  }

  return 'nope'
}

export function removeDiff (text1: string, text2: string): string {
  return text1.split('').filter(x => text2.split('').includes(x)).join('')
}
