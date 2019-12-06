import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { runProgram, targetProgram } from '../../src/2019/day02'
import * as d02 from '../../src/2019/day02.doc'

describe('2019 solutions - Day 02', () => {
  const input = readString(path.join(__dirname, 'input02.txt')).split(',').map(Number)
  // before running the program, replace position 1 with the value 12 and replace position 2 with the value 2
  const copy = [...input]
  copy[1] = 12
  copy[2] = 2
  it('runProgram', async () => assert.strictEqual(runProgram(copy)[0], d02.part1))
  it('targetProgram', async () => assert.strictEqual(targetProgram(input, 19690720), d02.part2))
})
