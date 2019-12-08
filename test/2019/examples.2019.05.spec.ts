import assert from 'assert'
import 'mocha'
import { enhancedProgram } from '../../src/2019/day05'

describe('2019 examples - Day 05', () => {
  it('should run enhanced program', () => {
    assert.deepStrictEqual(enhancedProgram([3,0,4,0,99]), [1, [1,0,4,0,99]])
    assert.deepStrictEqual(enhancedProgram([1002,4,3,5,99,33]), [-1, [1002,4,3,5,99,297]])
  })
})
