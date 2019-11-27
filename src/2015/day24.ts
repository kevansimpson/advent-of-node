/**
 * @module 2015_day24
 */
import bigInt from 'big-integer'
import { debug, sum, NumberComparator } from '../helpers/util'

export function arrangePackages (input: number[], numCompartments: number): number {
  return new Sleigh().solveFor(input, numCompartments).toJSNumber()
}

class Sleigh {
  smallestGroup = Number.MAX_VALUE
  lowestQE = bigInt('75643564363473453456342378564387956906736546456235345')
  expectedSum = -1

  solveFor (containers: number[], numCompartments: number) {
    containers = containers.reverse()
    this.findSmallest(containers, numCompartments)
    this.solve(containers, 0, [], 0)

    debug(`Lowest QE for ${numCompartments} compartments is ${this.lowestQE}`)
    return this.lowestQE
  }

  findSmallest (containers: number[], numCompartments: number): void {
    const max = 2 << containers.length - 1
    this.expectedSum = sum(containers) / numCompartments

    for (let i = 0; i < max; i++) {
      const ia: number[] = this.toArray(i, containers)
      const is = sum(ia)
      if (ia.length <= 0 || is !== this.expectedSum) continue

      if (ia.length < this.smallestGroup) {
        this.smallestGroup = ia.length
        this.lowestQE = this.calcQE(ia)
        return
      }
    }
  }

  solve (containers: number[], index: number, permutation: number[], currentSum: number): void {
    if (currentSum === this.expectedSum) {
      if (permutation.length === this.smallestGroup) {
        const qe = this.calcQE(permutation)
        if (qe.lesser(this.lowestQE)) {
          this.lowestQE = qe
        }
      }
      return
    }

    if (index >= containers.length || permutation.length >= this.smallestGroup) return

    for (let i = 0; i < containers.length; i++) {
      const value = containers[i]
      if (permutation.indexOf(value) >= 0) continue
      const next = [...permutation]
      next.push(value)
      this.solve(containers, 1 + index, next, value + currentSum)
    }
  }

  calcQE (containers: number[]): bigInt.BigInteger {
    return containers.map(val => bigInt(val)).reduce((a, b) => a.multiply(b), bigInt(1))
  }

  toArray (flag: number, cs: number[]): number[] {
    const set: Set<number> = new Set()
    const reverse = flag.toString(2).split('').reverse().join('')
    for (let i = 0; i < reverse.length; i += 1) {
      if ('1' === reverse.charAt(i)) set.add(cs[i])
    }

    return Array.from(set).sort(NumberComparator)
  }
}
