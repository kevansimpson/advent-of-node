import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { sumDocument } from '../../src/2015/day12'
import * as d12 from '../../src/2015/day12.doc'

describe('2015 answers - Day 12', () => {
  const input = readString(path.join(__dirname, 'input12.txt'))
  it('sumDocument', async () => assert.strictEqual(sumDocument(input), d12.part1))
  it('sumDocument - red', async () => assert.strictEqual(sumDocument(input, ['red']), d12.part2))
})
