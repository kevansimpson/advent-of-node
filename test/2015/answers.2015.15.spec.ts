import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { highestScoringRecipe } from '../../src/2015/day15'
import * as d15 from '../../src/2015/day15.doc'

describe('2015 answers - Day 15', () => {
  const input = readLines(path.join(__dirname, 'input15.txt'))
  it('highestScoringRecipe', async () => {
    assert.strictEqual(highestScoringRecipe(input), d15.part1)
  }).timeout(1000 * 3)

  it('highestScoringRecipe: 500 calories', async () => {
    assert.strictEqual(highestScoringRecipe(input, 500), d15.part2)
  }).timeout(1000 * 3)
})
