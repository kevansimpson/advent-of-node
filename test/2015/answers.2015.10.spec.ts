import assert from 'assert'
import 'mocha'
import { lookAndStutter } from '../../src/2015/day10'
import * as d10 from '../../src/2015/day10.doc'

describe('2015 answers - Day 10', () => {
  let x40: string
  it('lookAndStutter x40', async () => {
    x40 = lookAndStutter(d10.input, 40)
    assert.strictEqual(x40.length, d10.part1)
  })

  it.skip('lookAndStutter x40+10', async () => {
    assert.strictEqual(lookAndStutter(x40, 10).length, d10.part2)
  }).timeout(1000 * 5)
  it.skip('lookAndStutter x50', async () => {
    assert.strictEqual(lookAndStutter(d10.input, 50).length, d10.part2)
  }).timeout(1000 * 5)
})
