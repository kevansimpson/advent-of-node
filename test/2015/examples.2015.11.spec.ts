import assert from 'assert';
import 'mocha'
import {
  hasNonOverlappingPairs,
  hasSequence,
  isAllowed,
  nextValidPassword  } from '../../src/2015/day11'

describe('2015 examples - Day 11', () => {
  it('valid password requirements', () => {
    assert.strictEqual(hasSequence('hijklmmn'), true)
    assert.strictEqual(isAllowed('hijklmmn'), false)
    assert.strictEqual(hasNonOverlappingPairs('abbceffg'), true)
    assert.strictEqual(hasSequence('abbceffg'), false)
    assert.strictEqual(hasNonOverlappingPairs('abbcegjk'), false)
    assert.strictEqual(isAllowed('ghijmmaa'), false)
  })

  it.skip('next valid password', () => {
    assert.strictEqual(nextValidPassword('abcdefgh'), 'abcdffaa')
    assert.strictEqual(nextValidPassword('ghijklmn'), 'ghjaabcc')
  }).timeout(1000 * 5)
})
