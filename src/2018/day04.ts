/**
 * @module 2018_day04
 */
import { Range } from '../types/advent'

export type Guard = {
  id: number
  // day      falls -> wakes
  ranges: Map<number, Range[]>
}

export function findSleepiestGuard (records: Map<number, Guard>): Guard {
  const guards = records.values()
  const first: Guard = guards.next().value as Guard
  let sleepiest: [number, Guard] = [getTimeAsleep(first), first]
  for (let g of guards) {
    const asleep = getTimeAsleep(g)
    if (asleep > sleepiest[0]) {
      sleepiest = [asleep, g]
    }
  }

  return sleepiest[1]
}

function tallySleep (guard: Guard): number[] {
  const counts: number[] = new Array<number>(60).fill(0)
  for (let ranges of guard.ranges.values()) {
    for (let range of ranges) {
      for (let i = range[0]; i < range[1]; i++) counts[i] += 1
    }
  }

  return counts
}

export function getSleepiestMinute (guard: Guard): number {
  const counts = tallySleep(guard)
  return counts.indexOf(Math.max(...counts))
}

function getTimeAsleep (guard: Guard): number {
  let sum = 0
  for (let ranges of guard.ranges.values()) {
    for (let range of ranges) sum += (range[1] - range[0])
  }

  return sum
}

const regex: RegExp = /^\[(\d{4})\-(\d{2})\-(\d{2})\s(\d{2}):(\d{2})\]\s(.+)$/
export function parseRecords (input: string[]): Map<number, Guard> {
  const records: Map<number, Guard> = new Map()
  let current: Guard = { id: -1, ranges: new Map() }
  let falls = -1

  for (let rec of input) {
    const found: RegExpMatchArray | null = rec.match(regex)
    if (found) {
      const day = +found[3]
      const words = found[6].split(/\s/)

      switch (words[0]) {
        case 'Guard':
          const id = +words[1].replace('#', '')
          current = records.get(id) || { id: id, ranges: new Map() }
          records.set(id, current)
          break
        case 'falls': {
          falls = +found[5]
          const ranges = current.ranges.get(day) || []
          current.ranges.set(day, ranges)
          break
        }
        case 'wakes':
          const wakes = +found[5]
          const ranges = current.ranges.get(day)
          if (ranges) ranges.push([falls, wakes])
          break
        default:
          throw new Error(rec)
      }
    }
  }

  return records
}

export function strategy1 (input: Map<number, Guard>): number {
  const sleepy: Guard = findSleepiestGuard(input)
  return sleepy.id * getSleepiestMinute(sleepy)
}

export function strategy2 (records: Map<number, Guard>): number {
  const sleepiest: Map<number, number> = new Map()
  for (let rec of records.values()) sleepiest.set(rec.id, getSleepiestMinute(rec))

  let maxSlept = -1
  let sleepy: Guard = { id: -1, ranges: new Map() }
  for (let entry of sleepiest.entries()) {
    const guard = records.get(entry[0])
    if (guard) {
      if (guard.ranges.size === 0) continue

      const slept = tallySleep(guard)[entry[1]]
      if (slept > maxSlept) {
        maxSlept = slept
        sleepy = guard
      }
    }
  }

  return sleepy.id * (sleepiest.get(sleepy.id) || 0)
}
