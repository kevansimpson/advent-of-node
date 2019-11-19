import assert from 'assert'
import 'mocha'
import path from 'path'
import { readNumbers } from '../../src/helpers/input'
import { canPermutations } from '../../src/2015/day17'
import * as d17 from '../../src/2015/day17.doc'

describe('2015 answers - Day 17', () => {
  const input = readNumbers(path.join(__dirname, 'input17.txt'))
  it.skip('canPermutations', async () => {
    assert.deepStrictEqual(canPermutations(input), [d17.part1, d17.part2])
  }).timeout(1000 * 5)
})
