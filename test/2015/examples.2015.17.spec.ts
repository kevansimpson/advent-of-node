import assert from 'assert';
import 'mocha'
import { canPermutations } from '../../src/2015/day17'

describe('2015 examples - Day 17', () => {
  const input = [ 20, 15, 10, 5, 5 ]
  it('can permutations', () => assert.deepStrictEqual(canPermutations(input, 25), [4, 3]))
})
