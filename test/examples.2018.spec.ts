import assert from 'assert';
import 'mocha'
import { Point } from '../src/helpers/point'
import { findDuplicateFrequency, sum } from '../src/2018/day01'
import { checksum, countPairsAndTriples, findPrototype } from '../src/2018/day02'
import { Claim, Grid, buildClaimGrid, calculateOverlap, findAdjacentClaimId, parseClaim } from '../src/2018/day03'
import { Guard, findSleepiestGuard, getSleepiestMinute, parseRecords, strategy1, strategy2 } from '../src/2018/day04'
import { buildReactionMap, formPolymer, improvePolymer } from '../src/2018/day05'
import { findLargestArea, findSafestArea, toPoints } from '../src/2018/day06'
import { buildStepMap, calculateDuration, orderInstructions } from '../src/2018/day07'
import { Node, buildTree, calculateRootNode, sumMetadata } from '../src/2018/day08'
import { highestScore, playGame } from '../src/2018/day09'
import { alignStars, toMovingPoints } from '../src/2018/day10'
import { findMostPowerfulSquareFromSerial, findTopLeftOfMostPowerfulSquare, powerCell } from '../src/2018/day11'
import { sumGrowth } from '../src/2018/day12'
import { RaceTrack, firstCrash, lastCar } from '../src/2018/day13'
import { makeBackwardsRecipes, makeRecipes } from '../src/2018/day14'

describe('2018 examples', () => {
  describe('Day 01', () => {
    it('should return correct sum', () => {
      assert.strictEqual(sum([1, 1, 1]), 3)
      assert.strictEqual(sum([1, 1, -2]), 0)
      assert.strictEqual(sum([-1, -2, -3]), -6)
    })

    it('should return duplicate frequency', () => {
      assert.strictEqual(findDuplicateFrequency([1, -1]), 0)
      assert.strictEqual(findDuplicateFrequency([3, 3, 4, -2, -4]), 10)
      assert.strictEqual(findDuplicateFrequency([-6, 3, 8, 5, -6]), 5)
      assert.strictEqual(findDuplicateFrequency([7, 7, -2, -7, -4]), 14)
    })
  })

  describe('Day 02', () => {
    it('should count pairs and triples', () => {
      assert.deepEqual(countPairsAndTriples('abcdef'), {a: 1, b: 1, c: 1, d: 1, e: 1, f: 1})
      assert.deepEqual(countPairsAndTriples('bababc'), {b: 3, a: 2, c: 1})
      assert.deepEqual(countPairsAndTriples('abbcde'), {a: 1, b: 2, c: 1, d: 1, e: 1})
      assert.deepEqual(countPairsAndTriples('abcccd'), {a: 1, b: 1, c: 3, d: 1})
      assert.deepEqual(countPairsAndTriples('aabcdd'), {a: 2, b: 1, c: 1, d: 2})
      assert.deepEqual(countPairsAndTriples('abcdee'), {a: 1, b: 1, c: 1, d: 1, e: 2})
      assert.deepEqual(countPairsAndTriples('ababab'), {a: 3, b: 3})
      assert.strictEqual(checksum(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']), 12)
    })

    it('should find prototype', () => {
      assert.strictEqual(findPrototype(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz']), 'fgij')
    })
  })

  describe('Day 03', () => {
    it('should parse Claim', () => {
      const claim: Claim = parseClaim('#123 @ 3,2: 5x4')
      assert.strictEqual(claim.id, 123)
      assert.strictEqual(claim.left, 3)
      assert.strictEqual(claim.top, 2)
      assert.strictEqual(claim.width, 5)
      assert.strictEqual(claim.height, 4)
      assert.strictEqual(claim.points.length, 20)
    })

    const input: string[] = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2']
    const grid: Grid = buildClaimGrid(input)

    it('should calculate overlap', () => {
      assert.strictEqual(calculateOverlap(grid.map), 4)
    })

    it('should find adjacent Claim id', () => {
      assert.strictEqual(findAdjacentClaimId(grid), 3)
    })
  })

  describe('Day 04', () => {
    const input: string[] = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up'
    ]
    const records = parseRecords(input.sort())

    it('should return guardID * minute', () => {
      const guard: Guard = findSleepiestGuard(records)
      assert.strictEqual(guard.id, 10)
      assert.strictEqual(getSleepiestMinute(guard), 24)
      assert.strictEqual(strategy1(records), 240)
    })

    it('should return alternate strategy', () => {
      assert.strictEqual(strategy2(records), 4455)
    })
  })

  describe('Day 05', () => {
    const rxns: Map<string, string> = buildReactionMap()
    it('should return polymer', () => {
      assert.strictEqual(formPolymer('aA', rxns), '')
      assert.strictEqual(formPolymer('abBA', rxns), '')
      assert.strictEqual(formPolymer('abAB', rxns), 'abAB')
      assert.strictEqual(formPolymer('aabAAB', rxns), 'aabAAB')
      assert.strictEqual(formPolymer('dabAcCaCBAcCcaDA', rxns), 'dabCBAcaDA')
    })

    it('should return improved polymer', () => {
      assert.strictEqual(improvePolymer('dabAcCaCBAcCcaDA', rxns), 'daDA')
    })
  })

  describe('Day 06', () => {
    const points: Point[] = toPoints(['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'])
    it('should find largest area', () => {
      assert.strictEqual(findLargestArea(points), 17)
    })

    it('should find safest area', () => {
      assert.strictEqual(findSafestArea(points, 32), 16)
    })
  })

  describe('Day 07', () => {
    const input = [
      'Step C must be finished before step A can begin.',
      'Step C must be finished before step F can begin.',
      'Step A must be finished before step B can begin.',
      'Step A must be finished before step D can begin.',
      'Step B must be finished before step E can begin.',
      'Step D must be finished before step E can begin.',
      'Step F must be finished before step E can begin.'
    ]

    it('should order instructions', () => {
      assert.strictEqual(orderInstructions(buildStepMap(input)), 'CABDFE')
    })

    it('should calculate duration', () => {
      assert.strictEqual(calculateDuration(buildStepMap(input), 2, 0), 15)
    })
  })

  describe('Day 08', () => {
    const input = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
    const tree: [Node, number] = buildTree(input, 0)

    it('should sum metadata', () => {
      assert.strictEqual(sumMetadata(tree), 138)
    })

    it('should calculate root node', () => {
      assert.strictEqual(calculateRootNode(tree), 66)
    })
  })

  describe('Day 09', () => {
    it('should score game correctly', () => {
      assert.strictEqual(highestScore(playGame(9, 25)), 32)
      assert.strictEqual(highestScore(playGame(10, 1618)), 8317)
      assert.strictEqual(highestScore(playGame(13, 7999)), 146373)
      assert.strictEqual(highestScore(playGame(17, 1104)), 2764)
      assert.strictEqual(highestScore(playGame(21, 6111)), 54718)
      assert.strictEqual(highestScore(playGame(30, 5807)), 37305)
    })
  })

  describe('Day 10', () => {
    it('should identify word in the stars', () => {
      const input = [
        'position=< 9,  1> velocity=< 0,  2>', 'position=< 7,  0> velocity=<-1,  0>',
        'position=< 3, -2> velocity=<-1,  1>', 'position=< 6, 10> velocity=<-2, -1>',
        'position=< 2, -4> velocity=< 2,  2>', 'position=<-6, 10> velocity=< 2, -2>',
        'position=< 1,  8> velocity=< 1, -1>', 'position=< 1,  7> velocity=< 1,  0>',
        'position=<-3, 11> velocity=< 1, -2>', 'position=< 7,  6> velocity=<-1, -1>',
        'position=<-2,  3> velocity=< 1,  0>', 'position=<-4,  3> velocity=< 2,  0>',
        'position=<10, -3> velocity=<-1,  1>', 'position=< 5, 11> velocity=< 1, -2>',
        'position=< 4,  7> velocity=< 0, -1>', 'position=< 8, -2> velocity=< 0,  1>',
        'position=<15,  0> velocity=<-2,  0>', 'position=< 1,  6> velocity=< 1,  0>',
        'position=< 8,  9> velocity=< 0, -1>', 'position=< 3,  3> velocity=<-1,  1>',
        'position=< 0,  5> velocity=< 0, -1>', 'position=<-2,  2> velocity=< 2,  0>',
        'position=< 5, -2> velocity=< 1,  2>', 'position=< 1,  4> velocity=< 2,  1>',
        'position=<-2,  7> velocity=< 2, -2>', 'position=< 3,  6> velocity=<-1, -1>',
        'position=< 5,  0> velocity=< 1,  0>', 'position=<-6,  0> velocity=< 2,  0>',
        'position=< 5,  9> velocity=< 1, -2>', 'position=<14,  7> velocity=<-2,  0>',
        'position=<-3,  6> velocity=< 2, -1>'
      ]
      assert.strictEqual(alignStars(toMovingPoints(input), 10), 3)
    })
  })

  describe('Day 11', () => {
    it('should identify most powerful buildings', () => {
      assert.strictEqual(powerCell([3, 5], 8)[2], 4)
      assert.strictEqual(powerCell([122, 79], 57)[2], -5)
      assert.strictEqual(powerCell([217, 196], 39)[2], 0)
      assert.strictEqual(powerCell([101, 153], 71)[2], 4)
      assert.deepStrictEqual(findTopLeftOfMostPowerfulSquare(18, 3, 0), [[[33, 45], 18, 4], 29])
      assert.deepStrictEqual(findTopLeftOfMostPowerfulSquare(42, 3, 0), [[[21, 61], 42, 4], 30])
    })

    it.skip('should identify buildings from serial', () => {
      assert.deepStrictEqual(findMostPowerfulSquareFromSerial(18), [[[90, 269], 18, 3], 16])
      assert.deepStrictEqual(findMostPowerfulSquareFromSerial(42), [[[232, 251], 42, 2], 12])
    }).timeout(5000 * 9) // 45s timeout, typically takes around 30s
  })

  describe('Day 12', () => {
    it('should sum growth', () => {
      assert.strictEqual(325, sumGrowth(20, './test/resources/2018/input12.example.txt'))
    })
  })

  describe('Day 13', () => {
    it('should identify first crash', () => {
      const input: string[] = [
        '/->-\\        ',
        '|   |  /----\\',
        '| /-+--+-\\  |',
        '| | |  | v  |',
        '\\-+-/  \\-+--/',
        '  \\------/   '
      ]
      const rt: RaceTrack = new RaceTrack(input)
      rt.display()
      assert.deepStrictEqual(firstCrash(rt), [7, 3])
    })

    it('should find last car standing', () => {
      const input: string[] = [
        '/>-<\\  ',
        '|   |  ',
        '| /<+-\\',
        '| | | v',
       '\\>+</ |',
        '  |   ^',
        '  \\<->/'
      ]
      const rt: RaceTrack = new RaceTrack(input)
      rt.display()
      assert.deepStrictEqual(lastCar(rt), [6, 4])
    })
  })

  describe('Day 14', () => {
    it('should make recipes', () => {
      assert.strictEqual('5158916779', makeRecipes(9))
      assert.strictEqual('0124515891', makeRecipes(5))
      assert.strictEqual('9251071085', makeRecipes(18))
      assert.strictEqual('5941429882', makeRecipes(2018))
    })

    it('should make backwards recipes', () => {
      assert.strictEqual(9, makeBackwardsRecipes('51589'))
      assert.strictEqual(5, makeBackwardsRecipes('01245'))
      assert.strictEqual(18, makeBackwardsRecipes('92510'))
      assert.strictEqual(2018, makeBackwardsRecipes('59414'))
    })
  })
})
