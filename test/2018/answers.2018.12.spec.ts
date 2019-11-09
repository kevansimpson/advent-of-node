import assert from 'assert'
import 'mocha'
import { sumGrowth } from '../../src/2018/day12'
import * as d12 from '../../src/2018/day12.doc'

describe('2018 solutions - Day 12', () => {
  it('sumGrowth20', async () => assert.strictEqual(sumGrowth(20), d12.part1))
  it('sumMaxGrowth', async () => assert.strictEqual(sumGrowth(50000000000), d12.part2))
})
