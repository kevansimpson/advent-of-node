import assert from 'assert'
import 'mocha'
import path from 'path'
import { readNumbers } from '../../src/helpers/input'
import { arrangePackages } from '../../src/2015/day24'
import * as d24 from '../../src/2015/day24.doc'

describe('2015 answers - Day 24', () => {
  const input = readNumbers(path.join(__dirname, 'input24.txt'))
  it.skip('arrangePackages @ 3', async () => {
    assert.strictEqual(arrangePackages([...input], 3), d24.part1)
  }).timeout(1000 * 120) // 90! seconds #smh

  it('arrangePackages @ 4', async () => {
    assert.strictEqual(arrangePackages([...input], 4), d24.part2)
  })
})
