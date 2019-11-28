import assert from 'assert'
import 'mocha'
import { debug } from '../../src/helpers/util'
import { mapLumberArea, strangeMagic } from '../../src/2018/day18'

describe('2018 examples - Day 18', () => {
  it('magic lumber area', async () => {
    const input = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`.split(/\r?\n/g)

    const area = mapLumberArea(input, 10)
    debug(area.display())
    const newArea = strangeMagic(area, 10)
    debug(newArea.display())
    assert.strictEqual(newArea.size, 10)
    assert.strictEqual(newArea.getResources(), 1147)
  })
})
