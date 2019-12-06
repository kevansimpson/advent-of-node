import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { countSteps, crossWires } from '../../src/2019/day03'
import * as d03 from '../../src/2019/day03.doc'

describe('2019 answers - Day 03', () => {
  const input = readLines(path.join(__dirname, 'input03.txt'))
  const wire1 = input[0].split(',')
  const wire2 = input[1].split(',')
  it('crossWires', async () => assert.strictEqual(crossWires(wire1, wire2), d03.part1))
  it('countSteps', async () => assert.strictEqual(countSteps(wire1, wire2), d03.part2))
})
