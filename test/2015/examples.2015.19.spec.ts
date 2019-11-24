import assert from 'assert';
import 'mocha'
import { Chemist } from '../../src/2015/day19'

describe('2015 examples - Day 19', () => {
  it('total molecules', () => {
    const input = [ 'H => HO', 'H => OH', 'O => HH', 'HOH' ]
    const chem = new Chemist(input)
    assert.strictEqual(chem.totalMolecules(), 4)
  })
})
