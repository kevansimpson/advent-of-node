import assert from 'assert';
import 'mocha'
import { buildReactionMap, formPolymer, improvePolymer } from '../../src/2018/day05'

describe('2018 examples - Day 05', () => {
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
