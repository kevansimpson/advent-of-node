import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines, readString } from '../src/helpers/input'
import { solve as day01 } from '../src/2024/day01'
import { solve as day02 } from '../src/2024/day02'
import { solve as day03 } from '../src/2024/day03'
import { solve as day04 } from '../src/2024/day04'
import { solve as day05 } from '../src/2024/day05'
import { solve as day06 } from '../src/2024/day06'
import { solve as day07 } from '../src/2024/day07'
import { solve as day08 } from '../src/2024/day08'
import { solve as day09a, solveBlocks as day09b } from '../src/2024/day09'
import { solve as day10 } from '../src/2024/day10'
import { solve as day11 } from '../src/2024/day11'
import { solve as day12 } from '../src/2024/day12'
import { solve as day13 } from '../src/2024/day13'

describe('2024 answers', () => {
  it('Day01: list distances', async () => {
    const result = day01(readLines(path.join(__dirname, './resources/2024/input01.txt')))
    assert.strictEqual(result.diff, 2057374)
    assert.strictEqual(result.score, 23177084)
  })

  it('Day02: inspect levels', async () => {
    const result = day02(readLines(path.join(__dirname, './resources/2024/input02.txt')))
    assert.strictEqual(result.safe, 534)
    assert.strictEqual(result.singleBad, 577)
  })

  it ('Day03: multiply corrupted', async () => {
    const result = day03(readString(path.join(__dirname, './resources/2024/input03.txt')))
    assert.strictEqual(result.all, 184122457)
    assert.strictEqual(result.enabled, 107862689)
  })

  it ('Day04: xmas word search', async () => {
    const result = day04(readLines(path.join(__dirname, './resources/2024/input04.txt')))
    assert.strictEqual(result.xmas, 2530)
    assert.strictEqual(result.masCross, 1921)
  })

  it('Day05: page ordering', async () => {
    const result = day05(readLines(path.join(__dirname, './resources/2024/input05.txt')))
    assert.strictEqual(result.middleSum, 6612)
    assert.strictEqual(result.corrected, 4944)
  })

  it('Day06: follow guard', async () => {
    const result = day06(readLines(path.join(__dirname, './resources/2024/input06.txt')))
    assert.strictEqual(result.unique, 4454)
    assert.strictEqual(result.loops, 1503)
  }).timeout(3000)

  it('Day07: calibrate results', async () => {
    const result = day07(readLines(path.join(__dirname, './resources/2024/input07.txt')))
    assert.strictEqual(result.calibration, 42283209483350)
    assert.strictEqual(result.concatenation, 1026766857276279)
  })

  it('Day08: find antinodes', async () => {
    const result = day08(readLines(path.join(__dirname, './resources/2024/input08.txt')))
    assert.strictEqual(result.count, 327)
    assert.strictEqual(result.harmonics, 1233)
  })

  it('Day09: checksum', async () => {
    const input = readString(path.join(__dirname, './resources/2024/input09.txt'))
    it('checksum 1', async () => assert.strictEqual(await day09a(input), 6334655979668))
    it('checksum 2', async () => assert.strictEqual(await day09b(input), 6349492251099))
  })

  it('Day10: ascend trails', async () => {
    const result = await day10(readLines(path.join(__dirname, './resources/2024/input10.txt')))
    assert.strictEqual(result.sum, 733)
    assert.strictEqual(result.rating, 1514)
  })

  it('Day11: count stones', async () => {
    const result = day11(readString(path.join(__dirname, './resources/2024/input11.txt')))
    assert.strictEqual(result.blinks25, 203609)
    assert.strictEqual(result.blinks75, 240954878211138)
  })

  it('Day12: fence costs', async () => {
    const result = day12(readLines(path.join(__dirname, './resources/2024/input12.txt')))
    assert.strictEqual(result.perimeter, 1304764)
    assert.strictEqual(result.sides, 811148)
  })

  it('Day13: game moves', async () => {
    const result = day13(readLines(path.join(__dirname, './resources/2024/input13.txt')))
    assert.strictEqual(result.near, 33209)
    assert.strictEqual(result.far, 83102355665474)
  })
})
