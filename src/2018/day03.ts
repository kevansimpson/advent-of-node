/**
 * @module 2018_day03
 */
import { Point } from '../helpers/point'
import { Answer } from '../types/advent'

export type Claim = {
  id: number,
  left: number,
  top: number,
  width: number,
  height: number,
  points: string[]
}

export function buildClaimGrid (claims: Claim[]): Map<string, number[]> {
  const grid: Map<string, number[]> = new Map()
  claims.forEach(claim => {
    claim.points.forEach(key => {
      const idList: number[] = grid.get(key) || []
      idList.push(claim.id)
      grid.set(key, idList)
    })
  })

  return grid
}

export function calculateOverlap (grid: Map<string, number[]>): Answer {
  let sum = 0
  for (let val of grid.values()) {
    sum += (val.length > 1) ? 1 : 0
  }

  return sum
}

export function findAdjacentClaimId (grid: Map<string, number[]>, claims: Claim[]): Answer {
  const points: string[] = []
  const exclude: Set<Number> = new Set()

  for (let e of grid.entries()) {
    if (e[1].length === 1) {
      points.push(e[0])
    } else {
      e[1].forEach(id => exclude.add(id))
    }
  }

  for (let claim of claims) {
    if (exclude.has(claim.id)) {
      continue
    }

    if (claim.points.every(pt => points.includes(pt))) {
      return claim.id
    }
  }

  return -1
}

export function parseClaim (text: string): Claim {
  const found: RegExpMatchArray | null = text.match(/(\d+)/g)
  if (found) {
    return {
      id: +found[0],
      left: +found[1],
      top: +found[2],
      width: +found[3],
      height: +found[4],
      points: listPoints(+found[1], +found[2], +found[3], +found[4])
    }
  }

  throw new Error(`Failed to parse claim: ${text}`)
}

function listPoints (left: number, top: number, width: number, height: number): string[] {
  const points: string[] = []
  for (let y = -top; y > (-(height + top)); y--) {
    for (let x = left; x < (width + left); x++) {
      points.push(Point.key(x, y))
    }
  }

  return points
}
