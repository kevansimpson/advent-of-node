import assert from 'assert';
import 'mocha'
import { findFloor, firstEntersBasement } from '../src/2015/day01'
import { wrapPresents } from '../src/2015/day02'
import { followDirections, robotDelivers } from '../src/2015/day03'
import { mineCoins } from '../src/2015/day04'
import { countNiceStrings, countNicerStrings } from '../src/2015/day05'
import { countLightsOn, totalBrightness } from '../src/2015/day06'
import { buildCircuitMap } from '../src/2015/day07'
import { totalCharacters, totalEncryptedCharacters } from '../src/2015/day08'
import { PathFinder } from '../src/2015/day09'
import { lookAndSay } from '../src/2015/day10'
import {
  hasNonOverlappingPairs,
  hasSequence,
  isAllowed,
  nextValidPassword  } from '../src/2015/day11'
import { sumDocument } from '../src/2015/day12'
import { optimalHappiness } from '../src/2015/day13'
import { distanceTraveled, winningPoints } from '../src/2015/day14'
import { highestScoringRecipe } from '../src/2015/day15'
import { canPermutations } from '../src/2015/day17'
import { ConwaysGame } from '../src/2015/day18'
import { Chemist } from '../src/2015/day19'
import { lowestHouse, lowestHouseWithExtraPresent } from '../src/2015/day20'
import { inventory, isWinningOutfit, Outfit } from '../src/2015/day21'
import { Wizard, fightBoss } from '../src/2015/day22'
import { runProgram } from '../src/2015/day23'
import { arrangePackages } from '../src/2015/day24'
import { machineCode, nextValue } from '../src/2015/day25'
import bigInt from 'big-integer'

describe('2015 examples', async () => {
  describe('Day 01', async () => {
    it('findFloor', async () => {
      assert.strictEqual(findFloor('(())'), 0)
      assert.strictEqual(findFloor('()()'), 0)
      assert.strictEqual(findFloor('((('), 3)
      assert.strictEqual(findFloor('(()(()('), 3)
      assert.strictEqual(findFloor('))((((('), 3)
      assert.strictEqual(findFloor('())'), -1)
      assert.strictEqual(findFloor('))('), -1)
      assert.strictEqual(findFloor(')))'), -3)
      assert.strictEqual(findFloor(')())())'), -3)
    })

    it('firstEntersBasement', async () => {
      assert.strictEqual(firstEntersBasement(')'), 1)
      assert.strictEqual(firstEntersBasement('()())'), 5)
    })
  })

  describe('Day 02', async () => {
    it('total wrapping paper and ribbon', async () => {
      assert.deepStrictEqual(wrapPresents(['2x3x4']), [58, 34])
      assert.deepStrictEqual(wrapPresents(['1x1x10']), [43, 14])
    })
  })

  describe('Day 03', async () => {
    it('follows directions', async () => {
      assert.strictEqual(followDirections('>'), 2)
      assert.strictEqual(followDirections('^>v<'), 4)
      assert.strictEqual(followDirections('^v^v^v^v^v'), 2)
    })
  
    it('follows eggnog directions', async () => {
      assert.strictEqual(robotDelivers('^v'), 3)
      assert.strictEqual(robotDelivers('^>v<'), 3)
      assert.strictEqual(robotDelivers('^v^v^v^v^v'), 11)
    })
  })

  describe('Day 04', async () => {
    it('mine coins for 5 zeroes', async () => {
      assert.strictEqual(mineCoins('abcdef', '00000'), 609043)
      assert.strictEqual(mineCoins('pqrstuv', '00000'), 1048970)
    }).timeout(1000 * 5) // ~3s
  })

  describe('Day 05', async () => {
    it('counts nice strings', async () => {
      const input = [
        'ugknbfddgicrmopn', 'aaa', // nice
        'jchzalrnumimnmhp', 'haegwjzuvuyypxyu', 'dvszwmarrgswjxmb' // naughty
      ]
      assert.strictEqual(countNiceStrings(input), 2)
    })
  
    it('counts nicer strings', async () => {
      const input = [
        'qjhvhtzxzqqjkmpb', 'xxyxx', // nice
        'uurcxstgmygtbstg', 'ieodomkazucvgmuy' // naughty
      ]
      assert.strictEqual(countNicerStrings(input), 2)
    })
  })

  describe('Day 06', async () => {
    it('counts lights', async () => {
      const input = [
        'turn on 0,0 through 999,999',
        'toggle 0,0 through 999,0',
        'turn off 499,499 through 500,500'
      ]
      assert.strictEqual(countLightsOn(input), (1000000 - 1000 - 4))
    }).timeout(1000 * 5)
  
    it('total brightness', async () => {
      const input = [ 'turn on 0,0 through 0,0', 'toggle 0,0 through 999,999' ]
      assert.strictEqual(totalBrightness(input), (1 + 2000000))
    }).timeout(1000 * 5)
  })

  describe('Day 07', async () => {
    it('signal A', async () => {
      const input = [
        '123 -> x',
        '456 -> y',
        'x AND y -> d',
        'x OR y -> e',
        'x LSHIFT 2 -> f',
        'y RSHIFT 2 -> g',
        'NOT x -> h',
        'NOT y -> i'
      ]
      const cmap = buildCircuitMap(input)
      assert.strictEqual(cmap.calculate('x'), 123)
      assert.strictEqual(cmap.calculate('y'), 456)
      assert.strictEqual(cmap.calculate('d'), 72)
      assert.strictEqual(cmap.calculate('e'), 507)
      assert.strictEqual(cmap.calculate('f'), 492)
      assert.strictEqual(cmap.calculate('g'), 114)
      assert.strictEqual(cmap.calculate('h'), 65412)
      assert.strictEqual(cmap.calculate('i'), 65079)
    })
  })

  describe('Day 08', async () => {
    const input = ['""', '"abc"', '"aaa\\"aaa"', '"\\x27"']
    it('total characters', async () => {
      assert.strictEqual(totalCharacters([ input[0] ]), 2)
      assert.strictEqual(totalCharacters([ input[1] ]), 2)
      assert.strictEqual(totalCharacters([ input[2] ]), 3)
      assert.strictEqual(totalCharacters([ input[3] ]), 5)
      assert.strictEqual(totalCharacters(input), 12)
    })
  
    it('total encrypted characters', async () => {
      assert.strictEqual(totalEncryptedCharacters([ input[0] ]), 4)
      assert.strictEqual(totalEncryptedCharacters([ input[1] ]), 4)
      assert.strictEqual(totalEncryptedCharacters([ input[2] ]), 6)
      assert.strictEqual(totalEncryptedCharacters([ input[3] ]), 5)
      assert.strictEqual(totalEncryptedCharacters(input), 19)
    })
  })

  describe('Day 09', async () => {
    const input = ['London to Dublin = 464', 'London to Belfast = 518', 'Dublin to Belfast = 141']
    it('shortest and longest path', async () => {
      const paths = new PathFinder()
      assert.deepStrictEqual(paths.minMaxPaths(input), [605, 982])
    })
  })

  describe('Day 10', async () => {
    it('look and stutter', async () => {
      assert.strictEqual(lookAndSay('1'), '11')
      assert.strictEqual(lookAndSay('11'), '21')
      assert.strictEqual(lookAndSay('21'), '1211')
      assert.strictEqual(lookAndSay('1211'), '111221')
      assert.strictEqual(lookAndSay('111221'), '312211')
    })
  })

  describe('Day 11', async () => {
    it('valid password requirements', async () => {
      assert.strictEqual(hasSequence('hijklmmn'), true)
      assert.strictEqual(isAllowed('hijklmmn'), false)
      assert.strictEqual(hasNonOverlappingPairs('abbceffg'), true)
      assert.strictEqual(hasSequence('abbceffg'), false)
      assert.strictEqual(hasNonOverlappingPairs('abbcegjk'), false)
      assert.strictEqual(isAllowed('ghijmmaa'), false)
    })
  
    it.skip('next valid password', async () => {
      assert.strictEqual(nextValidPassword('abcdefgh'), 'abcdffaa')
      assert.strictEqual(nextValidPassword('ghijklmn'), 'ghjaabcc')
    }).timeout(1000 * 5)
  })

  describe('Day 12', async () => {
    it('sum document', async () => {
      assert.strictEqual(sumDocument('[1,2,3]'), 6)
      assert.strictEqual(sumDocument('{"a":2,"b":4}'), 6)
      assert.strictEqual(sumDocument('[[[3]]]'), 3)
      assert.strictEqual(sumDocument('{"a":{"b":4},"c":-1}'), 3)
      assert.strictEqual(sumDocument('{"a":[-1,1]}'), 0)
      assert.strictEqual(sumDocument('[-1,{"a":1}]'), 0)
      assert.strictEqual(sumDocument('[]'), 0)
      assert.strictEqual(sumDocument('{}'), 0)
    })
  
    it('sum document w/ exclusions', async () => {
      assert.strictEqual(sumDocument('[1,2,3]', ['red']), 6)
      assert.strictEqual(sumDocument('[1,{"c":"red","b":2},3]', ['red']), 4)
      assert.strictEqual(sumDocument('{"d":"red","e":[1,2,3,4],"f":5}', ['red']), 0)
      assert.strictEqual(sumDocument('[1,"red",5]', ['red']), 6)
    })
  })

  describe('Day 13', async () => {
    const input = [
      'Alice would gain 54 happiness units by sitting next to Bob.',
      'Alice would lose 79 happiness units by sitting next to Carol.',
      'Alice would lose 2 happiness units by sitting next to David.',
      'Bob would gain 83 happiness units by sitting next to Alice.',
      'Bob would lose 7 happiness units by sitting next to Carol.',
      'Bob would lose 63 happiness units by sitting next to David.',
      'Carol would lose 62 happiness units by sitting next to Alice.',
      'Carol would gain 60 happiness units by sitting next to Bob.',
      'Carol would gain 55 happiness units by sitting next to David.',
      'David would gain 46 happiness units by sitting next to Alice.',
      'David would lose 7 happiness units by sitting next to Bob.',
      'David would gain 41 happiness units by sitting next to Carol.'
    ]
  
    it('optimal happiness', async () => {
      assert.strictEqual(optimalHappiness(input), 330)
    })
  })

  describe('Day 14', async () => {
    const input = [
      'Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.',
      'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.'
    ]
  
    it('distance traveled', async () => assert.strictEqual(distanceTraveled(input, 1000), 1120))
    it('winning points', async () => assert.strictEqual(winningPoints(input, 1000), 689))
  })

  describe('Day 15', async () => {
    const input = [
      'Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8',
      'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3'
    ]
  
    it('high scoring recipe', async () => assert.strictEqual(highestScoringRecipe(input), 62842880))
    it('high scoring recipe < 500 calories', async () => {
      assert.strictEqual(highestScoringRecipe(input, 500), 57600000)
    })
  })

  describe('Day 17', async () => {
    const input = [ 20, 15, 10, 5, 5 ]
    it('can permutations', async () => assert.deepStrictEqual(canPermutations(input, 25), [4, 3]))
  })

  describe('Day 18', async () => {
    it('game of life x5', async () => {
      const input = [
        '.#.#.#',
        '...##.',
        '#....#',
        '..#...',
        '#.#..#',
        '####..'
      ]
      const game = new ConwaysGame(input)
      assert.strictEqual(game.play(5), 4)
      // game.displayGrid()
    })
  
    it('game of life w/ broken lights', async () => {
      const input = [
        '##.#.#',
        '...##.',
        '#....#',
        '..#...',
        '#.#..#',
        '####.#'
      ]
      const game = new ConwaysGame(input, true)
      assert.strictEqual(game.play(5), 17)
      // game.displayGrid()
    })
  })

  describe('Day 19', async () => {
    it('total molecules', async () => {
      const chem = new Chemist([ 'H => HO', 'H => OH', 'O => HH', 'HOH' ])
      assert.strictEqual(chem.totalMolecules(), 4)
    })
  })

  describe('Day 20', async () => {
    it('lowest house', async () => assert.strictEqual(lowestHouse(70, 10), 4))
    it('lowest house delivering extra present',
      async () => assert.strictEqual(lowestHouseWithExtraPresent(75, 10), 4))
  })

  describe('Day 21', async () => {
    it('winning outfit', async () => {
      const outfit = new Outfit({ cost: 0, armor: 5, damage: 5 }, inventory['armor'].naked)
      assert.strictEqual(isWinningOutfit({ armor: 2, damage: 7, hitPoints: 12 }, outfit, 8), true)
    })
  })

  describe('Day 22', async () => {
    it('fight boss', async () => {
      // suppose the player has 10 hit points and 250 mana,
      // and that the boss has 13 hit points and 8 damage:
      assert.strictEqual(fightBoss({ damage: 8, hitPoints: 13 }, new Wizard(10, 250, 13)), 226)
    })
  
    it('fight harder boss', async () => {
      // suppose the same initial conditions, except that the boss has 14 hit points instead
      assert.strictEqual(fightBoss({ damage: 8, hitPoints: 14 }, new Wizard(10, 250, 14)), 641)
    })
  })

  describe('Day 23', () => {
    const input = ['inc a', 'jio a, +2', 'tpl a', 'inc a']
    it('run program', async () => assert.strictEqual(runProgram(input, { 'a': 0, 'b': 0 }, 'a'), 2))
  })

  describe('Day 24', async () => {
    // weights 1 through 5 and 7 through 11
    const input = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
    it('arrange packages', async () => assert.strictEqual(arrangePackages([...input], 3), 99))
    it('arrange packages + trunk', async () => assert.strictEqual(arrangePackages([...input], 4), 44))
  })

  describe('Day 25', async () => {
    it('next', async () => assert.deepStrictEqual(nextValue(bigInt(20151125)), bigInt(31916031)))
    it('machine code grid', async () => assert.strictEqual(machineCode([3, 4], bigInt(21345942)), 21345942))
  })  
})
