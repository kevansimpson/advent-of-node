import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { MovingPoint, alignStars, toMovingPoints } from '../../src/2018/day10'
import * as d10 from '../../src/2018/day10.doc'

describe('2018 solutions - Day 10', () => {
  const input = readLines(path.join(__dirname, 'input10.txt'))
  let points: MovingPoint[]
  it('toMovingPoints', async () => points = toMovingPoints(input))
  it('alignStars', async () => assert.strictEqual(alignStars(points, 20), d10.part2))
})
