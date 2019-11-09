import assert from 'assert';
import 'mocha'
import { RaceTrack, firstCrash, lastCar } from '../../src/2018/day13'

describe('2018 examples - Day 13', () => {
  it('should identify first crash', () => {
    const input: string[] = [
      '/->-\\        ',
      '|   |  /----\\',
      '| /-+--+-\\  |',
      '| | |  | v  |',
      '\\-+-/  \\-+--/',
      '  \\------/   '
    ]
    const rt: RaceTrack = new RaceTrack(input)
    rt.display()
    assert.deepStrictEqual(firstCrash(rt), [7, 3])
  })

  it('should find last car standing', () => {
    const input: string[] = [
      '/>-<\\  ',
      '|   |  ',
      '| /<+-\\',
      '| | | v',
      '\\>+</ |',
      '  |   ^',
      '  \\<->/'
    ]
    const rt: RaceTrack = new RaceTrack(input)
    rt.display()
    assert.deepStrictEqual(lastCar(rt), [6, 4])
  })
})
