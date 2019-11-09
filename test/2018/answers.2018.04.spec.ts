import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { Guard, parseRecords, strategy1, strategy2 } from '../../src/2018/day04'
import * as d04 from '../../src/2018/day04.doc'

describe('2018 solutions - Day 04', () => {
  const input = readLines(path.join(__dirname, 'input04.txt'))
  let records: Map<number, Guard>
  it('parseRecords', async () => records = parseRecords(input.sort()))
  it('strategy1', async () => assert.strictEqual(strategy1(records), d04.part1))
  it('strategy2', async () => assert.strictEqual(strategy2(records), d04.part2))
})
