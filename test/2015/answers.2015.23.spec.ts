import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { runProgram } from '../../src/2015/day23'
import * as d23 from '../../src/2015/day23.doc'

describe('2015 answers - Day 23', () => {
  const input = readLines(path.join(__dirname, 'input23.txt'))
  it('runProgram a=0', async () => {
    assert.strictEqual(runProgram(input, { 'a': 0, 'b': 0 }), d23.part1)
  })

  it('runProgram a=1', async () => {
    assert.strictEqual(runProgram(input, { 'a': 1, 'b': 0 }), d23.part2)
  })
})
