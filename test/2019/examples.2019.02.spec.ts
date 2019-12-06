import assert from 'assert'
import 'mocha'
import { runProgram } from '../../src/2019/day02'

describe.only('2019 examples - Day 02', () => {
  it('should run program', () => {
    assert.deepStrictEqual(runProgram([1,0,0,0,99]), [2,0,0,0,99])
    assert.deepStrictEqual(runProgram([2,3,0,3,99]), [2,3,0,6,99])
    assert.deepStrictEqual(runProgram([2,4,4,5,99,0]), [2,4,4,5,99,9801])
    assert.deepStrictEqual(runProgram([1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99])

    // assert.deepStrictEqual(countPairsAndTriples('abcdef'), {a: 1, b: 1, c: 1, d: 1, e: 1, f: 1})
    // assert.strictEqual(checksum(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']), 12)
  })

  it('should find prototype', () => {
    // assert.strictEqual(findPrototype(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz']), 'fgij')
  })
})
