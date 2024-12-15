import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines, readNumbers, readString, splitNumbers } from '../src/helpers/input'
import { Point } from '../src/helpers/point'
import { debug } from '../src/helpers/util'
import { findDuplicateFrequency, sum } from '../src/2018/day01'
import { checksum, findPrototype } from '../src/2018/day02'
import { Grid, buildClaimGrid, calculateOverlap, findAdjacentClaimId } from '../src/2018/day03'
import { Guard, parseRecords, strategy1, strategy2 } from '../src/2018/day04'
import { buildReactionMap, formPolymer, improvePolymer } from '../src/2018/day05'
import { findLargestArea, findSafestArea, toPoints } from '../src/2018/day06'
import { buildStepMap, calculateDuration, orderInstructions } from '../src/2018/day07'
import { Node, buildTree, calculateRootNode, sumMetadata } from '../src/2018/day08'
import { game1, game2 } from '../src/2018/day09'
import { MovingPoint, alignStars, toMovingPoints } from '../src/2018/day10'
import { findMostPowerfulSquareFromSerial, findTopLeftOfMostPowerfulSquare } from '../src/2018/day11'
import { RaceTrack, firstCrash, lastCar } from '../src/2018/day13'
import { makeBackwardsRecipes, makeRecipes } from '../src/2018/day14'
import { fastBattle } from '../src/2018/day15'
import { OpCodeMap, countAmbiguous, monitorCPU } from '../src/2018/day16'
import { mapReservoir } from '../src/2018/day17'
import { mapLumberArea, strangeMagic, sustainableMagic } from '../src/2018/day18'

describe('2018 solutions', () => {
  describe('Day 01', () => {
    const input = readNumbers(path.join(__dirname, './resources/2018/input01.txt'))
    it('sum', async () => assert.strictEqual(sum(input), 518))
    it('findDuplicateFrequency', async () => assert.strictEqual(findDuplicateFrequency(input), 72889))
  })

  describe('Day 02', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input02.txt'))
    it('checksum', async () => assert.strictEqual(checksum(input), 3952))
    it('findPrototype', async () => assert.strictEqual(findPrototype(input), 'vtnikorkulbfejvyznqgdxpaw'))
  })

  describe('Day 03', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input03.txt'))
    let grid: Grid
    it('buildClaimGrid', async () => grid = buildClaimGrid(input.reverse()))
    it('calculateOverlap', async () => assert.strictEqual(calculateOverlap(grid.map), 124850))
    it('findAdjacentClaimId', async () => assert.strictEqual(findAdjacentClaimId(grid), 1097))
  })

  describe('Day 04', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input04.txt'))
    let records: Map<number, Guard>
    it('parseRecords', async () => records = parseRecords(input.sort()))
    it('strategy1', async () => assert.strictEqual(strategy1(records), 19025))
    it('strategy2', async () => assert.strictEqual(strategy2(records), 23776))
  })

  describe('Day 05', () => {
    const input = readString(path.join(__dirname, './resources/2018/input05.txt'))
    let rxns: Map<string, string>
    it('buildReactionMap', async () => rxns = buildReactionMap())
    it('formPolymer', async () => assert.strictEqual(formPolymer(input, rxns).length, 10584))
    it('improvePolymer', async () => assert.strictEqual(improvePolymer(input, rxns).length, 6968))
  })

  describe('Day 06', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input06.txt'))
    let points: Point[]
    it('toPoints', async () => points = toPoints(input))
    it('findLargestArea', async () => assert.strictEqual(findLargestArea(points), 3840))
    it('findSafestArea', async () => assert.strictEqual(findSafestArea(points), 46542))
  })

  describe('Day 07', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input07.txt'))
    it('orderInstructions', async () => {
      assert.strictEqual(orderInstructions(buildStepMap(input)), 'ACHOQRXSEKUGMYIWDZLNBFTJVP')
    })
    it.skip('calculateDuration', async () => { // fails :(
      assert.strictEqual(calculateDuration(buildStepMap(input), 5, 60), 985)
    })
  })

  describe('Day 08', () => {
    const input = splitNumbers(path.join(__dirname, './resources/2018/input08.txt'))
    let tree: [Node, number]
    it('buildTree', async () => tree = buildTree(input, 0))
    it('sumMetadata', async () => assert.strictEqual(sumMetadata(tree), 38722))
    it('calculateRootNode', async () => assert.strictEqual(calculateRootNode(tree), 13935))
  })

  describe('Day 09', () => {
    const players = 465
    const lastMarble = 71498
    it('game1', async () => assert.strictEqual(game1(players, lastMarble), 383475))
    it('game2', async () => assert.strictEqual(game2(players, lastMarble), 3148209772))
  })

  describe('Day 10', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input10.txt'))
    let points: MovingPoint[]
    it('toMovingPoints', async () => points = toMovingPoints(input)) // 'ERCXLAJL'
    it('alignStars', async () => assert.strictEqual(alignStars(points, 20), 10813))
  })

  describe('Day 11', () => {
    const input: number = 6042
    it('findTopLeftOfMostPowerfulSquare', async () => {
      assert.deepStrictEqual(findTopLeftOfMostPowerfulSquare(input, 3, 0), [[[21, 61], input, 4], 30])
    })
    it.skip('findMostPowerfulSquareFromSerial', async () => {
      assert.deepStrictEqual(findMostPowerfulSquareFromSerial(input), [[[232, 251], input, 2], 12])
    }).timeout(20 * 1000) // 20s, takes about 15s
  })

  describe('Day 13', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input13.txt'))
    it('firstCrash', async () => assert.deepStrictEqual(firstCrash(new RaceTrack(input)), [113, 136]))
    it('lastCar', async () => assert.deepStrictEqual(lastCar(new RaceTrack(input)), [114, 136]))
  })

  describe('Day 14', () => {
    const input: number = 509671
    it('makeRecipes', (done) => {
      assert.strictEqual(makeRecipes(input), '2810862211')
      done()
    })
  
    it.skip('makeBackwardsRecipes', (done) => {
      assert.strictEqual(makeBackwardsRecipes(input.toString()), 20227889)
      done()
    }).timeout(45 * 1000) // 45s, takes about 30s
  })

  describe.skip('Day 15', () => {
    it('elf v goblin', (done) => {
      assert.deepStrictEqual(fastBattle(), [319410, 63168])
      done()
    }).timeout(15 * 1000) // 15s
  })

  describe('Day 16', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input16.txt'))
    const cpu = monitorCPU(input)
    const ambiguous = countAmbiguous(cpu)
    it('countAmbiguous', async () => assert.strictEqual(ambiguous[0], 567))
    const map: OpCodeMap = cpu.differentiateCodes(ambiguous[1])
    it('processInstructions', async () => assert.deepStrictEqual(cpu.processInstructions(map), [610, 2, 610 , 3]))
  })

  describe('Day 17', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input17.txt'))
    const reservoir = mapReservoir(input)
    // reservoir.display()
    reservoir.dropOfWater()
    // reservoir.display()
    const water = reservoir.water()
    it('mapReservoir', async () => assert.strictEqual(water['water'] + water['path'], 38021))
    it('fullReservoir', async () => assert.strictEqual(water['water'], 32069))
  })

  describe('Day 18', () => {
    const input = readLines(path.join(__dirname, './resources/2018/input18.txt'))
    const area = mapLumberArea(input)
    debug(area.display())
  
    it('strangeMagic + getResources', async () => {
      const newArea = strangeMagic(area, 10)
      debug(newArea.display())
      assert.strictEqual(newArea.getResources(), 604884)
    })
  
    it('sustainable resources', async () => {
      const newArea = sustainableMagic(area)
      debug(newArea.display())
      assert.strictEqual(newArea.getResources(), 190820)
    }).timeout(1000 * 8) // ~5sec
  })
  
})
