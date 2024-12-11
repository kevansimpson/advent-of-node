import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day07'
import * as d07 from '../../src/2024/day07.doc'

describe('2024 answers - Day 07', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input07.txt'))

  it('calibrate results', async () => {
    const result = solve(input)
    it('calibrations', async () => assert.strictEqual(result.calibration, d07.part1))
    it('concatenations', async () => assert.strictEqual(result.concatenation, d07.part2))
  })
})
