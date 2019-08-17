/**
 * @module 2018_day09
 */
import { Link } from '../helpers/list.linked'

export function game1 (players: number, lastMarble: number): number {
  return highestScore(playGame(players, lastMarble))
}

export function game2 (players: number, lastMarble: number): number {
  return highestScore(playGame(players, 100 * lastMarble))
}

export function highestScore (scores: Map<number, number>): number {
  let max = 0
  for (let val of scores.values()) {
    if (val > max) max = val
  }
  return max
}

export function playGame (players: number, lastMarble: number): Map<number, number> {
  const scores: Map<number, number> = new Map()

  let current: Link<number> = new Link(0)
  current = current.push(new Link(1))
  for (let m = 2; m <= lastMarble; m++) {
    if ((m % 23) === 0) {
      current = current.jump(-7)
      const c = current.value
      const ix = m % players
      let s = scores.get(ix) || 0
      scores.set(ix, (s + c + m))
      current = current.shift()
    } else {
      current = current.next.push(new Link(m))
    }
  }

  return scores
}
