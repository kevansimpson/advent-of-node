import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day08'
import * as d08 from '../../src/2024/day08.doc'

describe('2024 answers - Day 08', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input08.txt'))
  
  it('find antinodes', async () => {
    const result = solve(input)
    it('antinode count', async () => assert.strictEqual(result.count, d08.part1))
    it('harmonic antinodes', async () => assert.strictEqual(result.harmonics, d08.part2))
  })
})
