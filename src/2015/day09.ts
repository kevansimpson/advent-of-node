/**
 * @module 2015_day09
 */
import { buildAllPaths } from '../helpers/util'

export class PathFinder {
  locations: Set<string> = new Set()
  distanceMap: { [key: string]: number } = {}
  jumpDistanceMap: { [key: string]: number } = {}

  minMaxPaths(directions: string[]): [number, number] {
    this.jumpDistanceMap = this.buildDistanceMap(directions)

    const permutation: string[] = []
    const locationList: string[] = [...this.locations]

    buildAllPaths(locationList, permutation,
      (perm) => this.distanceMap[perm.toString()] = this.calculateDistance(perm))

    return Object.values(this.distanceMap).reduce((result, value) => {
      if (value < result[0]) result[0] = value
      if (value > result[1]) result[1] = value
      return result
    }, [Number.MAX_VALUE, Number.MIN_VALUE])
  }

  calculateDistance(path: string[]): number {
    let dist = 0
    for (let i = 0; i < path.length - 1; i++) {
      const key = this.key(path[i], path[i + 1])
      const step = this.jumpDistanceMap[key]
      if (step)
        dist += step
    }

    return dist
  }

  buildDistanceMap(directions: string[]): { [key: string]: number } {
    const distMap: { [key: string]: number } = {}
    for (const directive of directions) {
      const parts = directive.split(/\s/g)
      const city1 = parts[0]
      const city2 = parts[2]
      const distance = Number.parseInt(parts[4])
      this.locations.add(city1)
      this.locations.add(city2)
      distMap[this.key(city1, city2)] = distance
      distMap[this.key(city2, city1)] = distance
    }

    return distMap
  }

  private key(loc1: string, loc2: string): string {
    return "JUMP-" + ([loc1, loc2]).toString()
  }
}
