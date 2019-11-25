/**
 * @module 2015_day21
 */
import { debug, sum } from '../helpers/util'

export function tailorOutfits (boss: Boss): [number, number] {
  return new Tailor().outfitWarrior(boss)
}

class Tailor {
  lowestCost: number = Number.MAX_VALUE
  highestCost: number = Number.MIN_VALUE
  bestOutfit: Outfit | undefined = undefined
  worstOutfit: Outfit | undefined = undefined

  outfitWarrior (boss: Boss): [number, number] {
    for (const weapon of Object.keys(inventory['weapons'])) {
      const w: Item = inventory['weapons'][weapon]
      for (const armor of Object.keys(inventory['armor'])) {
        const a: Item = inventory['armor'][armor]
        // no rings
        this.evaluateOutfit(new Outfit(w, a), boss)

        const rings = Object.keys(inventory['rings'])
        // one ring
        for (const leftHand of rings) {
          const lh: Item = inventory['rings'][leftHand]
          this.evaluateOutfit(new Outfit(w, a, lh), boss)
          // two rings
          for (const rightHand of rings) {
            if (leftHand === rightHand) continue
            const rh: Item = inventory['rings'][rightHand]
            this.evaluateOutfit(new Outfit(w, a, lh, rh), boss)
          }
        }
      }
    }

    debug(`Best outfit is ${this.bestOutfit} with cost of ${this.lowestCost}`)
    debug(`Worst outfit is ${this.worstOutfit} with cost of ${this.highestCost}`)

    return [this.lowestCost, this.highestCost]
  }

  evaluateOutfit (outfit: Outfit, boss: Boss): void {
    const cost = outfit.cost()
    if (isWinningOutfit(boss, outfit)) {
      if (cost < this.lowestCost) {
        this.bestOutfit = outfit
        this.lowestCost = cost
      }
    } else {
      if (cost > this.highestCost) {
        this.worstOutfit = outfit
        this.highestCost = cost
      }
    }
  }
}

export function isWinningOutfit (boss: Boss, outfit: Outfit, hitPoints: number = 100): boolean {
  let myHP = hitPoints
  let bossHP = boss.hitPoints
  const myDmg = outfit.damage() - boss.armor
  const bossDmg = boss.damage - outfit.armor()

  while (myHP > 0) {
    bossHP -= myDmg
    if (bossHP <= 0) return true
    myHP -= bossDmg
  }

  return false
}

export class Outfit {
  items: Item[] = []

  constructor (w: Item, a: Item, ...rs: Item[]) {
    this.items.push(w)
    this.items.push(a)
    rs.forEach(r => this.items.push(r))
  }

  armor () {
    return sum(this.items.map(item => item.armor))
  }

  cost () {
    return sum(this.items.map(item => item.cost))
  }

  damage () {
    return sum(this.items.map(item => item.damage))
  }
}

export type Boss = {
  hitPoints: number
  damage: number
  armor: number
}

type Item = {
  cost: number
  damage: number
  armor: number
}

type Inventory = { [category: string]: { [item: string]: Item }}

export const inventory: Inventory = {
  weapons: {
    dagger: { cost: 8, damage: 4, armor: 0 },
    shortsword: { cost: 10, damage: 5, armor: 0 },
    warhammer: { cost: 25, damage: 6, armor: 0 },
    longsword: { cost: 40, damage: 7, armor: 0 },
    greataxe: { cost: 74, damage: 8, armor: 0 }
  },
  armor: {
    naked: { cost: 0, damage: 0, armor: 0 },
    leather: { cost: 13, damage: 0, armor: 1 },
    chainmail: { cost: 31, damage: 0, armor: 2 },
    splintmail: { cost: 53, damage: 0, armor: 3 },
    bandedmail: { cost: 75, damage: 0, armor: 4 },
    platemail: { cost: 102, damage: 0, armor: 5 }
  },
  rings: {
    damagePlus1: { cost: 25, damage: 1, armor: 0 },
    damagePlus2: { cost: 50, damage: 2, armor: 0 },
    damagePlus3: { cost: 100, damage: 3, armor: 0 },
    defensePlus1: { cost: 20, damage: 0, armor: 1 },
    defensePlus2: { cost: 40, damage: 0, armor: 2 },
    defensePlus3: { cost: 80, damage: 0, armor: 3 }
  }
}
