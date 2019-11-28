import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
// import { debug } from '../../src/helpers/util'
import { shortestPath, mapArea } from '../../src/2018/day20'
import * as d20 from '../../src/2018/day20.doc'

describe.only('2018 solutions - Day 20', () => {
  const input = readString(path.join(__dirname, 'input20.txt'))

  it('shortestPath', async () => {
    const area = mapArea(input)
    // debug(area.display())
    assert.strictEqual(shortestPath(area.path), d20.part1)
  }).timeout(1000 * 30)

  // it.skip('sustainable resources', async () => {
  //   const newArea = sustainableMagic(area)
  //   debug(newArea.display())
  //   assert.strictEqual(newArea.getResources(), d18.part2)
  // }).timeout(1000 * 8) // ~5sec
})
