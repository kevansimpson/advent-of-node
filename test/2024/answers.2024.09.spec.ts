import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { solve } from '../../src/2024/day09'
import * as d09 from '../../src/2024/day09.doc'

describe('2024 answers - Day 09', () => {
  const input = readString(path.join(__dirname, '../resources/2024/input09.txt'))
  const result = solve(input)
  
  it('checksum 1', async () => assert.strictEqual(result.checksum1, d09.part1))
  it('checksum 2', async () => assert.strictEqual(result.checksum2, d09.part2))
})
