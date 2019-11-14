/**
 * @module helpers
 */

export type Direction = '^' | 'v' | '<' | '>'

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

export function move (start: Point, dir: Direction): Point {
  switch (dir) {
    case '<': return [ start[0] - 1, start[1] ]
    case '>': return [ start[0] + 1, start[1] ]
    case '^': return [ start[0], start[1] - 1 ]
    case 'v': return [ start[0], start[1] + 1 ]
  }
}

export function samePoint (a: Point, b: Point): boolean {
  return a[0] === b[0] && a[1] === b[1]
}

export function surrounding (pt: Point): Point[] {
  const [x, y] = pt
  return [
    [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
    [x - 1, y], [x + 1, y],
    [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
  ]

}
