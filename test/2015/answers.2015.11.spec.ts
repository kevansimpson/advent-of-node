import assert from 'assert'
import 'mocha'
import { nextValidPassword } from '../../src/2015/day11'
import * as d11 from '../../src/2015/day11.doc'

describe('2015 answers - Day 11', () => {
  let pswd: string
  it('nextValidPassword', async () => {
    pswd = nextValidPassword(d11.input)
    assert.deepStrictEqual(pswd, d11.part1)
  })

  it('next nextValidPassword', async () => {
    assert.deepStrictEqual(nextValidPassword(pswd), d11.part2)
  })
})
