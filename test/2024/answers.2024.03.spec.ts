import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { solve } from '../../src/2024/day03'
import * as d03 from '../../src/2024/day03.doc'

describe('2024 answers - Day 03', () => {
  const input = readString(path.join(__dirname, '../resources/2024/input03.txt'))
  it ('multiply corrupted', async () => {
    const result = solve(input)
    assert.strictEqual(result.all, d03.part1)
    assert.strictEqual(result.enabled, d03.part2)
  })
})
