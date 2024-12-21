import assert from 'assert';
import 'mocha'
import { solve as day12 } from '../src/2024/day12'
import { solveStandard, solveWide } from '../src/2024/day15'
import { solve as day16 } from '../src/2024/day16'

describe('2024 examples', () => {
  describe('Day 12', () => {
    it('should determine fence costs - example 1', () => {
      const example = day12(['AAAA', 'BBCD', 'BBCC', 'EEEC'])
      assert.strictEqual(140, example.perimeter)
      assert.strictEqual(80, example.sides)
    })

    it('should determine fence costs - example 2', () => {
      const example = day12(['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO'])
      assert.strictEqual(772, example.perimeter)
      assert.strictEqual(436, example.sides)
    })

    it('should determine fence costs - example 3', () => {
      const testData = [
        'RRRRIICCFF',
        'RRRRIICCCF',
        'VVRRRCCFFF',
        'VVRCCCJFFF',
        'VVVVCJJCFE',
        'VVIVCCJJEE',
        'VVIIICJJEE',
        'MIIIIIJJEE',
        'MIIISIJEEE',
        'MMMISSJEEE'
      ]
      const example = day12(testData)
      assert.strictEqual(1930, example.perimeter)
      assert.strictEqual(1206, example.sides)
    })
  })

  describe('Day 15', () => {
    it('should move boxes - example 1', () => {
      const testData = [
        '#######',
        '#...#.#',
        '#.....#',
        '#..OO@#',
        '#..O..#',
        '#.....#',
        '#######',
        '',
        '<vv<<^^<<^^']
      assert.strictEqual(908, solveStandard(testData))
      assert.strictEqual(618, solveWide(testData))
    })
  })

  describe.only('Day 16', () => {
    it('should traverse maze - example 1', () => {
      const testData = [
        '###############',
        '#.......#....E#',
        '#.#.###.#.###.#',
        '#.....#.#...#.#',
        '#.###.#####.#.#',
        '#.#.#.......#.#',
        '#.#.#####.###.#',
        '#...........#.#',
        '###.#.#####.#.#',
        '#...#.....#.#.#',
        '#.#.#.###.#.#.#',
        '#.....#...#.#.#',
        '#.###.#.#.#.#.#',
        '#S..#.....#...#',
        '###############']

      const example = day16(testData)
      assert.strictEqual(7036, example.steps)
      assert.strictEqual(45, example.seats)
    })
    it('should traverse maze - example 2', () => {
      const testData = [
        '#################',
        '#...#...#...#..E#',
        '#.#.#.#.#.#.#.#.#',
        '#.#.#.#...#...#.#',
        '#.#.#.#.###.#.#.#',
        '#...#.#.#.....#.#',
        '#.#.#.#.#.#####.#',
        '#.#...#.#.#.....#',
        '#.#.#####.#.###.#',
        '#.#.#.......#...#',
        '#.#.###.#####.###',
        '#.#.#...#.....#.#',
        '#.#.#.#####.###.#',
        '#.#.#.........#.#',
        '#.#.#.#########.#',
        '#S#.............#',
        '#################']

      const example = day16(testData)
      assert.strictEqual(11048, example.steps)
      assert.strictEqual(64, example.seats)
    })
  })
})
