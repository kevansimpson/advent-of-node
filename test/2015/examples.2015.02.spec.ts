import assert from 'assert';
import 'mocha'
import { wrapPresents } from '../../src/2015/day02'

describe('2015 examples - Day 02', () => {
  it('total wrapping paper and ribbon', () => {
    assert.deepStrictEqual(wrapPresents(['2x3x4']), [58, 34])
    assert.deepStrictEqual(wrapPresents(['1x1x10']), [43, 14])
  })
})
