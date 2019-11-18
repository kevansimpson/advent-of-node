import assert from 'assert';
import 'mocha'
import { highestScoringRecipe } from '../../src/2015/day15'

describe('2015 examples - Day 15', () => {
  const input = [
    'Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8',
    'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3'
  ]

  it('high scoring recipe', () => assert.strictEqual(highestScoringRecipe(input), 62842880))
  it('high scoring recipe < 500 calories', () => {
    assert.strictEqual(highestScoringRecipe(input, 500), 57600000)
  })
})
