import assert from 'assert';
import 'mocha'
import { Node, buildTree, calculateRootNode, sumMetadata } from '../../src/2018/day08'

describe('2018 examples - Day 08', () => {
  const input = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]
  const tree: [Node, number] = buildTree(input, 0)

  it('should sum metadata', () => {
    assert.strictEqual(sumMetadata(tree), 138)
  })

  it('should calculate root node', () => {
    assert.strictEqual(calculateRootNode(tree), 66)
  })
})
