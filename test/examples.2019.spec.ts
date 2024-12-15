import assert from 'assert'
import 'mocha'
import { intCode } from '../src/2019/intCode'
import { countSteps, crossWires } from '../src/2019/day03'
import { Enhanced } from '../src/2019/day05'
import { OrbitMap } from '../src/2019/day06'

describe('2019 examples', () => {
  it('Day 02: should run program', async () => {
    assert.deepStrictEqual(intCode([1,0,0,0,99]), [2,0,0,0,99])
    assert.deepStrictEqual(intCode([2,3,0,3,99]), [2,3,0,6,99])
    assert.deepStrictEqual(intCode([2,4,4,5,99,0]), [2,4,4,5,99,9801])
    assert.deepStrictEqual(intCode([1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99])
  })

  it('Day03: should cross wires', async () => {
    assert.strictEqual(crossWires(_s('R8,U5,L5,D3'), _s('U7,R6,D4,L4')), 6)
    assert.strictEqual(crossWires(_s('R75,D30,R83,U83,L12,D49,R71,U7,L72'), _s('U62,R66,U55,R34,D71,R55,D58,R83')), 159)
    assert.strictEqual(crossWires(_s('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'), _s('U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')), 135)
  })

  it('Day03: should count steps', async () => {
    assert.strictEqual(countSteps(_s('R8,U5,L5,D3'), _s('U7,R6,D4,L4')), 30)
    assert.strictEqual(countSteps(_s('R75,D30,R83,U83,L12,D49,R71,U7,L72'), _s('U62,R66,U55,R34,D71,R55,D58,R83')), 610)
    assert.strictEqual(countSteps(_s('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'), _s('U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')), 410)
  })

  it('Day05: should run enhanced program', async () => {
    assert.deepStrictEqual(intCode([3,0,4,0,99], new Enhanced(1)), [1,0,4,0,99])
    assert.deepStrictEqual(intCode([1002,4,3,5,99,33], new Enhanced(1)), [1002,4,3,5,99,297])
  })

  it('Day06: should total orbits', () => {
    const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L']
    const omap: OrbitMap = new OrbitMap(input)
    // D directly orbits C and indirectly orbits B and COM, a total of 3 orbits.
    assert.strictEqual(omap.countOrbits('D'), 3)
    // L directly orbits K and indirectly orbits J, E, D, C, B, and COM, a total of 7 orbits.
    assert.strictEqual(omap.countOrbits('L'), 7)
    // COM orbits nothing
    assert.strictEqual(omap.countOrbits('COM'), 0)
    // example
    assert.strictEqual(omap.totalOrbits(), 42)
  })

  it('Day06: should total orbit transfers', () => {
    const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN']
    const omap: OrbitMap = new OrbitMap(input)
    // YOU are in orbit around K, and SAN is in orbit around I. To move from K to I, a minimum of 4 orbital transfers are required
    assert.strictEqual(omap.minimumOrbitTransfers(), 4)
  })
})

function _s (str: string): string[] {
  return str.split(',')
}
