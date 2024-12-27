/**
 * @module 2024_day05
 */

export function solve (input: string[]): [number, number] {
  let middleSum = 0
  let corrected = 0
  const rulesUpdates = new RulesUpdates(input)
  rulesUpdates.updates.forEach(update => {
    if (inOrder(update, rulesUpdates))
      middleSum += update[Math.floor(update.length / 2)]
    else
      corrected += reorderUpdate(update, rulesUpdates)
  })

  return [middleSum, corrected]
}

function inOrder(update: number[], rules: RulesUpdates): boolean {
  for (let i = 0; i < update.length - 1; i++)
    for (let j = (i + 1); j < update.length; j++)
        if (rules.isBeforeUpdate(update, i, j))
            return false

  return true
}

function reorderUpdate(update: number[], rules: RulesUpdates): number {
  update.sort((a, b) => {
    if (rules.isBefore(b, a))
      return -1
    else
      return 1
  })
  return update[Math.floor(update.length / 2)]
}

class RulesUpdates {
  private before: Map<number, number[]>
  public updates: number[][]

  public constructor(input: string[]) {
    this.before = new Map()
    let i = 0
    for (i; i < input.length; i++) {
      if (input[i].length == 0)
        break
      const rule = input[i].split('|').map(n => Number(n))
      if (!this.before.has(rule[0]))
        this.before.set(rule[0], [])
      this.before.get(rule[0])!.push(rule[1])
    }
  
    // updates
    this.updates = []
    for (let j = ++i; j < input.length; j++)
      this.updates.push(input[j].split(',').map(n => Number(n)))
  }

  public isBefore(i: number, j: number): boolean {
    return !this.before.has(i) || !this.before.get(i)!.includes(j)
  }

  public isBeforeUpdate(update: number[], i: number, j: number): boolean {
    return !this.before.has(update[i]) || !this.before.get(update[i])!.includes(update[j])
  }
}
