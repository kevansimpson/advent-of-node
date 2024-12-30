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
import { solve as day14 } from '../src/2024/day14'
import { solveStandard, solveWide } from '../src/2024/day15'
import { solve as day16 } from '../src/2024/day16'
import { runProgram, lowestRegisterA } from '../src/2024/day17'
import { solve as day18 } from '../src/2024/day18'
import { solve as day19 } from '../src/2024/day19'
import { solve as day20 } from '../src/2024/day20'
import { solve as day21 } from '../src/2024/day21'

describe('2024 answers', () => {
  it('Day01: list distances', async () => {
    const result = day01(readLines(path.join(__dirname, './resources/2024/input01.txt')))
    assert.deepStrictEqual(result, [2057374, 23177084])
  })

  it('Day02: inspect levels', async () => {
    const result = day02(readLines(path.join(__dirname, './resources/2024/input02.txt')))
    assert.deepStrictEqual(result, [534, 577])
  })

  it ('Day03: multiply corrupted', async () => {
    const result = day03(readString(path.join(__dirname, './resources/2024/input03.txt')))
    assert.deepStrictEqual(result, [184122457, 107862689])
  })

  it ('Day04: xmas word search', async () => {
    const result = day04(readLines(path.join(__dirname, './resources/2024/input04.txt')))
    assert.deepStrictEqual(result, [2530, 1921])
  })

  it('Day05: page ordering', async () => {
    const result = day05(readLines(path.join(__dirname, './resources/2024/input05.txt')))
    assert.deepStrictEqual(result, [6612, 4944])
  })

  it('Day06: follow guard', async () => {
    const result = day06(readLines(path.join(__dirname, './resources/2024/input06.txt')))
    assert.deepStrictEqual(result, [4454, 1503])
  }).timeout(5000)

  it('Day07: calibrate results', async () => {
    const result = day07(readLines(path.join(__dirname, './resources/2024/input07.txt')))
    assert.deepStrictEqual(result, [42283209483350, 1026766857276279])
  })

  it('Day08: find antinodes', async () => {
    const result = day08(readLines(path.join(__dirname, './resources/2024/input08.txt')))
    assert.deepStrictEqual(result, [327, 1233])
  })

  describe('Day09: checksum', async () => {
    const input = readString(path.join(__dirname, './resources/2024/input09.txt'))
    it('checksum 1', async () => assert.strictEqual(await day09a(input), 6334655979668))
    it('checksum 2', async () => assert.strictEqual(await day09b(input), 6349492251099))
  })

  it('Day10: ascend trails', async () => {
    const result = day10(readLines(path.join(__dirname, './resources/2024/input10.txt')))
    assert.deepStrictEqual(result, [733, 1514])
  })

  it('Day11: count stones', async () => {
    const result = day11(readString(path.join(__dirname, './resources/2024/input11.txt')))
    assert.deepStrictEqual(result, [203609, 240954878211138])
  })

  it('Day12: fence costs', async () => {
    const result = day12(readLines(path.join(__dirname, './resources/2024/input12.txt')))
    assert.deepStrictEqual(result, [1304764, 811148])
  })

  it('Day13: game moves', async () => {
    const result = day13(readLines(path.join(__dirname, './resources/2024/input13.txt')))
    assert.deepStrictEqual(result, [33209, 83102355665474])
  })

  it('Day14: robot guards', async () => {
    const result = day14(readLines(path.join(__dirname, './resources/2024/input14.txt')), 101, 103)
    assert.deepStrictEqual(result, [208437768, 7492])
  })

  describe('Day15: move boxes', async () => {
    const input = readLines(path.join(__dirname, './resources/2024/input15.txt'))
    it('standard boxes', async () => {
      assert.strictEqual(solveStandard(input), 1457740)
    })
    it('wide boxes', async () => {
      assert.strictEqual(solveWide(input), 1467145)
    })
  })

  it('Day16: reindeer maze', async () => {
    const result = day16(readLines(path.join(__dirname, './resources/2024/input16.txt')))
    assert.deepStrictEqual(result, [85432, 465])
  })

  describe('Day17: Historian computer', async () => {
    const input = readLines(path.join(__dirname, './resources/2024/input17.txt'))
    it('program output', async () => {
      assert.strictEqual(runProgram(input), '3,5,0,1,5,1,5,1,0')
    })
    it('lowest register A', async () => {
      assert.strictEqual(lowestRegisterA(input), 107413700225434n)
    })
  })

  it('Day18: corrupted memory', async () => {
    const result = day18(readLines(path.join(__dirname, './resources/2024/input18.txt')))
    assert.deepStrictEqual(result, [454, '8,51'])
  }).timeout(5000)

  it('Day19: towel designs', async () => {
    const result = day19(readLines(path.join(__dirname, './resources/2024/input19.txt')))
    assert.deepStrictEqual(result, [251, 616957151871345])
  })

  it('Day20: race condition', async () => {
    const result = day20(readLines(path.join(__dirname, './resources/2024/input20.txt')))
    assert.deepStrictEqual(result, [1454, 997879])
  })

  it('Day21: keypad conundrum', async () => {
    const result = day21(['935A', '319A', '480A', '789A', '176A'])
    assert.deepStrictEqual(result, [188398, 230049027535970])
  })
})
