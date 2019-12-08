/**
 * @module 2019_day02
 */

export function runProgram (input: number[]): number[] {
  const codes = [...input]
  for (let x = 0; x < codes.length; x += 4) {
    const opCode = codes[x]
    switch (opCode) {
      case 99: return codes
      case 1:
        codes[codes[x + 3]] = codes[codes[x + 1]] + codes[codes[x + 2]]
        break
      case 2:
        codes[codes[x + 3]] = codes[codes[x + 1]] * codes[codes[x + 2]]
        break
    }
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
