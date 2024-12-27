/**
 * @module 2024_day11
 */

import { toString } from "lodash"

export function solve (input: string): [number, number] {
  const nums = input.split(' ').map(n => Number(n))
  let counter: Map<number, number> = new Map()
  nums.forEach(mark => {
    counter.set(mark, (getOrZero(counter, mark)) + 1)
  })

  for (let i = 0; i < 25; i++)
    counter = blink(counter)
  let blinks25 = 0
  for (let [_, mark] of counter)
    blinks25 += mark;

  for (let i = 0; i < 50; i++)
    counter = blink(counter)
  let blinks75 = 0
  for (let [_, mark] of counter)
    blinks75 += mark;

  return [blinks25, blinks75]
}

function blink(stones: Map<number, number>): Map<number, number> {
  const counter: Map<number, number> = new Map()
  for (let [stone, count] of stones) {
    if (stone == 0)
      counter.set(1, getOrZero(counter, 1) + count)
    else {
      const str = toString(stone)
      if ((str.length % 2) == 0) {
        const left = Number(str.substring(0, str.length / 2))
        const right = Number(str.substring(str.length / 2))
        counter.set(left, getOrZero(counter, left) + count)
        counter.set(right, getOrZero(counter, right) + count)
      }
      else {
        const mult = 2024 * stone
        counter.set(mult, getOrZero(counter, mult) + count)
      }
    }
  }
  return counter
}

function getOrZero(map: Map<number, number>, key: number): number {
  if (map.has(key))
      return map.get(key)!
  else
      return 0
}
