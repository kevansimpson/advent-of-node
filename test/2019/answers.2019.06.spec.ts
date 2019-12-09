import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { OrbitMap } from '../../src/2019/day06'
import * as d06 from '../../src/2019/day06.doc'

describe.only('2019 solutions - Day 06', () => {
  const input = readLines(path.join(__dirname, 'input06.txt'))
  const omap: OrbitMap = new OrbitMap(input)
  it('totalOrbits', async () => assert.strictEqual(omap.totalOrbits(), d06.part1))
  it('minimumOrbitTransfers', async () => assert.strictEqual(omap.minimumOrbitTransfers(), d06.part2))
})
