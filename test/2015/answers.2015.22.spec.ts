import assert from 'assert'
import 'mocha'
import { Wizard, fightBoss } from '../../src/2015/day22'
import * as d22 from '../../src/2015/day22.doc'

describe('2015 answers - Day 22', () => {
  it('fightBoss', async () => {
    assert.strictEqual(fightBoss(d22.boss, new Wizard(50, 500, d22.boss.hitPoints)), d22.part1)
  })

  it('fightBoss hard', async () => {
    assert.strictEqual(fightBoss(d22.boss, new Wizard(50, 500, d22.boss.hitPoints), true), d22.part2)
  })
})
