import assert from 'assert'
import 'mocha'
import { countSteps, crossWires } from '../../src/2019/day03'

describe('2019 examples - Day 03', () => {
  it('should cross wires', () => {
    assert.strictEqual(crossWires(_s('R8,U5,L5,D3'), _s('U7,R6,D4,L4')), 6)
    assert.strictEqual(crossWires(_s('R75,D30,R83,U83,L12,D49,R71,U7,L72'), _s('U62,R66,U55,R34,D71,R55,D58,R83')), 159)
    assert.strictEqual(crossWires(_s('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'), _s('U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')), 135)
  })

  it('should count steps', () => {
    assert.strictEqual(countSteps(_s('R8,U5,L5,D3'), _s('U7,R6,D4,L4')), 30)
    assert.strictEqual(countSteps(_s('R75,D30,R83,U83,L12,D49,R71,U7,L72'), _s('U62,R66,U55,R34,D71,R55,D58,R83')), 610)
    assert.strictEqual(countSteps(_s('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'), _s('U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')), 410)
  })
})

function _s (str: string): string[] {
  return str.split(',')
}
