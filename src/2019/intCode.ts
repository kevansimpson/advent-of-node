/**
 * @module 2019_day02
 */

export interface IO {
  input: (x: number) => number,
  output: (x: number) => void
}

export const noop: IO = {
  input: (x: number) => x, // no op
  output: (x: number) => (x) // no op
}

export function intCode (codes: number[], io: IO = noop): number[] {
  let pmodes = [0]
  let x = 0

  while (x < codes.length) {
    // Parameter modes are stored in the same value as the instruction's opcode.
    const instr = codes[x].toString().padStart(5, '0')
    const opCode = +instr.substr(3)
    pmodes = instr.substr(0, 3).split('').map(Number).reverse()

    switch (opCode) {
      case 99:
        return codes
      case 1:
        codes[codes[x + 3]] = pmode(pmodes[0], codes[x + 1], codes) + pmode(pmodes[1], codes[x + 2], codes)
        x += 4
        break
      case 2:
        codes[codes[x + 3]] = pmode(pmodes[0], codes[x + 1], codes) * pmode(pmodes[1], codes[x + 2], codes)
        x += 4
        break
      case 3:
        const val = io.input(x)
        codes[codes[x + 1]] = val
        x += 2
        break
      case 4:
        const out = codes[codes[x + 1]]
        io.output(out)
        x += 2
        break
      case 5:
        if (pmode(pmodes[0], codes[x + 1], codes) !== 0) {
          x = (pmode(pmodes[1], codes[x + 2], codes))
        } else x += 3
        break
      case 6:
        if (pmode(pmodes[0], codes[x + 1], codes) === 0) {
          x = (pmode(pmodes[1], codes[x + 2], codes))
        } else x += 3
        break
      case 7:
        const val7 = (pmode(pmodes[0], codes[x + 1], codes) < pmode(pmodes[1], codes[x + 2], codes)) ? 1 : 0
        codes[codes[x + 3]] = val7
        x += 4
        break
      case 8:
        const val8 = (pmode(pmodes[0], codes[x + 1], codes) === pmode(pmodes[1], codes[x + 2], codes)) ? 1 : 0
        codes[codes[x + 3]] = val8
        x += 4
        break
      default:
        throw new Error(`Invalid OpCode: ${opCode}`)
    }
  }

  return [-1]
}

function pmode (pm: number, a: number, codes: number[]): number {
  return (pm === 1) ? a : codes[a]
}
