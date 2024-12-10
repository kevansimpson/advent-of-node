/**
 * @module helpers
 */

export type Arrow = '^' | 'v' | '<' | '>'
export type Cardinal = 'N' | 'S' | 'W' | 'E'
export type Direction = 'U' | 'D' | 'L' | 'R'
export type Point = [ number, number ]

export const ORIGIN: Point = [0, 0]

export function key (x: number, y: number): string {
  return `[${x},${y}]`
}

export function toKey (pt: Point): string {
  return `[${pt[0]},${pt[1]}]`
}

export function toPoint (key: string): Point {
  const xy = key.replace(']', '').replace('[', '').split(',')
  return [+xy[0], +xy[1]]
}

export function includes (list: Point[], target: Point): boolean {
  for (let pt of list) {
    if (samePoint(pt, target)) return true
  }
  return false
}

export function manhattanDistance (a: Point, b: Point): number {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
}

export function move (start: Point, dir: Arrow | Cardinal | Direction): Point {
  switch (dir) {
    case '<':
    case 'W':
    case 'L':
      return [ start[0] - 1, start[1] ]
    case '>':
    case 'E':
    case 'R':
      return [ start[0] + 1, start[1] ]
    case '^':
    case 'N':
    case 'U':
      return [ start[0], start[1] - 1 ]
    case 'v':
    case 'S':
    case 'D':
      return [ start[0], start[1] + 1 ]
  }
}

export function moveXY(pt: Point, dx: number, dy: number): Point {
  return [pt[0] + dx, pt[1] + dy]
}

export function samePoint (a: Point, b: Point): boolean {
  return a[0] === b[0] && a[1] === b[1]
}

export function cardinal(pt: Point): Point[] {
  const [x, y] = pt
  return [
    [x, y - 1],
    [x - 1, y], [x + 1, y],
    [x, y + 1]
  ]
}

export function surrounding (pt: Point): Point[] {
  const [x, y] = pt
  return [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
  ]
}

export function inGrid(pt: Point, width: number, height: number): boolean {
  return pt[0] >= 0 && pt[0] < width && pt[1] >= 0 && pt[1] < height
}
