import assert from 'assert';
import 'mocha'
import { distanceTraveled, winningPoints } from '../../src/2015/day14'

describe('2015 examples - Day 14', () => {
  const input = [
    'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.',
    'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.'
  ]

  it('distance traveled', () => assert.strictEqual(distanceTraveled(input, 1000), 1120))
  it('winning points', () => assert.strictEqual(winningPoints(input, 1000), 689))
})
