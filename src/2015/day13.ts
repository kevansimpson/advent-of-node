/**
 * @module 2015_day13
 */
import { buildAllPaths, debug } from '../helpers/util'

export function optimalHappiness(input: string[], extras: string[] = []): number {
  return new Happiness(input, extras).calculateOptimal()
}

export const ME = 'ME'

class Happiness {
  people: Set<string> = new Set()
  distanceMap: Map<string, number> = new Map()
  jumpDistanceMap: Map<string, number>

  constructor(input: string[], extras: string[] = []) {
    extras.forEach(ex => this.people.add(ex))
    this.jumpDistanceMap = this.buildDistanceMap(input)
  }

  calculateOptimal(): number {
    const permutation: string[] = []
    const peoples = Array.from(this.people)
    buildAllPaths(peoples, permutation,
      perm => this.distanceMap.set(perm.toString(), this.calculateDistance(perm)))

    let longest = Number.MIN_VALUE
    let optimal: string = 'round table'
    for (const path of this.distanceMap.keys()) {
      const dist = this.distanceMap.get(path) || Number.MIN_VALUE
      if (dist > longest) {
        longest = dist
        optimal = path
      }
    }

    debug(`The optimal seating arrangement is: ${optimal}`)
    return longest
  }

  calculateDistance(path: string[]): number {
    const last = path.length - 1
    let dist = this.getDelta(path[last], path[0]) + this.getDelta(path[0], path[last])
    for (let i = 0; i < last; i++) {
      const person1 = path[i]
      const person2 = path[i + 1]
      dist += this.getDelta(person1, person2)
      dist += this.getDelta(person2, person1)
    }

    return dist
  }

  getDelta(person1: string, person2: string): number {
    if (person1 === ME || person2 === ME) return 0

    const key = this.key(person1, person2)
    const step = this.jumpDistanceMap.get(key)
    if (step) return step
    else throw new Error(`getDelta(${person1}, ${person2})`)
  }

  buildDistanceMap(directions: string[]): Map<string, number> {
    const distanceMap: Map<string, number> = new Map()
    for (const directive of directions) {
      const dirs: string[] = directive.split(/\s/g)
      const p1 = dirs[0]
      const dist = +dirs[3]
      const p2 = dirs.slice(-1)[0].replace('.', '')
      this.people.add(p1)
      this.people.add(p2)
      distanceMap.set(this.key(p1, p2), (dist * ('gain' === dirs[2] ? 1 : -1)))
    }

    return distanceMap
  }

  key(loc1: string, loc2: string): string {
    return `JUMP-${[loc1, loc2].toString()}`
  }
}
