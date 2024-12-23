/**
 * @module 2024_day17
 */

import { extractNumbers } from '../helpers/util'

export function runProgram(input: string[]): string {
  return from(input).run()
}

export function lowestRegisterA(input: string[]): bigint {
  const p = from(input)
  const target = p.opCodes.join(',')
  const answers: bigint[] = []
  recurse(1n, target, p.opCodes, answers)

  let min: bigint = answers[0]
  for (let i = 1; i < answers.length; i++)
    if (answers[i] < min)
      min = answers[i]
  return min
}

function recurse(a: bigint, target: string, codes: number[], answers: bigint[]) {
  for (let add = 0; add < 8; add++) {
    const next = BigInt(add) + BigInt(a)
    const p = new Program(next, 0n, 0n, codes)
    const out = p.run()
    if (out.length > target.length)
      return

    if (target.toString() == out.toString())
      answers.push(next)
    else if (target.endsWith(out))
      recurse(next * 8n, target, codes, answers)
  }
}

function from(input: string[]): Program {
  return new Program(
    BigInt(extractNumbers(input[0])[0]),
    BigInt(extractNumbers(input[1])[0]),
    BigInt(extractNumbers(input[2])[0]),
    extractNumbers(input[4]))
}

class Program {
  public a: bigint
  public b: bigint
  public c: bigint
  public opCodes: number[]
  public output: bigint[] = []

  constructor(a: bigint, b: bigint, c: bigint, codes: number[]) {
    this.a = a
    this.b = b
    this.c = c
    this.opCodes = codes
  }

  public run(): string {
    let pointer = 0
    while (pointer < this.opCodes.length) {
      switch (this.opCodes[pointer]) {
        case 0:
          this.a /= 2n ** this.combo(this.opCodes[pointer + 1])
          pointer += 2
          break
        case 1:
          this.b ^= BigInt(this.opCodes[pointer + 1])
          pointer += 2
          break
        case 2:
          this.b = this.mod(this.combo(this.opCodes[pointer + 1]), 8n)
          pointer += 2
          break
        case 3:
          if (this.a === 0n)
            pointer += 2
          else
            pointer = this.opCodes[pointer + 1]
          break
        case 4:
          this.b ^= this.c
          pointer += 2
          break
        case 5:
          this.output.push(this.mod(this.combo(this.opCodes[pointer + 1]), 8n))
          pointer += 2
          break
        case 6:
          this.b = this.a / 2n ** (this.combo(this.opCodes[pointer + 1]))
          pointer += 2
          break
        case 7:
          this.c = this.a / 2n ** (this.combo(this.opCodes[pointer + 1]))
          pointer += 2
          break
        }
    }
    return this.output.join(',')
  }

  combo(operand: number): bigint {
    switch (operand) {
      case 4: return this.a
      case 5: return this.b
      case 6: return this.c
      default: return BigInt(operand)
    }
  }

  mod(a: bigint, b: bigint): bigint {
    return ((a % b) + b) % b
  }
}
