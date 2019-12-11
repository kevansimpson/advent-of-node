/**
 * @module 2019_day05
 */
import { IO, intCode } from './intCode'

export class Enhanced implements IO {
  input: (x: number) => number
  output: (x: number) => void
  value: number = -1

  constructor (v: number) {
    this.value = v
    this.input = function (_x: number): number {
      return this.value
    }
    this.output = function (x: number): void {
      this.value = x
    }
  }

  run (codes: number[]): number {
    intCode(codes, this)
    return this.value
  }
}
