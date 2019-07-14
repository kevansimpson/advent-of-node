import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines, readNumbers } from '../src/helpers/input'
import { answer, start, end } from '../src/helpers/util'
import { findDuplicateFrequency, sum } from '../src/2018/day01'
import * as d01 from '../src/2018/day01.doc'
import { checksum, findPrototype } from '../src/2018/day02'
import * as d02 from '../src/2018/day02.doc'
import { Grid, buildClaimGrid, calculateOverlap, findAdjacentClaimId } from '../src/2018/day03'
import * as d03 from '../src/2018/day03.doc'
import { parseRecords, strategy1, strategy2 } from '../src/2018/day04'
import * as d04 from '../src/2018/day04.doc'

describe('2018 solutions', function() {
  const testPath = path.join(__dirname, 'resources/2018') 

  before(function() {
    start('2018')
  })

  after(function() {
    end('2018')
  })

  it('Day01', function(done) {
    readNumbers(path.join(testPath, 'input01.txt'), (input: number[]) => {
      answer(d01.part1, sum, input)
      answer(d01.part2, findDuplicateFrequency, input)
      done()
    })
  })

  it('Day02 ', function(done) {
    readLines(path.join(testPath, 'input02.txt'), (input: string[]) => {
      answer(d02.part1, checksum, input)
      answer(d02.part2, findPrototype, input)
      done()
    })
  })

  it('Day03', function(done) {
    readLines(path.join(testPath, 'input03.txt'), (input: string[]) => {
      start('buildClaimGrid')
      const grid: Grid = buildClaimGrid(input.reverse())
      end('buildClaimGrid', 'calculateOverlap')
      assert.strictEqual(calculateOverlap(grid.map), d03.part1)
      end('calculateOverlap', 'findAdjacentClaimId')
      assert.strictEqual(findAdjacentClaimId(grid), d03.part2)
      end('findAdjacentClaimId')
      done()
    })
  })

  it('Day04', function(done) {
    readLines(path.join(testPath, 'input04.txt'), (input: string[]) => {
      start('parseRecords')
      const records = parseRecords(input.sort())
      end('parseRecords', 'strategy1')
      assert.strictEqual(strategy1(records), d04.part1)
      end('strategy1', 'strategy2')
      assert.strictEqual(strategy2(records), d04.part2)
      end('strategy2')
      done()
    })
  })
})
