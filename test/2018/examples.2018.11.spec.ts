import assert from 'assert';
import 'mocha'
import { findMostPowerfulSquareFromSerial, findTopLeftOfMostPowerfulSquare, powerCell } from '../../src/2018/day11'

describe('2018 examples - Day 11', () => {
  it('should identify most powerful buildings', () => {
    assert.strictEqual(powerCell([3, 5], 8)[2], 4)
    assert.strictEqual(powerCell([122, 79], 57)[2], -5)
    assert.strictEqual(powerCell([217, 196], 39)[2], 0)
    assert.strictEqual(powerCell([101, 153], 71)[2], 4)
    assert.deepStrictEqual(findTopLeftOfMostPowerfulSquare(18, 3, 0), [[[33, 45], 18, 4], 29])
    assert.deepStrictEqual(findTopLeftOfMostPowerfulSquare(42, 3, 0), [[[21, 61], 42, 4], 30])
  })

  it.skip('should identify buildings from serial', () => {
    assert.deepStrictEqual(findMostPowerfulSquareFromSerial(18), [[[90, 269], 18, 3], 16])
    assert.deepStrictEqual(findMostPowerfulSquareFromSerial(42), [[[232, 251], 42, 2], 12])
  }).timeout(5000 * 9) // 45s timeout, typically takes around 30s
})
