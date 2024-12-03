/**
 * @module 2024_day02
 */

export type SafeLevels = {
    safe: number,
    singleBad: number
}

export function solve(input: string[]): SafeLevels {
  let safe = 0
  let singleBad = 0
  input.forEach(line => {
    const levels = line.split(' ').map(s => Number(s))
    if (isSafe(levels))
      safe++
    if (isSingleBad(levels))
      singleBad++
  })

  return ({ safe: safe, singleBad: singleBad })
}

function isSafe(levels: number[]): boolean {
  let sorted = [...levels].sort((a, b) => a - b)
  if (levels[0] > levels[1]) // decreasing
    sorted = sorted.reverse()
  else if (levels[0] === levels[1])
    return false

  if (JSON.stringify(levels) == JSON.stringify(sorted)) {
    for (var i = 0; i < levels.length - 1; i++) {
      const diff = Math.abs(levels[i] - levels[i + 1])
      if (diff < 1 || diff > 3)
        return false
    }
    return true
  }

  return false
}

function isSingleBad(levels: number[]): boolean {
  for (var i = 0; i < levels.length; i++) {
    if (isSafe(remove(levels, i)))
      return true
  }

  return false
}

function remove(arr: number[], index: number): number[] {
  const removed = []
  for (var i = 0; i < arr.length; i++) {
    if (i != index) {
      removed.push(arr[i])
    }
  }

  return removed
}
