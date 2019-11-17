import assert from 'assert';
import 'mocha'
import { sumDocument } from '../../src/2015/day12'

describe('2015 examples - Day 12', () => {
  it('sum document', () => {
    assert.strictEqual(sumDocument('[1,2,3]'), 6)
    assert.strictEqual(sumDocument('{"a":2,"b":4}'), 6)
    assert.strictEqual(sumDocument('[[[3]]]'), 3)
    assert.strictEqual(sumDocument('{"a":{"b":4},"c":-1}'), 3)
    assert.strictEqual(sumDocument('{"a":[-1,1]}'), 0)
    assert.strictEqual(sumDocument('[-1,{"a":1}]'), 0)
    assert.strictEqual(sumDocument('[]'), 0)
    assert.strictEqual(sumDocument('{}'), 0)
  })

  it('sum document w/ exclusions', () => {
    assert.strictEqual(sumDocument('[1,2,3]', ['red']), 6)
    assert.strictEqual(sumDocument('[1,{"c":"red","b":2},3]', ['red']), 4)
    assert.strictEqual(sumDocument('{"d":"red","e":[1,2,3,4],"f":5}', ['red']), 0)
    assert.strictEqual(sumDocument('[1,"red",5]', ['red']), 6)
  })
})
