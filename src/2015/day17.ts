/**
 * @module 2015_day17
 */

export function canPermutations(input: number[], target: number = 150): [number, number] {
  return new Canner(input).permutate(target)
}

class Canner {
  cans: number[]
  numberOfCans: number
  totalPermutations: number = 0
  fewestCans = Number.MAX_VALUE
  totalPermutationsWithFewest: number = 0

  constructor (input: number[]) {
    this.cans = input
    this.numberOfCans = input.length
  }

  permutate (target: number): [number, number] {
    const permutation: boolean[] = new Array<boolean>(this.numberOfCans).fill(false)
    this.sumCans(permutation, target, 0)
    return [this.totalPermutations, this.totalPermutationsWithFewest]
  }

  sumCans (permutation: boolean[], target: number, index: number): void {
    if (index >= this.numberOfCans) {
      if (this.sum(permutation) === target) {
        this.totalPermutations += 1

        const used: number = this.used(permutation)
        if (used < this.fewestCans) {
            this.fewestCans = used
            this.totalPermutationsWithFewest = 1
        }
        else if (used === this.fewestCans) {
          this.totalPermutationsWithFewest += 1
        }
      }
      return
    }

    const off: boolean[] = [...permutation]
    const on: boolean[] = [...permutation]

    this.sumCans(off, target, 1 + index)
    on[index] = true
    this.sumCans(on, target, 1 + index)
  }

  sum (permutation: boolean[]): number {
    let sum = 0;
    for (let i = 0; i < this.numberOfCans; i++) sum += (permutation[i]) ? this.cans[i] : 0;
    return sum
  }

  used (permutation: boolean[]): number {
    let used = 0
    for (let i = 0; i < this.numberOfCans; i++) used += (permutation[i]) ? 1 : 0
    return used
  }
}
