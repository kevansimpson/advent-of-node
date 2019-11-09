import assert from 'assert';
import 'mocha'
import { fightGoblins } from '../../src/2018/day15'

describe('2018 examples - Day 15', () => {
  it('should fight goblins example detailed', () => {
    const g = ['#######', '#.G...#', '#...EG#', '#.#.#G#', '#..G#E#', '#.....#', '#######']
    const a = fightGoblins(g)
    assert.deepStrictEqual(a, { rounds: 47, damage: 590, outcome: 27730 })
  })

  it('should fight goblins example 1', () => {
    const g = ['#######', '#G..#E#', '#E#E.E#', '#G.##.#', '#...#E#', '#...E.#', '#######']
    const a = fightGoblins(g)
    assert.deepStrictEqual(a, { rounds: 37, damage: 982, outcome: 36334 })
  })

  it('should fight goblins example 2', () => {
    const g = ['#######', '#E..EG#', '#.#G.E#', '#E.##E#', '#G..#.#', '#..E#.#', '#######']
    const a = fightGoblins(g)
    assert.deepStrictEqual(a, { rounds: 46, damage: 859, outcome: 39514 })
  })
})
