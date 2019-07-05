import assert from 'assert';
import 'mocha'
import { findDuplicateFrequency, sum } from '../src/2018/day01'

describe('2018 examples', function() {
  this.slow(0)

  describe('Day 01', function() {
    it('should return correct sum', function() {
      assert.equal(sum([1, 1, 1]), 3)
      assert.equal(sum([1, 1, -2]), 0)
      assert.equal(sum([-1, -2, -3]), -6)
    })

    it('should return duplicate frequency', function() {
      assert.equal(findDuplicateFrequency([1, -1]), 0)
      assert.equal(findDuplicateFrequency([3, 3, 4, -2, -4]), 10)
      assert.equal(findDuplicateFrequency([-6, 3, 8, 5, -6]), 5)
      assert.equal(findDuplicateFrequency([7, 7, -2, -7, -4]), 14)
    })
  })
})