import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { wrapPresents } from '../../src/2015/day02'
import * as d02 from '../../src/2015/day02.doc'

describe('2015 answers - Day 02', () => {
  const input = readLines(path.join(__dirname, 'input02.txt'))
  it('wrapPresents', async () => assert.deepStrictEqual(wrapPresents(input), [d02.part1, d02.part2]))
})
