import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { OpCodeMap, countAmbiguous, monitorCPU } from '../../src/2018/day16'
import * as d16 from '../../src/2018/day16.doc'

describe('2018 solutions - Day 16', () => {
  const input = readLines(path.join(__dirname, 'input16.txt'))
  const cpu = monitorCPU(input)
  const ambiguous = countAmbiguous(cpu)
  it('countAmbiguous', async () => assert.strictEqual(ambiguous[0], d16.part1))
  const map: OpCodeMap = cpu.differentiateCodes(ambiguous[1])
  it('processInstructions', async () => assert.deepStrictEqual(cpu.processInstructions(map), d16.part2))
})
