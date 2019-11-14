import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { countLightsOn, totalBrightness } from '../../src/2015/day06'
import * as d06 from '../../src/2015/day06.doc'

describe('2015 answers - Day 06', () => {
  const input = readLines(path.join(__dirname, 'input06.txt')).filter(str => str.trim().length > 0)
  it('countLightsOn', async () => assert.strictEqual(countLightsOn(input), d06.part1))
    .timeout(1000 * 15)
  it('totalBrightness', async () => assert.strictEqual(totalBrightness(input), d06.part2))
    .timeout(1000 * 15)
})
