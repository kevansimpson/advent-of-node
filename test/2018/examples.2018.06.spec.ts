import assert from 'assert';
import 'mocha'
import { Point } from '../../src/helpers/point'
import { findLargestArea, findSafestArea, toPoints } from '../../src/2018/day06'

describe('2018 examples - Day 06', () => {
  const points: Point[] = toPoints(['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'])
  it('should find largest area', () => {
    assert.strictEqual(findLargestArea(points), 17)
  })

  it('should find safest area', () => {
    assert.strictEqual(findSafestArea(points, 32), 16)
  })
})
