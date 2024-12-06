import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day04'
import * as d04 from '../../src/2024/day04.doc'

describe('2024 answers - Day 04', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input04.txt'))
  const result = solve(input)
  it('xmas count', async () => assert.strictEqual(result.xmas, d04.part1))
  it('mas crosses', async () => assert.strictEqual(result.masCross, d04.part2))
})
