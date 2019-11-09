import assert from 'assert';
import 'mocha'
import { findDuplicateFrequency, sum } from '../../src/2018/day01'

describe('2018 examples - Day 01', () => {
  it('should return correct sum', () => {
    assert.strictEqual(sum([1, 1, 1]), 3)
    assert.strictEqual(sum([1, 1, -2]), 0)
    assert.strictEqual(sum([-1, -2, -3]), -6)
  })

  it('should return duplicate frequency', () => {
    assert.strictEqual(findDuplicateFrequency([1, -1]), 0)
    assert.strictEqual(findDuplicateFrequency([3, 3, 4, -2, -4]), 10)
    assert.strictEqual(findDuplicateFrequency([-6, 3, 8, 5, -6]), 5)
    assert.strictEqual(findDuplicateFrequency([7, 7, -2, -7, -4]), 14)
  })
})
