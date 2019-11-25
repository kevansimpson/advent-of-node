/**
 * @module 2015_day20
 */

export function lowestHouse (presents: number, max: number = MAX): number {
  const houses = new Array<number>(max).fill(0)

  for (let elf = 1; elf < max; elf++) {
    for (let visited = elf; visited < max; visited += elf) {
      houses[visited] += elf * 10
    }
  }

  return findTargetHouse(houses, presents)
}

export function lowestHouseWithExtraPresent (presents: number, max: number = MAX): number {
  const houses = new Array<number>(max).fill(0)

  for (let elf = 1; elf < max; elf++) {
    let count = 0
    for (let visited = elf; visited < max; visited += elf) {
      houses[visited] += elf * 11
      count += 1
      if (count >= 50) break
    }
  }

  return findTargetHouse(houses, presents)
}

const MAX = 1000000 // NOT to infinity and beyond

function findTargetHouse (houses: number[], target: number) {
  let answer = -1
  for (let i = 0; i < MAX; i++) {
    if (houses[i] >= target) {
      answer = i
      break
    }
  }

  return answer
}
