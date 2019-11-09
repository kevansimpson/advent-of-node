import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { Point } from '../../src/helpers/point'
import { findLargestArea, findSafestArea, toPoints } from '../../src/2018/day06'
import * as d06 from '../../src/2018/day06.doc'

describe('2018 solutions - Day 06', () => {
  const input = readLines(path.join(__dirname, 'input06.txt'))
  let points: Point[]
  it('toPoints', async () => points = toPoints(input))
  it('findLargestArea', async () => assert.strictEqual(findLargestArea(points), d06.part1))
  it('findSafestArea', async () => assert.strictEqual(findSafestArea(points), d06.part2))
})
