/**
 * @module 2024_day01
 */

type Pair = {
    left: number,
    right: number
}

export function solve (input: string[]): [number, number] {
  let diff = 0
  let score = 0
  const list: Pair[] = input.map((str) => str.split('   '))
    .map((e) => ({ left: Number(e[0]), right: Number(e[1]) }))
  const left = list.map((e) => e.left).sort()
  const right = list.map((e) => e.right).sort()
  const counts = toMap(right)

  for (var i = 0; i < list.length; i++) {
    diff += Math.abs(left[i] - right[i])
    score += left[i] * (counts.get(left[i]) || 0)
  }

  return [diff, score]
}

function toMap(right: number[]): Map<number, number> {
  const map = new Map()
  for (var i = 0; i <= right.length; i++) {
    if (map.has(right[i])) {
      map.set(right[i], map.get(right[i]) + 1)
    }
    else {
      map.set(right[i], 1)
    }
  }

  return map
}
