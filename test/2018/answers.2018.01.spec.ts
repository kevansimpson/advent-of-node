import assert from 'assert'
import 'mocha'
import path from 'path'
import { readNumbers } from '../../src/helpers/input'
import { findDuplicateFrequency, sum } from '../../src/2018/day01'
import * as d01 from '../../src/2018/day01.doc'

describe('2018 solutions - Day 01', () => {
  const input = readNumbers(path.join(__dirname, 'input01.txt'))
  it('sum', async () => assert.strictEqual(sum(input), d01.part1))
  it('findDuplicateFrequency', async () => assert.strictEqual(findDuplicateFrequency(input), d01.part2))
})
