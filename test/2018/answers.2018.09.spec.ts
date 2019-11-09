import assert from 'assert'
import 'mocha'
import { game1, game2 } from '../../src/2018/day09'
import * as d09 from '../../src/2018/day09.doc'

describe('2018 solutions - Day 09', () => {
  it('game1', async () => assert.strictEqual(game1(d09.players, d09.lastMarble), d09.part1))
  it('game2', async () => assert.strictEqual(game2(d09.players, d09.lastMarble), d09.part2))
})
