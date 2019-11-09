import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { Grid, buildClaimGrid, calculateOverlap, findAdjacentClaimId } from '../../src/2018/day03'
import * as d03 from '../../src/2018/day03.doc'

describe('2018 solutions - Day 03', () => {
  const input = readLines(path.join(__dirname, 'input03.txt'))
  let grid: Grid
  it('buildClaimGrid', async () => grid = buildClaimGrid(input.reverse()))
  it('calculateOverlap', async () => assert.strictEqual(calculateOverlap(grid.map), d03.part1))
  it('findAdjacentClaimId', async () => assert.strictEqual(findAdjacentClaimId(grid), d03.part2))
})
