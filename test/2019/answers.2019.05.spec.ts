import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { Enhanced } from '../../src/2019/day05'
import * as d05 from '../../src/2019/day05.doc'

describe('2019 solutions - Day 05', () => {
  const input = readString(path.join(__dirname, 'input05.txt')).split(',').map(Number)
  it('enhancedProgram => 1', async () => assert.strictEqual(new Enhanced(1).run([...input]), d05.part1))
  it('enhancedProgram => 5', async () => assert.strictEqual(new Enhanced(5).run([...input]), d05.part2))
})
