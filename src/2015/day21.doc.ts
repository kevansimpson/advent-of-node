/**
 * @module 2015_day21
 */
import { Boss } from './day21'

export const boss: Boss = { armor: 2, damage: 8, hitPoints: 109 }

/**
 * <h2>Part 1</h2>
 * Little Henry Case got a new video game for Christmas. It's an RPG, and he's stuck on a boss.
 * He needs to know what equipment to buy at the shop. He hands you the controller.
 *
 * In this game, the player (you) and the enemy (the boss) take turns attacking. The player always
 * goes first. Each attack reduces the opponent's hit points by at least 1. The first character at
 * or below 0 hit points loses.
 *
 * Damage dealt by an attacker each turn is equal to the attacker's damage score minus the defender's
 * armor score. An attacker always does at least 1 damage. So, if the attacker has a damage score of 8,
 * and the defender has an armor score of 3, the defender loses 5 hit points. If the defender had an
 * armor score of 300, the defender would still lose 1 hit point.
 *
 * Your damage score and armor score both start at zero. They can be increased by buying items in
 * exchange for gold. You start with no items and have as much gold as you need. Your total damage or
 * armor is equal to the sum of those stats from all of your items. You have 100 hit points.
 *
 * @see #buildItems()
 *
 * You must buy exactly one weapon; no dual-wielding. Armor is optional, but you can't use more than one.
 * You can buy 0-2 rings (at most one for each hand). You must use any items you buy. The shop only has
 * one of each item, so you can't buy, for example, two rings of Damage +3.
 *
 * You have 100 hit points. The boss's actual stats are in your puzzle input. What is the least amount of
 * gold you can spend and still win the fight?
 */
export const part1 = 111

/**
 * <h2>Part 2</h2>
 * Turns out the shopkeeper is working with the boss, and can persuade you to buy whatever items he wants.
 * The other rules still apply, and he still only has one of each item.
 */
export const part2 = 188
