
export type Point = [ number, number ]

export function key (x: number, y: number): string {
  return `[${x},${y}]`
}

export function toKey (pt: Point): string {
  return `[${pt[0]},${pt[1]}]`
}

export function manhattanDistance (a: Point, b: Point): number {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
}
