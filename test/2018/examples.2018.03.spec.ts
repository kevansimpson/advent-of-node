import assert from 'assert';
import 'mocha'
import { Claim, Grid, buildClaimGrid, calculateOverlap, findAdjacentClaimId, parseClaim } from '../../src/2018/day03'

describe('2018 examples - Day 03', () => {
  it('should parse Claim', () => {
    const claim: Claim = parseClaim('#123 @ 3,2: 5x4')
    assert.strictEqual(claim.id, 123)
    assert.strictEqual(claim.left, 3)
    assert.strictEqual(claim.top, 2)
    assert.strictEqual(claim.width, 5)
    assert.strictEqual(claim.height, 4)
    assert.strictEqual(claim.points.length, 20)
  })

  const input: string[] = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2']
  const grid: Grid = buildClaimGrid(input)

  it('should calculate overlap', () => {
    assert.strictEqual(calculateOverlap(grid.map), 4)
  })

  it('should find adjacent Claim id', () => {
    assert.strictEqual(findAdjacentClaimId(grid), 3)
  })
})
