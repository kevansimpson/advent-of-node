import assert from 'assert'
import 'mocha'
import { lowestHouse, lowestHouseWithExtraPresent } from '../../src/2015/day20'

describe('2015 examples - Day 20', () => {
  it('lowest house', () => {
    assert.strictEqual(lowestHouse(70, 10), 4)
  })

  it('lowest house delivering extra present', () => {
    assert.strictEqual(lowestHouseWithExtraPresent(75, 10), 4)
  })
})
