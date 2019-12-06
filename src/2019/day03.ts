/**
 * @module 2019_day03
 */
import { ORIGIN, Direction, Point, manhattanDistance, move, toKey } from '../helpers/point'
import { NumberComparator } from '../helpers/util'

type Step = [ Point, number ]
type Wire = Step[]
type StepMap = { [ pt: string ]: number }

type WireMap = [ Wire, Wire, Wire ]

export function countSteps (w1: string[], w2: string[]): number {
  const [ wire1, wire2, xref ] = mapWires(w1, w2)
  const wmap1: StepMap = wire1.reduce(destep, {})
  const wmap2: StepMap = wire2.reduce(destep, {})
  const dist = xref.map(x => {
    const key = toKey(x[0])
    return wmap1[key] + wmap2[key]
  }).sort(NumberComparator)

  return dist[0]
}

function destep (smap: StepMap, w: Step): StepMap {
  const key = toKey(w[0])
  if (!smap[key]) smap[key] = w[1]
  return smap
}

export function crossWires (w1: string[], w2: string[]): number {
  const wmap = mapWires(w1, w2)
  const dist = wmap[2].map(x => manhattanDistance(ORIGIN, x[0])).sort(NumberComparator)

  return dist[0]
}

function mapWires (w1: string[], w2: string[]): WireMap {
  const wire1 = runWire(w1)
  const wire2 = runWire(w2)
  const set = new Set(wire2.map(w => toKey(w[0])))
  const xref = wire1.filter(w => set.has(toKey(w[0])))
  return [wire1, wire2, xref]
}

function runWire (w: string[]): Wire {
  const wire: Wire = [ ]
  let pt = ORIGIN
  let step = 0
  for (let s of w) {
    const dir = s.substr(0, 1) as Direction
    const len = +s.substring(1)
    for (let x = 1; x <= len; x++) {
      step += 1
      pt = move(pt, dir)
      wire.push([pt, step])
    }
  }

  return wire
}
