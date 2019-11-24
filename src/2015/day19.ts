/**
 * @module 2015_day19
 */

type Entry = [string, string[]]
type ReplacementMap = { [key: string]: string[] }

export class Chemist {
  molecules: Set<string> = new Set()
  medicine: string
  replacements: ReplacementMap

  constructor (input: string[]) {
    this.medicine = input.pop() || 'gottawantit'
    this.replacements = this.buildReplacementMap(input)
  }

  totalMolecules (): number {
    this.applyAllReplacements()
    return this.molecules.size
  }

  // Adapted from solution found on https://www.reddit.com/r/adventofcode/comments/3xflz8/day_19_solutions/
  shortestPath (): number {
    let upper = 0
    for (const ch of this.medicine.split('')) {
      if (ch === ch.toUpperCase()) upper += 1
    }

    return upper
      - this.countOccurrences(this.medicine, 'Rn')
      - this.countOccurrences(this.medicine, 'Ar')
      - 2 * this.countOccurrences(this.medicine, 'Y') - 1
  }

  applyAllReplacements(): void {
    for (const replacement of Object.entries(this.replacements)) {
        const uniqueMolecules = this.applyReplacement(this.medicine, replacement)
        uniqueMolecules.forEach(um => this.molecules.add(um))
    }
  }

  applyReplacement (chain: string, replacement: Entry): Set<string> {
    const uniqueMolecules: Set<string> = new Set()
    for (const repl of replacement[1]) {
      let start = 0
      let index
      while ((index = chain.indexOf(replacement[0], start)) >= 0) {
          const variation = chain.substring(0, index) + repl + chain.substring(index + replacement[0].length)
          uniqueMolecules.add(variation)
          start = index + replacement[0].length
      }
    }

    return uniqueMolecules
  }

  buildReplacementMap (replacements: string[]): ReplacementMap {
    const rmap: ReplacementMap = {}
    for (const replacement of replacements) {
      const tokens = replacement.split(/\s/g)
      if (!rmap[tokens[0]]) rmap[tokens[0]] = []
      rmap[tokens[0]].push(tokens[2])
    }
    return rmap
  }

  countOccurrences(str: string, x: string): number {
    return str.split(x).length - 1
  }
}