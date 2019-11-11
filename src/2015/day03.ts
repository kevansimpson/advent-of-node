/**
 * @module 2015_day03
 */
import { ORIGIN, Point, toKey, move, Direction } from '../helpers/point'

export function santaDelivers (directions: string): number {
  return followDirections(directions)
}

export function robotDelivers (directions: string): number {
  const presents: Presents = {}
  followDirections(directions, 0, 2, presents)
  return followDirections(directions, 1, 2, presents)
}

type Presents = { [ pt: string ]: number }

export function followDirections (directions: string, startIndex: number = 0, increment: number = 1, presents: Presents = {}): number {
  // begins by delivering a present to the house at his starting location
  let position: Point = ORIGIN
  presents[toKey(position)] = 1

  const steps = directions.split('')
  for (let ix = startIndex, max = steps.length; ix < max; ix += increment) {
    position = move(position, steps[ix] as Direction)
    presents[toKey(position)] = 1
  }

  return Object.keys(presents).length
}
