import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { ConwaysGame } from '../../src/2015/day18'
import * as d18 from '../../src/2015/day18.doc'

describe('2015 answers - Day 18', () => {
  const input = readLines(path.join(__dirname, 'input18.txt'))
  it('gameOfLife x100', async () => {
    const game = new ConwaysGame(input)
    assert.strictEqual(game.play(100), d18.part1)
    // game.displayGrid()
  })

  it('gameOfLife w/ broken lights', async () => {
    const game = new ConwaysGame(input, true)
    assert.strictEqual(game.play(100), d18.part2)
    // game.displayGrid()
  })
})
