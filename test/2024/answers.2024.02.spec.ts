import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day02'
import * as d02 from '../../src/2024/day02.doc'

describe('2024 answers - Day 02', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input02.txt'))
  it('inspect levels', async () => {
    const result = solve(input)
    it('safeLevels', async () => assert.strictEqual(result.safe, d02.part1))
    it('singleBad', async () => assert.strictEqual(result.singleBad, d02.part2))
  })
})
