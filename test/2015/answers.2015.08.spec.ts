import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines } from '../../src/helpers/input'
import { totalCharacters, totalEncryptedCharacters } from '../../src/2015/day08'
import * as d08 from '../../src/2015/day08.doc'

describe('2015 answers - Day 08', () => {
  const input = readLines(path.join(__dirname, 'input08.txt')).filter(str => str.trim().length > 0)
  it('totalCharacters', async () => assert.strictEqual(totalCharacters(input), d08.part1))
  it('totalEncryptedCharacters', async () => assert.strictEqual(totalEncryptedCharacters(input), d08.part2))
})
