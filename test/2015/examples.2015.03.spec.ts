import assert from 'assert';
import 'mocha'
import { followDirections, robotDelivers } from '../../src/2015/day03'

describe('2015 examples - Day 03', () => {
  it('follows directions', () => {
    assert.strictEqual(followDirections('>'), 2)
    assert.strictEqual(followDirections('^>v<'), 4)
    assert.strictEqual(followDirections('^v^v^v^v^v'), 2)
  })

  it('follows eggnog directions', () => {
    assert.strictEqual(robotDelivers('^v'), 3)
    assert.strictEqual(robotDelivers('^>v<'), 3)
    assert.strictEqual(robotDelivers('^v^v^v^v^v'), 11)
  })
})
