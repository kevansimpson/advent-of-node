/**
 * @module 2024_day19
 */

export type DesignCounts = {
  possible: number,
  totalCombos: number
}

export function solve(input: string[]): DesignCounts {
  const patterns = new Set(input[0].split(', '))
  const desired = input.slice(2)
  const cache = new Map<string, number>()
  let possible = 0
  let totalCombos = 0

  desired.forEach(d => {
    const c = countPossibleDesigns(d, patterns, cache)
    if (c > 0)
      possible++
    totalCombos += c
  })

  return { possible: possible, totalCombos: totalCombos }
}

function countPossibleDesigns(design: string, patterns: Set<string>, cache: Map<string, number>): number {
  if (design.length === 0)
    return 1
  if (cache.has(design))
    return cache.get(design)!

  let count = 0
  patterns.forEach(p => {
    if (design.startsWith(p))
      count += countPossibleDesigns(design.substring(p.length), patterns, cache)
  })

  cache.set(design, count)
  return count
}
