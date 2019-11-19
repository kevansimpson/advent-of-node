import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { whichSue, outdatedRetroencabulator } from '../../src/2015/day16'
import * as d16 from '../../src/2015/day16.doc'

describe.only('2015 answers - Day 16', () => {
  const input = readLines(path.join(__dirname, 'input16.txt'))
  it('whichSue', async () => {
    assert.strictEqual(whichSue(input), d16.part1)
  })

  it('outdatedRetroencabulator', async () => {
    assert.strictEqual(outdatedRetroencabulator(input), d16.part2)
  })
})
