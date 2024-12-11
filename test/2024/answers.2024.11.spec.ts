import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { solve } from '../../src/2024/day11'
import * as d11 from '../../src/2024/day11.doc'

describe('2024 answers - Day 11', () => {
  const input = readString(path.join(__dirname, '../resources/2024/input11.txt'))
  it('count stones', async () => {
    const result = solve(input)
    assert.strictEqual(result.blinks25, d11.part1)
    assert.strictEqual(result.blinks75, d11.part2)
  })
})
