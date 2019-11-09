import assert from 'assert';
import 'mocha'
import { highestScore, playGame } from '../../src/2018/day09'

describe('2018 examples - Day 09', () => {
  it('should score game correctly', () => {
    assert.strictEqual(highestScore(playGame(9, 25)), 32)
    assert.strictEqual(highestScore(playGame(10, 1618)), 8317)
    assert.strictEqual(highestScore(playGame(13, 7999)), 146373)
    assert.strictEqual(highestScore(playGame(17, 1104)), 2764)
    assert.strictEqual(highestScore(playGame(21, 6111)), 54718)
    assert.strictEqual(highestScore(playGame(30, 5807)), 37305)
  })
})
