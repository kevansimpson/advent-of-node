import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day12'
import * as d12 from '../../src/2024/day12.doc'

describe('2024 answers - Day 12', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input12.txt'))
  it('fence costs', async () => {
    const result = solve(input)
    assert.strictEqual(result.perimeter, d12.part1)
    assert.strictEqual(result.sides, d12.part2)
  })
})
