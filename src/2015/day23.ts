/**
 * @module 2015_day23
 */
import { modulo } from '../helpers/util'

export function runProgram (input: string[], register: Register, target: string = 'b'): number {
  followInstructions(register, input, 0)
  return register[target]
}

function followInstructions (registers: Register, instructions: string[], index: number) {
  if (index < 0 || index >= instructions.length) return

  const tokens: string[] = instructions[index].replace(',', '').split(/\s/)
  switch (tokens[0]) {
    case 'hlf':
      const hlf = registers[tokens[1]]
      registers[tokens[1]] = hlf / 2
      followInstructions(registers, instructions, index + 1)
      break
    case 'tpl':
      const tpl = registers[tokens[1]]
      registers[tokens[1]] = tpl * 3
      followInstructions(registers, instructions, index + 1)
      break
    case 'inc':
      const inc = registers[tokens[1]]
      registers[tokens[1]] = inc + 1
      followInstructions(registers, instructions, index + 1)
      break
    case 'jmp':
      followInstructions(registers, instructions, index + +tokens[1])
      break
    case 'jie':
      const jie = registers[tokens[1]]
      if (modulo(jie, 2) === 0) followInstructions(registers, instructions, index + +tokens[2])
      else followInstructions(registers, instructions, index + 1)
      break
    case 'jio':
      const jio = registers[tokens[1]]
      if (jio === 1) followInstructions(registers, instructions, index + +tokens[2])
      else followInstructions(registers, instructions, index + 1)
      break
  }
}

type Register = { [key: string]: number }
