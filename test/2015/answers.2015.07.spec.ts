import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { overrideSignalB, signalA } from '../../src/2015/day07'
import * as d07 from '../../src/2015/day07.doc'

describe('2015 answers - Day 07', () => {
  const input = readLines(path.join(__dirname, 'input07.txt')).filter(str => str.trim().length > 0)
  it('signalA', async () => assert.strictEqual(signalA(input), d07.part1))
  it('overrideSignalA', async () => assert.strictEqual(overrideSignalB(input), d07.part2))
})
