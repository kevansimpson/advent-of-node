import assert from 'assert';
import 'mocha'
import { mineCoins } from '../../src/2015/day04'

describe('2015 examples - Day 04', () => {
  it('mine coins for 5 zeroes', () => {
    assert.strictEqual(mineCoins('abcdef', '00000'), 609043)
    assert.strictEqual(mineCoins('pqrstuv', '00000'), 1048970)
  }).timeout(1000 * 5) // ~3s
})
