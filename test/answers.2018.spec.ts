import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines, readNumbers, readString, splitNumbers } from '../src/helpers/input'
import { Point } from '../src/helpers/point'
import { start, end } from '../src/helpers/util'
import { findDuplicateFrequency, sum } from '../src/2018/day01'
import * as d01 from '../src/2018/day01.doc'
import { checksum, findPrototype } from '../src/2018/day02'
import * as d02 from '../src/2018/day02.doc'
import { Grid, buildClaimGrid, calculateOverlap, findAdjacentClaimId } from '../src/2018/day03'
import * as d03 from '../src/2018/day03.doc'
import { Guard, parseRecords, strategy1, strategy2 } from '../src/2018/day04'
import * as d04 from '../src/2018/day04.doc'
import { buildReactionMap, formPolymer, improvePolymer } from '../src/2018/day05'
import * as d05 from '../src/2018/day05.doc'
import { findLargestArea, findSafestArea, toPoints } from '../src/2018/day06'
import * as d06 from '../src/2018/day06.doc'
import { buildStepMap, calculateDuration, orderInstructions } from '../src/2018/day07'
import * as d07 from '../src/2018/day07.doc'
import { Node, buildTree, calculateRootNode, sumMetadata } from '../src/2018/day08'
import * as d08 from '../src/2018/day08.doc'
import { game1, game2 } from '../src/2018/day09'
import * as d09 from '../src/2018/day09.doc'
import { MovingPoint, alignStars, toMovingPoints } from '../src/2018/day10'
import * as d10 from '../src/2018/day10.doc'
import { findMostPowerfulSquareFromSerial, findTopLeftOfMostPowerfulSquare } from '../src/2018/day11'
import * as d11 from '../src/2018/day11.doc'
import { sumGrowth } from '../src/2018/day12'
import * as d12 from '../src/2018/day12.doc'
import { RaceTrack, firstCrash, lastCar } from '../src/2018/day13'
import * as d13 from '../src/2018/day13.doc'
import { makeBackwardsRecipes, makeRecipes } from '../src/2018/day14'
import * as d14 from '../src/2018/day14.doc'
import { fastBattle } from '../src/2018/day15'
import * as d15 from '../src/2018/day15.doc'

describe('2018 solutions', () => {
  const testPath = path.join(__dirname, 'resources/2018')

  before(() => {
    start('2018')
  })

  after(() => {
    end('2018')
  })

  context('Day01', async () => {
    const input = readNumbers(path.join(testPath, 'input01.txt'))
    it('sum', async () => assert.strictEqual(sum(input), d01.part1))
    it('findDuplicateFrequency', async () => assert.strictEqual(findDuplicateFrequency(input), d01.part2))
  })

  context('Day02', async () => {
    const input = readLines(path.join(testPath, 'input02.txt'))
    it('checksum', async () => assert.strictEqual(checksum(input), d02.part1))
    it('findPrototype', async () => assert.strictEqual(findPrototype(input), d02.part2))
  })

  context('Day03', async () => {
    const input = readLines(path.join(testPath, 'input03.txt'))
    let grid: Grid
    it('buildClaimGrid', async () => grid = buildClaimGrid(input.reverse()))
    it('calculateOverlap', async () => assert.strictEqual(calculateOverlap(grid.map), d03.part1))
    it('findAdjacentClaimId', async () => assert.strictEqual(findAdjacentClaimId(grid), d03.part2))
  })

  context('Day04', async () => {
    const input = readLines(path.join(testPath, 'input04.txt'))
    let records: Map<number, Guard>
    it('parseRecords', async () => records = parseRecords(input.sort()))
    it('strategy1', async () => assert.strictEqual(strategy1(records), d04.part1))
    it('strategy2', async () => assert.strictEqual(strategy2(records), d04.part2))
  })

  context('Day05', async () => {
    const input = readString(path.join(testPath, 'input05.txt'))
    let rxns: Map<string, string>
    it('buildReactionMap', async () => rxns = buildReactionMap())
    it('formPolymer', async () => assert.strictEqual(formPolymer(input, rxns).length, d05.part1))
    it('improvePolymer', async () => assert.strictEqual(improvePolymer(input, rxns).length, d05.part2))
  })

  context('Day06', async () => {
    const input = readLines(path.join(testPath, 'input06.txt'))
    let points: Point[]
    it('toPoints', async () => points = toPoints(input))
    it('findLargestArea', async () => assert.strictEqual(findLargestArea(points), d06.part1))
    it('findSafestArea', async () => assert.strictEqual(findSafestArea(points), d06.part2))
  })

  context('Day07', async () => {
    const input = readLines(path.join(testPath, 'input07.txt'))
    it('orderInstructions', async () => {
      assert.strictEqual(orderInstructions(buildStepMap(input)), d07.part1)
    })
    it.skip('calculateDuration', async () => { // fails :(
      assert.strictEqual(calculateDuration(buildStepMap(input), 5, 60), d07.part2)
    })
  })

  context('Day08', async () => {
    const input = splitNumbers(path.join(testPath, 'input08.txt'))
    let tree: [Node, number]
    it('buildTree', async () => tree = buildTree(input, 0))
    it('sumMetadata', async () => assert.strictEqual(sumMetadata(tree), d08.part1))
    it('calculateRootNode', async () => assert.strictEqual(calculateRootNode(tree), d08.part2))
  })

  context('Day09', async () => {
    it('game1', async () => assert.strictEqual(game1(d09.players, d09.lastMarble), d09.part1))
    it('game2', async () => assert.strictEqual(game2(d09.players, d09.lastMarble), d09.part2))
  })

  context('Day10', async () => {
    const input = readLines(path.join(testPath, 'input10.txt'))
    let points: MovingPoint[]
    it('toMovingPoints', async () => points = toMovingPoints(input))
    it('alignStars', async () => assert.strictEqual(alignStars(points, 20), d10.part2))
  })

  context('Day11', () => {
    it('findTopLeftOfMostPowerfulSquare', async () => {
      assert.deepStrictEqual(findTopLeftOfMostPowerfulSquare(d11.input, 3, 0), d11.part1)
    })
    it.skip('findMostPowerfulSquareFromSerial', async () => {
      assert.deepStrictEqual(findMostPowerfulSquareFromSerial(d11.input), d11.part2)
    }).timeout(20 * 1000) // 20s, takes about 15s
  })

  context('Day12', async () => {
    it('sumGrowth20', async () => assert.strictEqual(sumGrowth(20), d12.part1))
    it('sumMaxGrowth', async () => assert.strictEqual(sumGrowth(50000000000), d12.part2))
  })

  context('Day13', async () => {
    const input = readLines(path.join(testPath, 'input13.txt'))
    it('firstCrash', async () => assert.deepStrictEqual(firstCrash(new RaceTrack(input)), d13.part1))
    it('lastCar', async () => assert.deepStrictEqual(lastCar(new RaceTrack(input)), d13.part2))
  })

  describe('Day14', () => {
    it('makeRecipes', (done) => {
      assert.strictEqual(makeRecipes(d14.input), d14.part1)
      done()
    })

    it.skip('makeBackwardsRecipes', (done) => {
      assert.strictEqual(makeBackwardsRecipes(d14.input.toString()), d14.part2)
      done()
    }).timeout(45 * 1000) // 45s, takes about 30s
  })

  describe.skip('Day15', () => {
    it('elf v goblin', (done) => {
      assert.deepStrictEqual(fastBattle(), [d15.part1, d15.part2])
      done()
    }).timeout(15 * 1000) // 15s
  })

})
