import assert from 'assert';
import 'mocha'
import { totalCharacters, totalEncryptedCharacters } from '../../src/2015/day08'

describe('2015 examples - Day 08', () => {
  const input = ['""', '"abc"', '"aaa\\"aaa"', '"\\x27"']
  it('total characters', () => {
    assert.strictEqual(totalCharacters([ input[0] ]), 2)
    assert.strictEqual(totalCharacters([ input[1] ]), 2)
    assert.strictEqual(totalCharacters([ input[2] ]), 3)
    assert.strictEqual(totalCharacters([ input[3] ]), 5)
    assert.strictEqual(totalCharacters(input), 12)
  })

  it('total encrypted characters', () => {
    assert.strictEqual(totalEncryptedCharacters([ input[0] ]), 4)
    assert.strictEqual(totalEncryptedCharacters([ input[1] ]), 4)
    assert.strictEqual(totalEncryptedCharacters([ input[2] ]), 6)
    assert.strictEqual(totalEncryptedCharacters([ input[3] ]), 5)
    assert.strictEqual(totalEncryptedCharacters(input), 19)
  })
})
