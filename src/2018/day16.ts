/**
 * @module 2018_day16
 */
import { clone, isEqual } from 'lodash'

export function countAmbiguous (cpu: CPU): [number, OperationMatches] {
  let count = 0
  const codes: OperationMatches = {}

  for (const mon of cpu.monitors) {
    let matches = []
    for (const opName of Object.keys(OPERATIONS)) {
      const op = OPERATIONS[opName]
      const test = clone(mon.before)
      op(test, mon.instruction)
      if (isEqual(test, mon.after)) {
        matches.push(opName)
        const opCode = mon.instruction[0]
        if (codes[opCode] &&
          codes[opCode]
            .findIndex(val => val === opName) < 0) codes[opCode].push(opName)
        else codes[opCode] = [ opName ]
      }
    }
    // if (matches.length === 1) console.log(`Op: ${matches} => ${mon.instruction[0]}`)
    if (matches.length >= 3) count += 1
  }

  return [count, codes]
}

const OPERATIONS: { [opName: string]: Operation } = {
  'addr': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] + d[i[2]],
  'addi': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] + i[2],
  'mulr': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] * d[i[2]],
  'muli': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] * i[2],
  'banr': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] & d[i[2]],
  'bani': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] & i[2],
  'borr': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] | d[i[2]],
  'bori': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] | i[2],
  'setr': (d: Device, i: Instruction) => d[i[3]] = d[i[1]],
  'seti': (d: Device, i: Instruction) => d[i[3]] = i[1],
  'gtir': (d: Device, i: Instruction) => d[i[3]] = i[1] > d[i[2]] ? 1 : 0,
  'gtri': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] > i[2] ? 1 : 0,
  'gtrr': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] > d[i[2]] ? 1 : 0,
  'eqir': (d: Device, i: Instruction) => d[i[3]] = i[1] === d[i[2]] ? 1 : 0,
  'eqri': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] === i[2] ? 1 : 0,
  'eqrr': (d: Device, i: Instruction) => d[i[3]] = d[i[1]] === d[i[2]] ? 1 : 0
}

const REGEX = /(\d+)+/g
function parse (input: string): Instruction | Device {
  const match = input.match(REGEX)
  if (!match) throw new Error(`Failed to parse: ${input}`)
  return [ +match[0], +match[1], +match[2], +match[3] ]
}

export function monitorCPU (input: string[]): CPU {
  const cpu = new CPU()
  let before: Device | undefined
  let after: Device | undefined

  for (let str of input) {
    if (str.trim().length === 0) continue
    if (str.startsWith('Before:')) before = parse(str)
    else if (str.startsWith('After:')) {
      after = parse(str)
      if (before) {
        cpu.monitors.push({
          before: before,
          after: after,
          instruction: cpu.instructions.pop() || [-1, -1, -1, -1]
        })
      }
    } else {
      cpu.instructions.push(parse(str))
    }
  }

  return cpu
}

export type OpCodeMap = { [opCode: number]: string }

export type OperationMatches = { [opCode: number]: string[] }

type Instruction = [ number, number, number, number ]

export type Device = [ number, number, number, number ]

type Operation = (device: Device, instruction: Instruction) => void

interface Monitor {
  before: Device
  after?: Device
  instruction: Instruction
}

export class CPU {
  device: Device = [0, 0, 0, 0]
  monitors: Monitor[] = []
  instructions: Instruction[] = []

  differentiateCodes (codes: OperationMatches): OpCodeMap {
    const map: OpCodeMap = {}
    while (true) {
      const singles: string[] = []
      for (const opCode of Object.keys(codes).map(str => +str)) {
        if (codes[opCode].length === 1) {
          const opName = codes[opCode][0]
          singles.push(opName)
          map[opCode] = opName
          delete codes[opCode]
        }
      }

      if (singles.length === 0) break

      for (const opCode of Object.keys(codes).map(str => +str)) {
        codes[opCode] = codes[opCode]
          .filter(opName => singles.findIndex(name => name === opName) < 0)
      }
    }

    return map
  }

  processInstructions (map: OpCodeMap): Device {
    for (const instr of this.instructions) {
      const op = OPERATIONS[map[instr[0]]]
      op(this.device, instr)
    }
    return this.device
  }
}
