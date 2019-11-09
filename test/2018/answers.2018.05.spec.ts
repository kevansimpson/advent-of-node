import assert from 'assert'
import 'mocha'
import path from 'path'
import { readString } from '../../src/helpers/input'
import { buildReactionMap, formPolymer, improvePolymer } from '../../src/2018/day05'
import * as d05 from '../../src/2018/day05.doc'

describe('2018 solutions - Day 05', () => {
  const input = readString(path.join(__dirname, 'input05.txt'))
  let rxns: Map<string, string>
  it('buildReactionMap', async () => rxns = buildReactionMap())
  it('formPolymer', async () => assert.strictEqual(formPolymer(input, rxns).length, d05.part1))
  it('improvePolymer', async () => assert.strictEqual(improvePolymer(input, rxns).length, d05.part2))
})
