import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { findFloor, firstEntersBasement } from '../../src/2015/day01'
import * as d01 from '../../src/2015/day01.doc'

describe('2015 solutions - Day 01', () => {
  const input = readString(path.join(__dirname, 'input01.txt'))
  it('findFloor', async () => assert.strictEqual(findFloor(input), d01.part1))
  it('firstEntersBasement', async () => assert.strictEqual(firstEntersBasement(input), d01.part2))
})
