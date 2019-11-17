import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { distanceTraveled, winningPoints } from '../../src/2015/day14'
import * as d14 from '../../src/2015/day14.doc'

describe('2015 answers - Day 14', () => {
  const input = readLines(path.join(__dirname, 'input14.txt'))
  it('distanceTraveled', async () => assert.strictEqual(distanceTraveled(input, 2503), d14.part1))
  it('winningPoints', async () => assert.strictEqual(winningPoints(input, 2503), d14.part2))
})
