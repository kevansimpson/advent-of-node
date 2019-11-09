import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { RaceTrack, firstCrash, lastCar } from '../../src/2018/day13'
import * as d13 from '../../src/2018/day13.doc'

describe('2018 solutions - Day 13', () => {
  const input = readLines(path.join(__dirname, 'input13.txt'))
  it('firstCrash', async () => assert.deepStrictEqual(firstCrash(new RaceTrack(input)), d13.part1))
  it('lastCar', async () => assert.deepStrictEqual(lastCar(new RaceTrack(input)), d13.part2))
})
