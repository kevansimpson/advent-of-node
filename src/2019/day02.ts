/**
 * @module 2019_day02
 */
import { intCode } from './intCode'

export function targetProgram (input: number[], target: number): number {
  for (let noun = 0; noun < 100; noun += 1) {
    for (let verb = 0; verb < 100; verb += 1) {
      const codes = [...input]
      codes[1] = noun
      codes[2] = verb
      if (target === intCode(codes)[0]) return 100 * noun + verb
    }
  }

  return -1
}
