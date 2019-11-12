import assert from 'assert';
import 'mocha'
import { countNiceStrings, countNicerStrings } from '../../src/2015/day05'

describe('2015 examples - Day 05', () => {
  it('counts nice strings', () => {
    const input = [
      'ugknbfddgicrmopn', 'aaa', // nice
      'jchzalrnumimnmhp', 'haegwjzuvuyypxyu', 'dvszwmarrgswjxmb' // naughty
    ]
    assert.strictEqual(countNiceStrings(input), 2)
  })

  it('counts nicer strings', () => {
    const input = [
      'qjhvhtzxzqqjkmpb', 'xxyxx', // nice
      'uurcxstgmygtbstg', 'ieodomkazucvgmuy' // naughty
    ]
    assert.strictEqual(countNicerStrings(input), 2)
  })
})
