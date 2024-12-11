import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { solve } from '../../src/2024/day06'
import * as d06 from '../../src/2024/day06.doc'

describe('2024 answers - Day 06', () => {
  const input = readLines(path.join(__dirname, '../resources/2024/input06.txt'))

  it('follow guard', async (done) => {
    const result = solve(input)
    it('unique steps', async () => assert.strictEqual(result.unique, d06.part1))
    it('guard loops', async () => assert.strictEqual(result.loops, d06.part2))
    done()
  }).timeout(3000)
})
