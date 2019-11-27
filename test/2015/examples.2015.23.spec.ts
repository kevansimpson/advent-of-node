import assert from 'assert'
import 'mocha'
import { runProgram } from '../../src/2015/day23'

describe('2015 examples - Day 23', () => {
  const input = ['inc a', 'jio a, +2', 'tpl a', 'inc a']
  it('run program', () => {
    assert.strictEqual(runProgram(input, { 'a': 0, 'b': 0 }, 'a'), 2)
  })
})
