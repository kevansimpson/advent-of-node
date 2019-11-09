import assert from 'assert'
import 'mocha'
import { makeBackwardsRecipes, makeRecipes } from '../../src/2018/day14'
import * as d14 from '../../src/2018/day14.doc'

describe('2018 solutions - Day 14', () => {
  it('makeRecipes', (done) => {
    assert.strictEqual(makeRecipes(d14.input), d14.part1)
    done()
  })

  it.skip('makeBackwardsRecipes', (done) => {
    assert.strictEqual(makeBackwardsRecipes(d14.input.toString()), d14.part2)
    done()
  }).timeout(45 * 1000) // 45s, takes about 30s
})
