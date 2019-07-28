import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines, readNumbers, readString, splitNumbers } from '../src/helpers/input'
import { Point } from '../src/helpers/point'
import { answer, start, end } from '../src/helpers/util'
import { findDuplicateFrequency, sum } from '../src/2018/day01'
import * as d01 from '../src/2018/day01.doc'
import { checksum, findPrototype } from '../src/2018/day02'
import * as d02 from '../src/2018/day02.doc'
import { Grid, buildClaimGrid, calculateOverlap, findAdjacentClaimId } from '../src/2018/day03'
import * as d03 from '../src/2018/day03.doc'
import { parseRecords, strategy1, strategy2 } from '../src/2018/day04'
import * as d04 from '../src/2018/day04.doc'
import { buildReactionMap, formPolymer, improvePolymer } from '../src/2018/day05'
import * as d05 from '../src/2018/day05.doc'
import { findLargestArea, findSafestArea, toPoints } from '../src/2018/day06'
import * as d06 from '../src/2018/day06.doc'
import { buildStepMap, calculateDuration, orderInstructions } from '../src/2018/day07'
import * as d07 from '../src/2018/day07.doc'
import { Node, buildTree, calculateRootNode, sumMetadata } from '../src/2018/day08'
import * as d08 from '../src/2018/day08.doc'

describe('2018 solutions', () => {
  const testPath = path.join(__dirname, 'resources/2018') 

  before(() => {
    start('2018')
  })

  after(() => {
    end('2018')
  })

  it('Day01', (done) => {
    readNumbers(path.join(testPath, 'input01.txt'), (input: number[]) => {
      answer(d01.part1, sum, input)
      answer(d01.part2, findDuplicateFrequency, input)
      done()
    })
  })

  it('Day02 ', (done) => {
    readLines(path.join(testPath, 'input02.txt'), (input: string[]) => {
      answer(d02.part1, checksum, input)
      answer(d02.part2, findPrototype, input)
      done()
    })
  })

  it('Day03', (done) => {
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

  it('Day04', (done) => {
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

  it('Day05', (done) => {
    readString(path.join(testPath, 'input05.txt'), (input: string) => {
      start('buildReactionMap')
      const rxns: Map<string, string> = buildReactionMap()
      end('buildReactionMap', 'formPolymer')
      assert.strictEqual(formPolymer(input, rxns).toString().length, d05.part1)
      end('formPolymer', 'improvePolymer')
      assert.strictEqual(improvePolymer(input, rxns).toString().length, d05.part2)
      end('improvePolymer')
      done()
    })
  })

  it('Day06', (done) => {
    readLines(path.join(testPath, 'input06.txt'), (input: string[]) => {
      start('toPoints')
      const points: Point[] = toPoints(input)
      end('toPoints', 'findLargestArea')
      assert.strictEqual(findLargestArea(points), d06.part1)
      end('findLargestArea', 'findSafestArea')
      assert.strictEqual(findSafestArea(points), d06.part2)
      end('findSafestArea')
      done()
    })
  })

  it.skip('Day07', (done) => {
    readLines(path.join(testPath, 'input07.txt'), (input: string[]) => {
      console.log(input.length)
      start('orderInstructions')
      assert.strictEqual(orderInstructions(buildStepMap(input)), d07.part1)
      end('orderInstructions', 'calculateDuration')
      assert.strictEqual(calculateDuration(buildStepMap(input), 5, 60), d07.part2)
      end('calculateDuration')
      done()
    })
  })

  it('Day08', (done) => {
    splitNumbers (path.join(testPath, 'input08.txt'), (input: number[]) => {
      start('buildTree')
      const tree: [Node, number] = buildTree(input, 0)
      end('buildTree', 'sumMetadata')
      assert.strictEqual(sumMetadata(tree), d08.part1)
      end('sumMetadata', 'calculateRootNode')
      assert.strictEqual(calculateRootNode(tree), d08.part2)
      end('calculateRootNode')
      done()
    })
  })
})
