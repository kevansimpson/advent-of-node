import assert from 'assert'
import 'mocha'
import { findMostPowerfulSquareFromSerial, findTopLeftOfMostPowerfulSquare } from '../../src/2018/day11'
import * as d11 from '../../src/2018/day11.doc'

describe('2018 solutions - Day 11', () => {
  it('findTopLeftOfMostPowerfulSquare', async () => {
    assert.deepStrictEqual(findTopLeftOfMostPowerfulSquare(d11.input, 3, 0), d11.part1)
  })
  it.skip('findMostPowerfulSquareFromSerial', async () => {
    assert.deepStrictEqual(findMostPowerfulSquareFromSerial(d11.input), d11.part2)
  }).timeout(20 * 1000) // 20s, takes about 15s
})
