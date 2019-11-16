import assert from 'assert';
import 'mocha'
import { lookAndSay } from '../../src/2015/day10'

describe('2015 examples - Day 10', () => {
  it('look and stutter', () => {
    assert.strictEqual(lookAndSay('1'), '11')
    assert.strictEqual(lookAndSay('11'), '21')
    assert.strictEqual(lookAndSay('21'), '1211')
    assert.strictEqual(lookAndSay('1211'), '111221')
    assert.strictEqual(lookAndSay('111221'), '312211')
  })
})
