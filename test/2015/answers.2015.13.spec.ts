import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { ME, optimalHappiness } from '../../src/2015/day13'
import * as d13 from '../../src/2015/day13.doc'

describe('2015 answers - Day 13', () => {
  const input = readLines(path.join(__dirname, 'input13.txt'))
  it('optimalHappiness', async () => assert.strictEqual(optimalHappiness(input), d13.part1))
  it.skip('optimalHappiness w/ ME', async () => assert.strictEqual(optimalHappiness(input, [ME]), d13.part2))
    .timeout(1000 * 8) // ~5s
})
