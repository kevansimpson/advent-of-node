/**
 * @module 2015_day22
 */

export function fightBoss (boss: Boss, wizard: Wizard, hard: boolean = false): number {
  let lowestManaSpent = Number.MAX_VALUE
  let wizards: Wizard[] = [wizard]

  while (wizards.length > 0) {
    wizards.sort((w1, w2) => w2.totalManaSpent - w1.totalManaSpent)
    const wiz = wizards.shift()
    if (!wiz) break

    if (hard) {
      wiz.hitPoints -= 1
      if (wiz.hitPoints <= 0) continue
    }

    wiz.applyEffects()
    for (const spellName of Object.keys(spellBook)) {
      if (wiz.canCast(spellName)) {
        const copy = wiz.copy()
        copy.cast(spellName)
        copy.applyEffects()

        if (copy.bossHP <= 0) {
          if (copy.totalManaSpent < lowestManaSpent) {
            lowestManaSpent = copy.totalManaSpent
            wizards = wizards.filter(w => w.totalManaSpent <= lowestManaSpent)
          }
        } else {
          copy.hitPoints -= Math.max(1, boss.damage - copy.armor)
          if (copy.hitPoints > 0 && copy.mana > 0 && copy.totalManaSpent < lowestManaSpent) wizards.push(copy)
        }
      }
    }
  }

  return lowestManaSpent
}

export type Boss = {
  hitPoints: number
  damage: number
}

export class Wizard {
  hitPoints: number
  mana: number
  armor: number
  totalManaSpent: number
  activeEffects: { [ spell: string ]: number } = {}
  bossHP: number

  constructor (hp: number, m: number, b: number) {
    this.hitPoints = hp
    this.mana = m
    this.armor = 0
    this.totalManaSpent = 0
    this.bossHP = b
  }

  copy (): Wizard {
    const clone = new Wizard(this.hitPoints, this.mana, this.bossHP)
    clone.armor = this.armor
    clone.totalManaSpent = this.totalManaSpent
    clone.activeEffects = Object.assign({}, this.activeEffects)
    return clone
  }

  duration (spell: string) {
    const effect = this.activeEffects[spell]
    if (effect) {
      return effect
    } else {
      this.activeEffects[spell] = 0
      return 0
    }
  }

  applyEffects () {
    if (!this.activeEffects['Shield'] || this.activeEffects['Shield'] === 0) this.armor = 0

    for (const spell of Object.keys(this.activeEffects)) {
      const duration = this.duration(spell)
      if (duration > 0) {
        this.activeEffects[spell] = duration - 1
        switch (spell) {
          case 'Shield':
            this.armor = 7
            break
          case 'Poison':
            this.bossHP -= 3
            break
          case 'Recharge':
            this.mana += 101
            break
        }
      }
    }
  }

  canCast (spellName: string) {
    const spell: Spell = spellBook[spellName]
    // const ordinal = Object.keys(spellBook).indexOf(spellName)
    // return this.mana >= spell.manaCost && (ordinal < 2 || this.duration(spellName) === 0)
    return this.mana >= spell.manaCost && (spell.effectLasts === 0 || this.duration(spellName) === 0)
  }

  cast (spellName: string) {
    const spell: Spell = spellBook[spellName]
    this.mana -= spell.manaCost
    this.totalManaSpent += spell.manaCost

    switch (spellName) {
      case 'MagicMissile':
        this.bossHP -= 4
        break
      case 'Drain':
        this.bossHP -= 2
        this.hitPoints += 2
        break
      default:
        this.activeEffects[spellName] = spell.effectLasts
        break
    }
  }
}

type Spell = {
  manaCost: number
  effectLasts: number
}

const spellBook: { [ spell: string ]: Spell } = {
  'MagicMissile': { manaCost: 53, effectLasts: 0 }, // 4 dmg
  'Drain': { manaCost: 73, effectLasts: 0 },        // 2 dmg + 2 HP
  'Shield': { manaCost: 113, effectLasts: 6 },      // +7 armor / turn
  'Poison': { manaCost: 173, effectLasts: 6 },      // 3 dmg / turn
  'Recharge': { manaCost: 229, effectLasts: 5 }     // +101 mana / turn
}
