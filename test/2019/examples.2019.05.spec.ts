import assert from 'assert'
import 'mocha'
import { Enhanced } from '../../src/2019/day05'
import { intCode } from '../../src/2019/intCode'

describe('2019 examples - Day 05', () => {
  it('should run enhanced program', () => {
    assert.deepStrictEqual(intCode([3,0,4,0,99], new Enhanced(1)), [1,0,4,0,99])
    assert.deepStrictEqual(intCode([1002,4,3,5,99,33], new Enhanced(1)), [1002,4,3,5,99,297])
  })
})
