import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day10'
import * as d10 from '../../src/2024/day10.doc'

describe('2024 answers - Day 10', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input10.txt'))
  it('ascend trails', async () => {
    const result = await solve(input)
    it('trail scores', async () => assert.strictEqual(result.sum, d10.part1))
    it('trail ratings', async () => assert.strictEqual(result.rating, d10.part2))  
  })
})
