import assert from 'assert'
import 'mocha'
import { mineCoins } from '../../src/2015/day04'
import * as d04 from '../../src/2015/day04.doc'

describe('2015 answers - Day 04', () => {
  it('mine coins for 5 zeroes', async () => assert.strictEqual(mineCoins(d04.input, '00000'), d04.part1))
  it('mine coins for 6 zeroes', async () => assert.strictEqual(mineCoins(d04.input, '000000'), d04.part2))
    .timeout(1000 * 5) // ~2+ sec
})
