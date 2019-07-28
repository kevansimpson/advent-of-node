/**
 * @module 2018_day08
 */
import { Answer } from '../types/advent'
import { sum as utilSum } from '../helpers/util'

export function sumMetadata (tree: [Node, number]): Answer {
  let sum = 0
  const nodes: Node[] = []

  nodes.push(tree[0])
  while (nodes.length > 0) {
    const n: Node | undefined = nodes.pop()
    if (n) {
      sum += utilSum(n.metadata)
      n.children.forEach(kid => nodes.push(kid))
    }
  }

  return sum
}

export function calculateRootNode (tree: [Node, number]): Answer {
  let sum = 0
  const nodes: Node[] = []
  nodes.push(tree[0])

  while (nodes.length > 0) {
    const n: Node | undefined = nodes.pop()
    if (n) {
      if (n.children.length === 0) {
        sum += utilSum(n.metadata)
      } else {
        n.metadata
          .map(i => i - 1)
          .filter(i => i < n.children.length)
          .forEach(i => nodes.push(n.children[i]))
      }
    }
  }

  return sum
}

export function buildTree (intArray: number[], start: number): [Node, number] {
  let index = start
  let kids = intArray[index++]
  let meta = intArray[index++]
  const root: Node = { childCount: kids, metadataCount: meta, children: [], metadata: [] }

  while (kids-- > 0) {
    const next: [Node, number] = buildTree(intArray, index)
    index = next[1]
    root.children.push(next[0])
  }

  while (meta-- > 0) root.metadata.push(intArray[index++])

  return [root, index]
}

export type Node = {
  childCount: number
  metadataCount: number
  children: Node[]
  metadata: number[]
}
