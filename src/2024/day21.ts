/**
 * @module 2024_day21
 */

import { MapWithKeyEquality } from "../helpers/map"
import { Point } from "../helpers/point"

const NUMERIC_KEYPAD = [['7','8','9'], ['4','5','6'],['1','2','3'], [' ','0','A']]
const DIRECTIONAL_KEYPAD = [[' ','^','A'], ['<','v','>']]
  
export function solve(input: string[]): [number, number] {
  const numberPad = toMoveMap(toPointMap(NUMERIC_KEYPAD), true)
  const directionalPad = toMoveMap(toPointMap(DIRECTIONAL_KEYPAD), false)
  const cache = new MoveCache()
  let part1 = 0, part2 = 0
  input.forEach(code => {
    const num = Number(code.replaceAll('A', ''))
    const robot1 = firstRobot(code, numberPad)
    part1 += num * countChars(robot1, directionalPad, cache, 2)
    part2 += num * countChars(robot1, directionalPad, cache, 25)
  })
  
  return [part1, part2]
}

function firstRobot(code: string, numberPad: MoveMap): string {
  let moves = `${numberPad.get({ start: 'A', end: code[0] })}A`
  for (let i = 1; i < code.length; i++)
    moves += `${numberPad.get({ start: code[i - 1], end: code[i] })}A`

  return moves
}

function countChars(code: string, directionalPad: MoveMap, cache: MoveCache, depth: number): number {
  if (depth === 0)
    return code.length
  if ('A' === code)
    return 1

  const key = { path: code, depth: depth }
  if (cache.has(key))
    return cache.get(key)!

  let count = 0
  code.split('A').slice(0, -1).forEach(m => {
    let moves = ''
    const move = `A${m}A`
    for (let i = 1; i < move.length; i++) {
      moves += `${directionalPad.get({ start: move[i - 1], end: move[i] })}A`
    }
    count += countChars(moves, directionalPad, cache, depth - 1)
  })

  cache.set(key, count)
  return count
}

function toMoveMap(pts: Map<string, Point>, isNumberPad: boolean): MoveMap {
  const moves = new MoveMap()
  pts.forEach((sv, sk) => {
    pts.forEach((ev, ek) => {
      moves.set(({ start: sk, end: ek}), generateMove([sk, sv], [ek, ev], isNumberPad))
    })
  })

  return moves
}

function generateMove(start: [string, Point], end: [string, Point], isNumberPad: boolean): string {
  const s = start[1], e = end[1]
  const dx = e[0] - s[0], dy = e[1] - s[1]
  const h = horizontal(dx), v = vertical(dy)
  const hv = h + v, vh = v + h

  if (isNumberPad) {
    if (s[1] === 3 && e[0] === 0)
      return vh
    if (s[0] === 0 && e[1] === 3)
      return hv
  }
  else {
    if (s[0] === 0)
      return hv
    if (e[0] === 0)
      return vh
  }

  return (dx > 0) ? vh : hv
}

function horizontal(dx: number): string {
  return "".padStart(Math.abs(dx), (dx < 0) ? '<' : '>')
}

function vertical(dy: number): string {
  return "".padStart(Math.abs(dy), (dy < 0) ? '^' : 'v')
}

function toPointMap(keypad: string[][]): Map<string, Point> {
  const pts = new Map<string, Point>()
  for (let y = 0; y < keypad.length; y++)
    for (let x = 0; x < keypad[0].length; x++)
      if (keypad[y][x] != ' ')
        pts.set(keypad[y][x], [x, y])

  return pts
}

class MoveMap extends MapWithKeyEquality<Move, string> {
  constructor() {
    super((item: Move) => `${item.start}---${item.end}`)
  }
}

class MoveCache extends MapWithKeyEquality<PathKey, number> {
  constructor() {
    super((item: PathKey) => `${item.path}---${item.depth}`)
  }
}

type Move = {
  start: string
  end: string
}

type PathKey = {
  path: string
  depth: number
}
