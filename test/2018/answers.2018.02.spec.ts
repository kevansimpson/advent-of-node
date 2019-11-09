import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { checksum, findPrototype } from '../../src/2018/day02'
import * as d02 from '../../src/2018/day02.doc'

describe('2018 solutions - Day 02', () => {
  const input = readLines(path.join(__dirname, 'input02.txt'))
  it('checksum', async () => assert.strictEqual(checksum(input), d02.part1))
  it('findPrototype', async () => assert.strictEqual(findPrototype(input), d02.part2))
})
