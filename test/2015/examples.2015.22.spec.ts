import assert from 'assert'
import 'mocha'
import { Wizard, fightBoss } from '../../src/2015/day22'

describe('2015 examples - Day 22', () => {
  it('fight boss', () => {
    // suppose the player has 10 hit points and 250 mana, and that the boss has 13 hit points and 8 damage:
    assert.strictEqual(fightBoss({ damage: 8, hitPoints: 13 }, new Wizard(10, 250, 13)), 226)
  })

  it('fight harder boss', () => {
    // suppose the same initial conditions, except that the boss has 14 hit points instead
    assert.strictEqual(fightBoss({ damage: 8, hitPoints: 14 }, new Wizard(10, 250, 14)), 641)
  })
})
