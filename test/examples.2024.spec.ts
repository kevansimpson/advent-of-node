import assert from 'assert';
import 'mocha'
import { solve } from '../src/2024/day12'
import { solveStandard, solveWide } from '../src/2024/day15'

describe('2024 examples', () => {
  describe('Day 12', () => {
    it('should determine fence costs - example 1', () => {
      const example = solve(['AAAA', 'BBCD', 'BBCC', 'EEEC'])
      assert.strictEqual(140, example.perimeter)
      assert.strictEqual(80, example.sides)
    })

    it('should determine fence costs - example 2', () => {
      const example = solve(['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO'])
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
      const example = solve(testData)
      assert.strictEqual(1930, example.perimeter)
      assert.strictEqual(1206, example.sides)
    })
  })

  describe('Day 15', () => {
    it('should move boxes - example 1', () => {
      const example = [
        '#######',
        '#...#.#',
        '#.....#',
        '#..OO@#',
        '#..O..#',
        '#.....#',
        '#######',
        '',
        '<vv<<^^<<^^']
      assert.strictEqual(908, solveStandard(example))
      assert.strictEqual(618, solveWide(example))
    })
  })
})
