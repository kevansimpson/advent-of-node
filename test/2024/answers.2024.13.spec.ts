import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day13'
import * as d13 from '../../src/2024/day13.doc'

describe('2024 answers - Day 13', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input13.txt'))
  it('game moves', async () => {
    const result = solve(input)
    assert.strictEqual(result.near, d13.part1)
    assert.strictEqual(result.far, d13.part2)
  })
})
