import assert from 'assert';
import 'mocha'
import { countLightsOn, totalBrightness } from '../../src/2015/day06'

describe.only('2015 examples - Day 06', () => {
  it('counts lights', () => {
    const input = [
      'turn on 0,0 through 999,999',
      'toggle 0,0 through 999,0',
      'turn off 499,499 through 500,500'
    ]
    assert.strictEqual(countLightsOn(input), (1000000 - 1000 - 4))
  }).timeout(1000 * 5)

  it('total brightness', () => {
    const input = [ 'turn on 0,0 through 0,0', 'toggle 0,0 through 999,999' ]
    assert.strictEqual(totalBrightness(input), (1 + 2000000))
  }).timeout(1000 * 5)
})
