
export type Point = [ number, number ]

export function key (x: number, y: number): string {
  return `[${x},${y}]`
}

export function toKey (pt: Point): string {
  return `[${pt[0]},${pt[1]}]`
}

// export function up (move: number): Point {
//   return [move, move]
// }
