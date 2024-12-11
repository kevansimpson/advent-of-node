import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day05'
import * as d05 from '../../src/2024/day05.doc'

describe('2024 answers - Day 05', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input05.txt'))
  it('page ordering', async () => {
    const result = solve(input)
    assert.strictEqual(result.middleSum, d05.part1)
    assert.strictEqual(result.corrected, d05.part2)
  })
})
