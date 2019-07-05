import assert from 'assert';
import 'mocha'
import { findDuplicateFrequency, sum } from '../src/2018/day01'
import { checksum, countPairsAndTriples, findPrototype } from '../src/2018/day02'

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

  describe('Day 02', function() {
    it('should count pairs and triples', function() {
      assert.deepEqual(countPairsAndTriples('abcdef'), {a: 1, b: 1, c: 1, d: 1, e: 1, f: 1})
      assert.deepEqual(countPairsAndTriples('bababc'), {b: 3, a: 2, c: 1})
      assert.deepEqual(countPairsAndTriples('abbcde'), {a: 1, b: 2, c: 1, d: 1, e: 1})
      assert.deepEqual(countPairsAndTriples('abcccd'), {a: 1, b: 1, c: 3, d: 1})
      assert.deepEqual(countPairsAndTriples('aabcdd'), {a: 2, b: 1, c: 1, d: 2})
      assert.deepEqual(countPairsAndTriples('abcdee'), {a: 1, b: 1, c: 1, d: 1, e: 2})
      assert.deepEqual(countPairsAndTriples('ababab'), {a: 3, b: 3})
      assert.equal(checksum(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']), 12)
    })

    it('should find prototype', function() {
      assert.equal(findPrototype(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz']), 'fgij')
    })
  })
})