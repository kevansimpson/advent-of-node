import 'mocha'
import { findDuplicateFrequency, sum } from '../../src/2018/day01'

const assert = require('assert')
describe('2018 examples - Day 01', function() {
  describe('part 1', function() {
    it('should return correct sum', function() {
      assert.equal(sum([1, 1, 1]), 3)
      assert.equal(sum([1, 1, -2]), 0)
      assert.equal(sum([-1, -2, -3]), -6)
    })
  })
  describe('part 2', function() {
    it('should return duplicate frequency', function() {
      assert.equal(findDuplicateFrequency([1, -1]), 0)
      assert.equal(findDuplicateFrequency([3, 3, 4, -2, -4]), 10)
      assert.equal(findDuplicateFrequency([-6, 3, 8, 5, -6]), 5)
      assert.equal(findDuplicateFrequency([7, 7, -2, -7, -4]), 14)
    })
  })
})