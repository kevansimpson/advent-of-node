import assert from 'assert'
import 'mocha'
import { intCode } from '../../src/2019/intCode'

describe('2019 examples - Day 02', () => {
  it('should run program', () => {
    assert.deepStrictEqual(intCode([1,0,0,0,99]), [2,0,0,0,99])
    assert.deepStrictEqual(intCode([2,3,0,3,99]), [2,3,0,6,99])
    assert.deepStrictEqual(intCode([2,4,4,5,99,0]), [2,4,4,5,99,9801])
    assert.deepStrictEqual(intCode([1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99])
  })
})
