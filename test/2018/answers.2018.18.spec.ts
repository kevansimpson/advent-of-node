import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { debug } from '../../src/helpers/util'
import { mapLumberArea, strangeMagic, sustainableMagic } from '../../src/2018/day18'
import * as d18 from '../../src/2018/day18.doc'

describe('2018 solutions - Day 18', () => {
  const input = readLines(path.join(__dirname, 'input18.txt'))
  const area = mapLumberArea(input)
  debug(area.display())

  it('strangeMagic + getResources', async () => {
    const newArea = strangeMagic(area, 10)
    debug(newArea.display())
    assert.strictEqual(newArea.getResources(), d18.part1)
  })

  it('sustainable resources', async () => {
    const newArea = sustainableMagic(area)
    debug(newArea.display())
    assert.strictEqual(newArea.getResources(), d18.part2)
  }).timeout(1000 * 8) // ~5sec
})
