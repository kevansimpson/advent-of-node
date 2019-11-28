import assert from 'assert'
import 'mocha'
import { arrangePackages } from '../../src/2015/day24'

describe('2015 examples - Day 24', () => {
  // weights 1 through 5 and 7 through 11
  const input = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
  it('arrange packages', () => {
    assert.strictEqual(arrangePackages([...input], 3), 99)
  })

  it('arrange packages + trunk', () => {
    assert.strictEqual(arrangePackages([...input], 4), 44)
  })
})
