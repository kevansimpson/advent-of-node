/**
 * @module 2018_day14
 */
import { Link } from '../helpers/list.linked'

export function makeBackwardsRecipes (recipe: string): number {
  const count = recipe.length
  const target: number[] = []
  let answer = 0

  bake((length: number, newRecipes: number[]) => {
    let len = length - newRecipes.length
    for (const nr of newRecipes) {
      if (target.length < recipe.length) {
        target.push(nr)
      } else {
        target.shift()
        target.push(nr)
      }
      len++

      if (recipe === target.join('')) {
        answer = len - count
        return false
      }
    }

    if (recipe !== target.join('')) return true

    answer = length - count
    return false
  })

  return answer
}

export function makeRecipes (minimumCount: number): string {
  const minLength = minimumCount + 10
  let last = bake((length: number, _newRecipes: number[]) => length < minLength).jump(1 + minimumCount)
  const nextTen: number[] = []
  for (let i = 0; i < 10; i++) {
    nextTen.push(last.value)
    last = last.next
  }
  return nextTen.join('')
}

function bake (predicate: (length: number, newRecipes: number[]) => boolean): Link<number> {
  let elf1: Link<number> = new Link<number>(3)
  let elf2: Link<number> = elf1.push(new Link(7))
  let last: Link<number> = elf2
  let length = 2
  let newRecipes: number[] = [3, 7]

  while (predicate(length, newRecipes)) {
    const total = elf1.value + elf2.value
    newRecipes = total.toString().split('').map(v => +v)
    for (const nr of newRecipes) {
      last = last.push(new Link(nr))
      length += 1
    }

    elf1 = elf1.jump(1 + elf1.value)
    elf2 = elf2.jump(1 + elf2.value)
  }

  return last
}
