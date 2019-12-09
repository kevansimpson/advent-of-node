/**
 * @module 2019_day06
 */
import { sum } from '../helpers/util'

type Orbit = { [ planet: string ]: string[] }

export class OrbitMap {
  direct: Orbit = {}
  indirect: Orbit = {}

  constructor (input: string[]) {
    for (const orbit of input) {
      const [parent, child] = orbit.split(')')
      if (this.direct[parent]) this.direct[parent].push(child)
      else this.direct[parent] = [child]
      if (this.indirect[child]) this.indirect[child].push(parent)
      else this.indirect[child] = [parent]
    }
  }

  minimumOrbitTransfers (planet: string = 'YOU', target: string = 'SAN'): number {
    let orbits = (this.direct[planet] || []).concat(this.indirect[planet] || [])
    let ots = 0
    const set = new Set()
    set.add(planet)

    while (orbits.indexOf(target) < 0 && orbits.length > 0) {
      let next: string[] = []
      for (const p of orbits) {
        next = next.concat((this.direct[p] || []).concat(this.indirect[p] || []).filter(v => !set.has(v)))
        set.add(p)
      }

      orbits = next
      if (orbits.indexOf('SAN') >= 0) break
      ots += 1
    }

    return ots
  }

  totalOrbits (): number {
    return sum(Object.keys(this.indirect).map(p => this.countOrbits(p)))
  }

  countOrbits (planet: string): number {
    return (this.indirect[planet])
      ? this.indirect[planet].length + sum(this.indirect[planet].map(p => this.countOrbits(p))) : 0
  }
}
