import assert from 'assert';
import 'mocha'
import { checksum, countPairsAndTriples, findPrototype } from '../../src/2018/day02'

describe('2018 examples - Day 02', () => {
  it('should count pairs and triples', () => {
    assert.deepEqual(countPairsAndTriples('abcdef'), {a: 1, b: 1, c: 1, d: 1, e: 1, f: 1})
    assert.deepEqual(countPairsAndTriples('bababc'), {b: 3, a: 2, c: 1})
    assert.deepEqual(countPairsAndTriples('abbcde'), {a: 1, b: 2, c: 1, d: 1, e: 1})
    assert.deepEqual(countPairsAndTriples('abcccd'), {a: 1, b: 1, c: 3, d: 1})
    assert.deepEqual(countPairsAndTriples('aabcdd'), {a: 2, b: 1, c: 1, d: 2})
    assert.deepEqual(countPairsAndTriples('abcdee'), {a: 1, b: 1, c: 1, d: 1, e: 2})
    assert.deepEqual(countPairsAndTriples('ababab'), {a: 3, b: 3})
    assert.strictEqual(checksum(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']), 12)
  })

  it('should find prototype', () => {
    assert.strictEqual(findPrototype(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz']), 'fgij')
  })
})
