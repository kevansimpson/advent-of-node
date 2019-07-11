/**
 * @module 2018_day03
 */
import { key } from '../helpers/point'
import { Answer } from '../types/advent'

export type Claim = {
  id: number
  left: number
  top: number
  width: number
  height: number
  points: string[]
}

export class Grid {
  map: Map<string, number[]>
  claims: Claim[]

  constructor (grid: Map<string, number[]>, claims?: Claim[]) {
    this.map = grid
    this.claims = claims || []
  }
}

export function buildClaimGrid (claims: string[]): Grid {
  const grid: Map<string, number[]> = new Map()
  const list: Claim[] = []
  claims.forEach(str => {
    const claim: Claim = parseClaim(str)
    list.push(claim)
    claim.points.forEach(key => {
      const idList: number[] = grid.get(key) || []
      idList.push(claim.id)
      grid.set(key, idList)
    })
  })

  return new Grid(grid, list)
}

export function calculateOverlap (grid: Map<string, number[]>): Answer {
  let sum = 0
  for (let val of grid.values()) {
    sum += (val.length > 1) ? 1 : 0
  }

  return sum
}

export function findAdjacentClaimId (grid: Grid): Answer {
  const points: string[] = []
  const exclude: Set<Number> = new Set()

  for (let e of grid.map.entries()) {
    if (e[1].length === 1) {
      points.push(e[0])
    } else {
      e[1].forEach(id => exclude.add(id))
    }
  }

  for (let claim of grid.claims) {
    if (exclude.has(claim.id)) {
      continue
    }

    if (claim.points.every(pt => points.includes(pt))) {
      return claim.id
    }
  }

  return -1
}

const regex: RegExp = new RegExp(/(\d+)/g)

export function parseClaim (text: string): Claim {
  const found: RegExpMatchArray | null = text.match(regex)

  if (found) {
    const claim: Claim = {
      id: +found[0],
      left: +found[1],
      top: +found[2],
      width: +found[3],
      height: +found[4],
      points: []
    }

    claim.points = listPoints(claim.left, claim.top, claim.width, claim.height)
    return claim
  }

  throw new Error(`Failed to parse claim: ${text}`)
}

function listPoints (left: number, top: number, width: number, height: number): string[] {
  const points: string[] = []
  for (let y = -top; y > (-(height + top)); y--) {
    for (let x = left; x < (width + left); x++) {
      points.push(key(x, y))
    }
  }

  return points
}
