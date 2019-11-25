import assert from 'assert'
import 'mocha'
import { inventory, isWinningOutfit, Outfit } from '../../src/2015/day21'

describe('2015 examples - Day 21', () => {
  it('winning outfit', () => {
    const outfit = new Outfit({ cost: 0, armor: 5, damage: 5 }, inventory['armor'].naked)
    assert.strictEqual(isWinningOutfit({ armor: 2, damage: 7, hitPoints: 12 }, outfit, 8), true)
  })
})
