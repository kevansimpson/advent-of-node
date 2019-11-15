import assert from 'assert';
import 'mocha'
import { PathFinder } from '../../src/2015/day09'

describe('2015 examples - Day 09', () => {
  const input = ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141']
  it('shortest and longest path', () => {
    const paths = new PathFinder()
    assert.deepStrictEqual(paths.minMaxPaths(input), [605, 982])
  })
})
