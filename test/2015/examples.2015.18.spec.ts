import assert from 'assert';
import 'mocha'
import { ConwaysGame } from '../../src/2015/day18'

describe('2015 examples - Day 18', () => {
  it('game of life x5', () => {
    const input = [
      '.#.#.#',
      '...##.',
      '#....#',
      '..#...',
      '#.#..#',
      '####..'
    ]
    const game = new ConwaysGame(input)
    assert.strictEqual(game.play(5), 4)
    // game.displayGrid()
  })

  it('game of life w/ broken lights', () => {
    const input = [
      '##.#.#',
      '...##.',
      '#....#',
      '..#...',
      '#.#..#',
      '####.#'
    ]
    const game = new ConwaysGame(input, true)
    assert.strictEqual(game.play(5), 17)
    // game.displayGrid()
  })
})
