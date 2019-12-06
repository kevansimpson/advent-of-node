/**
 * @module 2018_day13
 */
import { Arrow, Point, key, toKey } from '../helpers/point'
import { debug, modulo } from '../helpers/util'

export function firstCrash (rt: RaceTrack): Point {
  const cars: Map<string, Car> = findCars(rt)
  while (true) {
    const sort: Car[] = sortCars(cars)
    for (let car of sort) {
      const [w, h] = car.location
      if (car) {
        if (!cars.delete(key(w, h))) throw new Error(`Missing Car${car.id}`)
        tick(car, rt)
        const possibleCollision = toKey(car.location)
        const other = cars.get(possibleCollision)
        if (other && other.id !== car.id) return car.location
        else cars.set(possibleCollision, car)
      }
    }
  }
}

export function lastCar (rt: RaceTrack): Point {
  const cars: Map<string, Car> = findCars(rt)
  while (true) {
    const sort: Car[] = sortCars(cars)
    for (let car of sort) {
      const [w, h] = car.location
      if (cars.delete(key(w, h))) {
        tick(car, rt)
        const possibleCollision = toKey(car.location)
        const other = cars.get(possibleCollision)
        if (other && other.id !== car.id) {
          cars.delete(possibleCollision) // remove other car
        } else cars.set(possibleCollision, car)
      } else debug(`Ghost Car${car.id}`)
    }

    if (cars.size <= 1) return cars.values().next().value.location
  }
}

function sortCars (cars: Map<string, Car>): Car[] {
  return Array.from(cars.values()).sort((a, b) => { // 'a - b' b/c the course is "backwards"
    return (a.location[0] === b.location[0]) ? a.location[1] - b.location[1] : a.location[0] - b.location[0]
  })
}

function tick (car: Car, rt: RaceTrack): void {
  let next: Point = move(car)

  car.path.push(car.location)
  car.location = next
  // does car turn?
  const square: string = rt.course[next[1]][next[0]]
  switch (square) {
    case '\\':
      car.direction = turns[3][car.direction]
      break
    case '/':
      car.direction = turns[4][car.direction]
      break
    case '+':
      car.direction = turns[modulo(car.intersections, 3)][car.direction]
      car.intersections += 1
      break
    default:
      // do nothing
  }
}

const turns: { [dir: string]: Arrow }[] = [
  { '^': '<', 'v': '>', '<': 'v', '>': '^' }, // + left
  { '^': '^', 'v': 'v', '<': '<', '>': '>' }, // + forward
  { '^': '>', 'v': '<', '<': '^', '>': 'v' }, // + right
  { '^': '<', 'v': '>', '<': '^', '>': 'v' }, // \ curve left
  { '^': '>', 'v': '<', '<': 'v', '>': '^' }  // / curve right
]

/**
 * Finds cars in the specified RaceTrack and replaces them with corresponding track segments.
 * @param rt The race track to search
 */
function findCars (rt: RaceTrack): Map<string, Car> {
  const cars: Map<string, Car> = new Map()
  let id = 0
  for (let h = 0; h < rt.height; h++) {
    for (let w = 0; w < rt.width; w++) {
      const pt: string = rt.course[h][w]
      switch (pt) {
        case '^':
        case 'v':
          cars.set(key(w, h), new Car(id++, pt, [w, h]))
          rt.course[h][w] = '|'
          break
        case '<':
        case '>':
          cars.set(key(w, h), new Car(id++, pt, [w, h]))
          rt.course[h][w] = '-'
          break
      }
    }
  }

  return cars
}

function move (car: Car): Point {
  let next: Point
  const pt: Point = car.location
  switch (car.direction) {
    case '^':
      next = [pt[0], pt[1] - 1]
      break
    case 'v':
      next = [pt[0], 1 + pt[1]]
      break
    case '<':
      next = [pt[0] - 1, pt[1]]
      break
    case '>':
      next = [1 + pt[0], pt[1]]
      break
    default: throw new Error(`Unmanned Car: ${car}`)
  }

  return next
}

class Car {
  id: number
  direction: Arrow
  location: Point
  intersections: number
  path: Point[]

  constructor (id: number, dir: Arrow, loc: Point) {
    this.id = id
    this.direction = dir
    this.location = loc
    this.intersections = 0
    this.path = []
  }
}

export class RaceTrack {
  course: string[][]
  width: number  // x
  height: number // y

  constructor (input: string[]) {
    this.course = input.map(str => str.padEnd(input.length, ' ').split(''))
    this.width = this.course[0].length
    this.height = this.course.length
  }

  display (): void {
    for (let h = 0; h < this.height; h++) {
      debug(this.course[h].join(''))
    }
  }
}
