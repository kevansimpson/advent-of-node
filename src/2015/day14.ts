/**
 * @module 2015_day14
 */
import { debug, modulo } from '../helpers/util'

export function distanceTraveled(input: string[], seconds: number): number {
  const speedMap = buildSpeedMap(input)
  const distanceMap = buildDistanceMap(speedMap, seconds)

  return lastKey(distanceMap)
}

export function winningPoints(input: string[], seconds: number): number {
  const speedMap = buildSpeedMap(input)
  const pointMap: { [key: string]: string } = {}

  for (let i = 1; i < (seconds + 1); i++) {
    const winners = identifyWinner(speedMap, i)
    winners.forEach(w => pointMap[w] = (pointMap[w] || '').concat('.'))
  }

  let highest = 0
  let winner: string = 'loser'
  for (const reindeer of Object.keys(pointMap)) {
    const points = pointMap[reindeer].length
    if (points > highest) {
      winner = reindeer
      highest = points
    }
  }
  debug(`The winning reindeer is ${winner}`)
  return highest
}

function identifyWinner(speedMap: SpeedMap, seconds: number): string[] {
  const distanceMap = buildDistanceMap(speedMap, seconds)
  return distanceMap[lastKey(distanceMap)]
}

function lastKey(distanceMap: DistanceMap): number {
  const keys = Object.keys(distanceMap)
  let last = +keys[keys.length - 1]
  while (Number.isNaN(last)) {
    keys.pop()
    last = +keys[keys.length - 1]
  }
  return last
}

function buildDistanceMap(speedMap: SpeedMap, seconds: number): DistanceMap {
  const distanceMap: DistanceMap = {}
  for (const reindeer of Object.keys(speedMap)) {
    const dist = calculateDistance(speedMap[reindeer], seconds)
    const deer = distanceMap[dist] || []
    deer.push(reindeer)
    distanceMap[dist] = deer
  }

  return distanceMap
}

function calculateDistance(speed: ReindeerSpeed, seconds: number): number {
  const totalTime = speed.goTime + speed.restTime
  return (Math.floor(seconds / totalTime) * speed.goTime * speed.kmPerSec +
    (Math.min(modulo(seconds, totalTime), speed.goTime) * speed.kmPerSec))
}

function buildSpeedMap(speeds: string[]): SpeedMap {
  const speedMap: SpeedMap = {}
  for (const directive of speeds) {
    // Rudolph can fly 22 km/s for 8 seconds, but then must rest for 165 seconds.
    const input = directive.split(/\s/g)
    const kmPerSec = +input[3]
    const goTime = +input[6]
    const restTime = +input[13]
    speedMap[input[0]] = { kmPerSec: kmPerSec, goTime: goTime, restTime: restTime }
  }

  return speedMap
}

type DistanceMap = { [key: number]: string[] }

type ReindeerSpeed = {
  kmPerSec: number,
  goTime: number,
  restTime: number
}

type SpeedMap = { [key: string]: ReindeerSpeed }
