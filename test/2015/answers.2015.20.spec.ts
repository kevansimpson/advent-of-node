import assert from 'assert'
import 'mocha'
import { lowestHouse, lowestHouseWithExtraPresent } from '../../src/2015/day20'
import * as d20 from '../../src/2015/day20.doc'

describe('2015 answers - Day 20', () => {
  it('lowestHouse', async () => {
    assert.strictEqual(lowestHouse(d20.input), d20.part1)
  })

  it('lowestHouseWithExtraPresent', async () => {
    assert.strictEqual(lowestHouseWithExtraPresent(d20.input), d20.part2)
  })
})
