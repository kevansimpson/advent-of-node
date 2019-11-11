import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { robotDelivers, santaDelivers } from '../../src/2015/day03'
import * as d03 from '../../src/2015/day03.doc'

describe('2015 answers - Day 03', () => {
  const input = readString(path.join(__dirname, 'input03.txt'))
  it('santa delivers', async () => assert.strictEqual(santaDelivers(input), d03.part1))
  it('robot delivers', async () => assert.strictEqual(robotDelivers(input), d03.part2))
})
