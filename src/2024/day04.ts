/**
 * @module 2024_day04
 */

import { inGrid, moveXY, toKey, Point } from "../helpers/point"

const XMAS = "XMAS"
const DX = [0, 1, 1, 1, 0, -1, -1, -1]
const DY = [-1, -1, 0, 1, 1, 1, 0, -1]

export function solve (input: string[]): [number, number] {
  let xmas = 0
  const xCandidates: Point[] = []
  const mCandidates: Point[] = []

  for (var r = 0; r < input.length; r++) {
    for (var c = 0; c < input.length; c++) {
      if (input[r][c] === 'X')
        xCandidates.push([c, r])
      if (input[r][c] === 'M')
        mCandidates.push([c, r])
    }
  }

  const gridX = new XmasGrid(input)
  xCandidates.forEach(pt => {
    for (var i = 0; i < 8; i++)
      if (gridX.isXmas(pt, 0, DX[i], DY[i]))
        xmas++
  })

  const gridMas = new XmasGrid(input)
  mCandidates.forEach(pt => {
    for (var i = 1; i < 8; i += 2)
      gridMas.isXmas(pt, 1, DX[i], DY[i])
  })

  return [xmas, gridMas.crossCount]
}

class XmasGrid {
  private grid: string[]
  private size: number
  private setA: Set<string> = new Set()
  public crossCount = 0

  public constructor(input: string[]) {
    this.grid = input
    this.size = input.length
  }

  public isXmas(pt: Point, index: number, dx: number, dy: number): boolean {
    if (inGrid(pt, this.size, this.size) && index < 4) {
      if (this.grid[pt[1]][pt[0]] == XMAS[index]) {
        if (index === 3)
          return true
        else {
          const found = this.isXmas(moveXY(pt, dx, dy), index + 1, dx, dy)
          if (found && index === 2) { // A
            if (this.setA.has(toKey(pt)))
              this.crossCount++
            else
              this.setA.add(toKey(pt))
          }
          return found
        }
      }
    }
    return false
  }
}
