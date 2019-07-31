/**
 * @module 2018_day09
 */
import { Link } from '../helpers/list.linked'
import { Answer } from '../types/advent'

export function game1 (players: number, lastMarble: number): Answer {
  return highestScore(playGame(players, lastMarble))
}

export function game2 (players: number, lastMarble: number): Answer {
  return highestScore(playGame(players, 100 * lastMarble))
}

export function highestScore (scores: Map<number, number>): number {
  // console.log(`SCORES => ${scores}`)
  let max = 0
  for (let val of scores.values()) {
    if (val > max) max = val
  }
  return max
}

export function playGame (players: number, lastMarble: number): Map<number, number> {
  // console.log(`PLAYERS => ${players}, LASTM => ${lastMarble}`)
  const scores: Map<number, number> = new Map()

  let current: Link = new Link(0)
  current = current.push(new Link(1))
  for (let m = 2; m <= lastMarble; m++) {
    if ((m % 23) === 0) {
      // player.score += turn;
      current = current.prev.prev.prev.prev.prev.prev.prev
      const c = current.value
      const ix = m % players
      let s = scores.get(ix) || 0
      scores.set(ix, (s + c + m))
      current = current.shift()
    } else {
      current = current.next.push(new Link(m))
    }
  }

  // console.log(`CIRCLE => [${circle}]`)
  return scores
}

// function rotate (circle: number[], move: number): void {
//   if (move > 0) {
//     for (let i = 0; i < move; i++) {
//       const val = circle.pop()
//       if (val !== undefined) circle.unshift(val)
//       else throw new Error(`${move} => ${circle}`)
//     }
//   } else {
//     const max = Math.abs(move) - 1
//     for (let i = 0; i < max; i++) {
//       const val = circle.shift()
//       if (val !== undefined) circle.push(val)
//       else throw new Error(`${move} => ${circle}`)
//     }
//   }
