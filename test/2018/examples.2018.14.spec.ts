import assert from 'assert';
import 'mocha'
import { makeBackwardsRecipes, makeRecipes } from '../../src/2018/day14'

describe('2018 examples - Day 14', () => {
  it('should make recipes', () => {
    assert.strictEqual('5158916779', makeRecipes(9))
    assert.strictEqual('0124515891', makeRecipes(5))
    assert.strictEqual('9251071085', makeRecipes(18))
    assert.strictEqual('5941429882', makeRecipes(2018))
  })

  it('should make backwards recipes', () => {
    assert.strictEqual(9, makeBackwardsRecipes('51589'))
    assert.strictEqual(5, makeBackwardsRecipes('01245'))
    assert.strictEqual(18, makeBackwardsRecipes('92510'))
    assert.strictEqual(2018, makeBackwardsRecipes('59414'))
  })
})
