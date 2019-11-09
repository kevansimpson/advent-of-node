import assert from 'assert'
import 'mocha'
import { fastBattle } from '../../src/2018/day15'
import * as d15 from '../../src/2018/day15.doc'

describe.skip('2018 solutions - Day 15', () => {
  it('elf v goblin', (done) => {
    assert.deepStrictEqual(fastBattle(), [d15.part1, d15.part2])
    done()
  }).timeout(15 * 1000) // 15s
})
