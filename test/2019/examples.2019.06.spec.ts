import assert from 'assert'
import 'mocha'
import { OrbitMap } from '../../src/2019/day06'

describe('2019 examples - Day 06', () => {
  it('should total orbits', () => {
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

  it('should total orbit transfers', () => {
    const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN']
    const omap: OrbitMap = new OrbitMap(input)
    // YOU are in orbit around K, and SAN is in orbit around I. To move from K to I, a minimum of 4 orbital transfers are required
    assert.strictEqual(omap.minimumOrbitTransfers(), 4)
  })
})
