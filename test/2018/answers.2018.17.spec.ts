import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { mapReservoir } from '../../src/2018/day17'
import * as d17 from '../../src/2018/day17.doc'

describe('2018 solutions - Day 17', () => {
  const input = readLines(path.join(__dirname, 'input17.txt'))
  const reservoir = mapReservoir(input)
  // reservoir.display()
  reservoir.dropOfWater()
  // reservoir.display()
  const water = reservoir.water()
  it('mapReservoir', async () => assert.strictEqual(water['water'] + water['path'], d17.part1))
  it('fullReservoir', async () => assert.strictEqual(water['water'], d17.part2))
})
