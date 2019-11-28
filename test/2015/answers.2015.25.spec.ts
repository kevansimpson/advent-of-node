import assert from 'assert'
import 'mocha'
import { machineCode } from '../../src/2015/day25'
import * as d25 from '../../src/2015/day25.doc'

describe('2015 answers - Day 25', () => {
  it('machineCode', async () => {
    assert.strictEqual(machineCode(d25.target), d25.part1)
  })
})
