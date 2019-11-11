import assert from 'assert';
import 'mocha'
import { findFloor, firstEntersBasement } from '../../src/2015/day01'

describe('2015 examples - Day 01', () => {
  it('findFloor', () => {
    assert.strictEqual(findFloor('(())'), 0)
    assert.strictEqual(findFloor('()()'), 0)
    assert.strictEqual(findFloor('((('), 3)
    assert.strictEqual(findFloor('(()(()('), 3)
    assert.strictEqual(findFloor('))((((('), 3)
    assert.strictEqual(findFloor('())'), -1)
    assert.strictEqual(findFloor('))('), -1)
    assert.strictEqual(findFloor(')))'), -3)
    assert.strictEqual(findFloor(')())())'), -3)
  })

  it('firstEntersBasement', () => {
    assert.strictEqual(firstEntersBasement(')'), 1)
    assert.strictEqual(firstEntersBasement('()())'), 5)
  })
})
