import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { countNiceStrings, countNicerStrings } from '../../src/2015/day05'
import * as d05 from '../../src/2015/day05.doc'

describe('2015 answers - Day 05', () => {
  const input = readLines(path.join(__dirname, 'input05.txt'))
  it('countNiceStrings', async () => assert.strictEqual(countNiceStrings(input), d05.part1))
  it('countNicerStrings', async () => assert.strictEqual(countNicerStrings(input), d05.part2))
})
