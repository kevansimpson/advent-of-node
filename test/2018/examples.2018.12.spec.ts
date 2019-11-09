import assert from 'assert';
import 'mocha'
import { sumGrowth } from '../../src/2018/day12'

describe('2018 examples - Day 12', () => {
  it('should sum growth', () => {
    assert.strictEqual(325, sumGrowth(20, './test/2018/input12.example.txt'))
  })
})
