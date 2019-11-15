import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { PathFinder } from '../../src/2015/day09'
import * as d09 from '../../src/2015/day09.doc'

describe('2015 answers - Day 09', () => {
  const input = readLines(path.join(__dirname, 'input09.txt')).filter(str => str.trim().length > 0)
  const paths = new PathFinder()
  it('PathFinder', async () => assert.deepStrictEqual(paths.minMaxPaths(input), [d09.part1, d09.part2]))
})
