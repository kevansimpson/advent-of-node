/**
 * @module 2015_day02
 */
import { NumberComparator } from '../helpers/util'

export function wrapPresents (dimensions: string[]): [number, number] {
  let total = 0
  let ribbon = 0

  for (const dim of dimensions) {
    let p: number[] = dim.split(/\s?x\s?/g).map(str => +str).sort(NumberComparator)
    if (p.length !== 3) throw new Error(dim)
    const present: Present = [p[0], p[1], p[2]]
    total += needsWrappingPaper(present)
    ribbon += needsRibbon(present)
  }

  return [total, ribbon]
}

type Present = [number, number, number]

function needsRibbon (dims: number[]): number {
  return (2 * dims[0]) + (2 * dims[1]) + (dims[0] * dims[1] * dims[2])
}

function needsWrappingPaper (dims: number[]): number {
  return (3 * dims[0] * dims[1]) + (2 * dims[1] * dims[2]) + (2 * dims[2] * dims[0])
}
