import assert from 'assert'
import 'mocha'
import { tailorOutfits } from '../../src/2015/day21'
import * as d21 from '../../src/2015/day21.doc'

describe('2015 answers - Day 21', () => {
  it('tailorOutfits', async () => {
    assert.deepStrictEqual(tailorOutfits(d21.boss), [d21.part1, d21.part2])
  })
})
