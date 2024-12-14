/**
 * @module helpers
 */

const indent: string = '                    '

export const NumberComparator = (a: number, b: number) => a - b

export function array2D<T> (size: number, value: T): T[][] {
  return Array.from(Array(size), _ => Array(size).fill((typeof value === 'function') ? value() : value))
}

export function debug (...messages: any[]): boolean {
  const flag = process.argv.includes('--advent')

  if (flag && messages && messages.length > 0) messages.forEach(m => console.log(m))
  return flag
}

export function start (name: string): void {
  if (debug()) console.time(`${indent}${name}`)
}

export function end (name: string, next?: string): void {
  if (debug()) console.timeEnd(`${indent}${name}`)
  if (next) start(next)
}

// https://stackoverflow.com/questions/12486883/write-a-modulo-function-using-only-addition-subtraction
export function modulo (numerator: number, denominator: number): number {
  let modulus = numerator
  let divisor = denominator

  while (divisor <= modulus && divisor <= Number.MAX_VALUE / 2) divisor <<= 1

  while (modulus >= denominator) {
    while (divisor > modulus) divisor >>= 1
    modulus -= divisor
  }

  return modulus
}

export function sum (intArray: number[], startingValue: number = 0): number {
  return intArray.reduce((a: number, b: number) => a + b, startingValue)
}

/**
 * Recursively builds all permutations of available list,
 * applying the specified consumer when available list is empty.
 *
 * @param available All available items.
 * @param permutation The current permutation of items under evaluation.
 * @param noneAvailable The consumer to apply when there are no available items.
 * @param <T> The type of item.
 */
export function buildAllPaths<T> (available: T[], permutation: T[], noneAvailable: Consumer<T[]>) {
  if (available.length === 0) {
    noneAvailable(permutation)
    return
  }

  for (let i = 0; i < available.length; i++) {
    const loc: T = available[i]
    const remaining: T[] = []
    available.slice(0, i).forEach(a => remaining.push(a))
    // remaining.addAll(available.subList(0, i));
    available.slice(i + 1, available.length).forEach(a => remaining.push(a))
    // remaining.addAll(available.subList(i + 1, available.size()));

    const newPerm: T[] = [...permutation]
    newPerm.push(loc)
    buildAllPaths(remaining, newPerm, noneAvailable)
  }
}

export function combinations<T>(data: T[], len: number): T[][] {
  const allCombos: T[][] = []
  comboUtil(data, allCombos, [], 0, len)
  return allCombos
}

function comboUtil<T>(data: T[], allCombos: T[][], combo: T[], index: number, missing: number) {
  if (missing === 0)
    allCombos.push(combo)
  else {
    for (let i = index; i <= data.length - missing; i++) {
      let newCombo: T[]
      if (i == data.length - missing)
        newCombo = combo
      else
        newCombo = [...combo]
      newCombo.push(data[i])
      comboUtil(data, allCombos, newCombo, i + 1, missing - 1)
    }
  }
}

type Consumer<T> = (input: T) => void

export function extractNumbers(str: string): number[] {
  return Array.from(str.matchAll(/(\d+)/g)).map(n => Number(n[0]))
}
