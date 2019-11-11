import assert from 'assert';
import 'mocha'
import { mapReservoir } from '../../src/2018/day17'

describe('2018 examples - Day 17', () => {
  it('water flowing', async () => {
    const input = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`.split(/\r?\n/g)

    const reservoir = mapReservoir(input)
    assert.strictEqual(reservoir.minX, 493)
    assert.strictEqual(reservoir.maxX, 508)
    assert.strictEqual(reservoir.minY, 1)
    assert.strictEqual(reservoir.maxY, 13)
    // reservoir.display()
    reservoir.dropOfWater()
    // reservoir.display()
    const water = reservoir.water()
    assert.strictEqual(water['water'] + water['path'], 57)
    // part 2
    assert.strictEqual(water['water'], 29)
  })

  it('water flowing around floating island', async () => {
    const input = `x=490, y=2..7
x=510, y=2..7
y=20, x=500-501
x=495, y=3..15
x=505, y=3..15
y=15, x=496..504
x=502, y=10..12
x=498, y=10..12
y=10, x=499..501
y=12, x=499..501`.split(/\r?\n/g)

    const reservoir = mapReservoir(input)
    // reservoir.display()
    reservoir.dropOfWater()
    // reservoir.display()
    const water = reservoir.water()
    assert.strictEqual(water['water'] + water['path'], 142)
  })
})
