import assert from 'assert';
import 'mocha'
import { Point } from '../src/helpers/point';
import { findDuplicateFrequency, sum } from '../src/2018/day01'
import { checksum, countPairsAndTriples, findPrototype } from '../src/2018/day02'
import { Claim, Grid, buildClaimGrid, calculateOverlap, findAdjacentClaimId, parseClaim } from '../src/2018/day03'
import { Guard, findSleepiestGuard, getSleepiestMinute, parseRecords, strategy1, strategy2 } from '../src/2018/day04'
import { buildReactionMap, formPolymer, improvePolymer } from '../src/2018/day05'
import { findLargestArea, findSafestArea, toPoints } from '../src/2018/day06'
import { buildStepMap, calculateDuration, orderInstructions } from '../src/2018/day07'

describe('2018 examples', () => {
  describe('Day 01', () => {
    it('should return correct sum', () => {
      assert.equal(sum([1, 1, 1]), 3)
      assert.equal(sum([1, 1, -2]), 0)
      assert.equal(sum([-1, -2, -3]), -6)
    })

    it('should return duplicate frequency', () => {
      assert.equal(findDuplicateFrequency([1, -1]), 0)
      assert.equal(findDuplicateFrequency([3, 3, 4, -2, -4]), 10)
      assert.equal(findDuplicateFrequency([-6, 3, 8, 5, -6]), 5)
      assert.equal(findDuplicateFrequency([7, 7, -2, -7, -4]), 14)
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
      assert.equal(checksum(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']), 12)
    })

    it('should find prototype', () => {
      assert.equal(findPrototype(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz']), 'fgij')
    })
  })

  describe('Day 03', () => {
    it('should parse Claim', () => {
      const claim: Claim = parseClaim('#123 @ 3,2: 5x4')
      assert.equal(claim.id, 123)
      assert.equal(claim.left, 3)
      assert.equal(claim.top, 2)
      assert.equal(claim.width, 5)
      assert.equal(claim.height, 4)
      assert.equal(claim.points.length, 20)
    })

    const input: string[] = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2']
    const grid: Grid = buildClaimGrid(input)

    it('should calculate overlap', () => {
      assert.equal(calculateOverlap(grid.map), 4)
    })

    it('should find adjacent Claim id', () => {
      assert.equal(findAdjacentClaimId(grid), 3)
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
      assert.equal(guard.id, 10)
      assert.equal(getSleepiestMinute(guard), 24)
      assert.equal(strategy1(records), 240)
    })

    it('should return alternate strategy', () => {
      assert.equal(strategy2(records), 4455)
    })
  })

  describe('Day 05', () => {
    const rxns: Map<string, string> = buildReactionMap()
    it('should return polymer', () => {
      assert.equal(formPolymer('aA', rxns), '')
      assert.equal(formPolymer('abBA', rxns), '')
      assert.equal(formPolymer('abAB', rxns), 'abAB')
      assert.equal(formPolymer('aabAAB', rxns), 'aabAAB')
      assert.equal(formPolymer('dabAcCaCBAcCcaDA', rxns), 'dabCBAcaDA')
    })

    it('should return improved polymer', () => {
      assert.equal(improvePolymer('dabAcCaCBAcCcaDA', rxns), 'daDA')
    })
  })

  describe('Day 06', () => {
    const points: Point[] = toPoints(['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'])
    it('should find largest area', () => {
      assert.equal(findLargestArea(points), 17)
    })

    it('should find safest area', () => {
      assert.equal(findSafestArea(points, 32), 16)
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
      assert.equal(orderInstructions(buildStepMap(input)), 'CABDFE')
    })

    it('should calculate duration', () => {
      assert.equal(calculateDuration(buildStepMap(input), 2, 0), 15)
    })
  })
})
