/**
 * @module 2019_day02
 */

type Op = (codes: number[], a: number, b: number, c: number) => void

export const operations: { [ opCode: number ]: Op } = {
  1: _add,
  2: _mult
}

export function runProgram (input: number[]): number[] {
  const codes = [...input]
  for (let x = 0; x < codes.length; x += 4) {
    const opCode = codes[x]
    if (opCode === 99) return codes
    else operations[opCode](codes, codes[x + 1], codes[x + 2], codes[x + 3])
  }

  throw new Error('Unknown Operation')
}

export function targetProgram (input: number[], target: number): number {
  for (let noun = 0; noun < 100; noun += 1) {
    for (let verb = 0; verb < 100; verb += 1) {
      const codes = [...input]
      codes[1] = noun
      codes[2] = verb
      if (target === runProgram(codes)[0]) return 100 * noun + verb
    }
  }

  return -1
}

function _add (codes: number[], a: number, b: number, c: number): void {
  codes[c] = codes[a] + codes[b]
}

function _mult (codes: number[], a: number, b: number, c: number): void {
  codes[c] = codes[a] * codes[b]
}
