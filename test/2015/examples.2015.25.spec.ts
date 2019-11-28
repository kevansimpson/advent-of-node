import assert from 'assert'
import 'mocha'
import { machineCode, nextValue } from '../../src/2015/day25'
import bigInt from 'big-integer'

describe('2015 examples - Day 25', () => {
  it('next', () => {
    assert.deepStrictEqual(nextValue(bigInt(20151125)), bigInt(31916031))
  })

  it('machine code grid', () => {
    assert.strictEqual(machineCode([3, 4], bigInt(21345942)), 21345942)
  })
})
