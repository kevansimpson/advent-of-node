import assert from 'assert'
import 'mocha'
import path from 'path'
import { splitNumbers } from '../../src/helpers/input'
import { Node, buildTree, calculateRootNode, sumMetadata } from '../../src/2018/day08'
import * as d08 from '../../src/2018/day08.doc'

describe('2018 solutions - Day 08', () => {
  const input = splitNumbers(path.join(__dirname, 'input08.txt'))
  let tree: [Node, number]
  it('buildTree', async () => tree = buildTree(input, 0))
  it('sumMetadata', async () => assert.strictEqual(sumMetadata(tree), d08.part1))
  it('calculateRootNode', async () => assert.strictEqual(calculateRootNode(tree), d08.part2))
})
