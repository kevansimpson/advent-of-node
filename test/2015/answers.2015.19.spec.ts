import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { Chemist } from '../../src/2015/day19'
import * as d19 from '../../src/2015/day19.doc'

describe('2015 answers - Day 19', () => {
  const input = readLines(path.join(__dirname, 'input19.txt'))
  it('totalMolecules', async () => {
    const chem = new Chemist([...input])
    assert.strictEqual(chem.totalMolecules(), d19.part1)
  })

  it('shortestPath', async () => {
    const chem = new Chemist([...input])
    assert.strictEqual(chem.shortestPath(), d19.part2)
  })
})
