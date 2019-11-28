/**
 * @module 2015_day25
 */
import bigInt, { BigInteger } from 'big-integer'
import { Point } from '../helpers/point'

export function machineCode (xy: Point, targetValue: BigInteger = bigInt(2650453)): number {
  let next: BigInteger = bigInt(20151125)
  const max = xy[0] + xy[1]

  for (let index = 1; index < max; index++) {
    for (let x = 0; x <= index; x++) {
      next = nextValue(next)

      const y = index - x
      if ((x + 1) === xy[0] && (y + 1) === xy[1]) {
        return next.toJSNumber()
      }
    }
  }

  return targetValue.toJSNumber()
}

export function nextValue (bi: BigInteger): BigInteger {
  // multiplying it by 252533, and then keeping the remainder from dividing that value by 33554393.
  return bi.multiply(252533).mod(bigInt(33554393))
}
