import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day01'
import * as d01 from '../../src/2024/day01.doc'

describe('2024 answers - Day 01', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input01.txt'))
  it('list distances', async () => {
    const result = solve(input)
    assert.strictEqual(result.diff, d01.part1)
    assert.strictEqual(result.score, d01.part2)
  })
})
