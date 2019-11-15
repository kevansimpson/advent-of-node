import assert from 'assert';
import 'mocha'
import { buildCircuitMap } from '../../src/2015/day07'

describe('2015 examples - Day 07', () => {
  it('signal A', () => {
    const input = [
      '123 -> x',
      '456 -> y',
      'x AND y -> d',
      'x OR y -> e',
      'x LSHIFT 2 -> f',
      'y RSHIFT 2 -> g',
      'NOT x -> h',
      'NOT y -> i'
    ]
    const cmap = buildCircuitMap(input)
    assert.strictEqual(cmap.calculate('x'), 123)
    assert.strictEqual(cmap.calculate('y'), 456)
    assert.strictEqual(cmap.calculate('d'), 72)
    assert.strictEqual(cmap.calculate('e'), 507)
    assert.strictEqual(cmap.calculate('f'), 492)
    assert.strictEqual(cmap.calculate('g'), 114)
    assert.strictEqual(cmap.calculate('h'), 65412)
    assert.strictEqual(cmap.calculate('i'), 65079)
  })
})
