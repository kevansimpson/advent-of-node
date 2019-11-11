/**
 * @module helpers
 */

const indent: string = '                    '

export const NumberComparator = (a: number, b: number) => a - b

export function debug (...messages: string[]): boolean {
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

export function sum (intArray: number[]): number {
  return intArray.reduce((a: number, b: number) => a + b)
}
