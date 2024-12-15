import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines, readNumbers, readString } from '../src/helpers/input'
import { findFloor, firstEntersBasement } from '../src/2015/day01'
import { wrapPresents } from '../src/2015/day02'
import { robotDelivers, santaDelivers } from '../src/2015/day03'
import { mineCoins } from '../src/2015/day04'
import { countNiceStrings, countNicerStrings } from '../src/2015/day05'
import { countLightsOn, totalBrightness } from '../src/2015/day06'
import { overrideSignalB, signalA } from '../src/2015/day07'
import { totalCharacters, totalEncryptedCharacters } from '../src/2015/day08'
import { PathFinder } from '../src/2015/day09'
import { lookAndStutter } from '../src/2015/day10'
import { nextValidPassword } from '../src/2015/day11'
import { sumDocument } from '../src/2015/day12'
import { ME, optimalHappiness } from '../src/2015/day13'
import { distanceTraveled, winningPoints } from '../src/2015/day14'
import { highestScoringRecipe } from '../src/2015/day15'
import { whichSue, outdatedRetroencabulator } from '../src/2015/day16'
import { canPermutations } from '../src/2015/day17'
import { ConwaysGame } from '../src/2015/day18'
import { Chemist } from '../src/2015/day19'
import { lowestHouse, lowestHouseWithExtraPresent } from '../src/2015/day20'
import { tailorOutfits } from '../src/2015/day21'
import { Wizard, fightBoss } from '../src/2015/day22'
import { runProgram } from '../src/2015/day23'
import { arrangePackages } from '../src/2015/day24'
import { machineCode } from '../src/2015/day25'

describe('2015 answers - Day 01', async () => {
  describe('Day 01', async () => {
    const input = readString(path.join(__dirname, './resources/2015/input01.txt'))
    it('findFloor', async () => assert.strictEqual(findFloor(input), 74))
    it('firstEntersBasement', async () => assert.strictEqual(firstEntersBasement(input), 1795))
  })

  describe('Day 02', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input02.txt'))
    it('wrapPresents', async () => assert.deepStrictEqual(wrapPresents(input), [1588178, 3783758]))
  })

  describe('Day 03', async () => {
    const input = readString(path.join(__dirname, './resources/2015/input03.txt'))
    it('santa delivers', async () => assert.strictEqual(santaDelivers(input), 2081))
    it('robot delivers', async () => assert.strictEqual(robotDelivers(input), 2341))
  })

  describe('Day 04', async () => {
    const input: string = 'bgvyzdsv'
    it('mine coins for 5 zeroes', async () => assert.strictEqual(mineCoins(input, '00000'), 254575))
    it('mine coins for 6 zeroes', async () => assert.strictEqual(mineCoins(input, '000000'), 1038736))
      .timeout(1000 * 5) // ~2+ sec
  })

  describe('Day 05', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input05.txt'))
    it('countNiceStrings', async () => assert.strictEqual(countNiceStrings(input), 258))
    it('countNicerStrings', async () => assert.strictEqual(countNicerStrings(input), 53))
  })

  describe('Day 06', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input06.txt')).filter(str => str.trim().length > 0)
    it('countLightsOn', async () => assert.strictEqual(countLightsOn(input), 543903))
      .timeout(1000 * 15)
    it('totalBrightness', async () => assert.strictEqual(totalBrightness(input), 14687245))
      .timeout(1000 * 15)
  })

  describe('Day 07', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input07.txt')).filter(str => str.trim().length > 0)
    it('signalA', async () => assert.strictEqual(signalA(input), 46065))
    it('overrideSignalA', async () => assert.strictEqual(overrideSignalB(input), 14134))
  })

  describe('Day 08', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input08.txt')).filter(str => str.trim().length > 0)
    it('totalCharacters', async () => assert.strictEqual(totalCharacters(input), 1333))
    it('totalEncryptedCharacters', async () => assert.strictEqual(totalEncryptedCharacters(input), 2046))
  })

  describe('Day 09', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input09.txt')).filter(str => str.trim().length > 0)
    const paths = new PathFinder()
    it('PathFinder', async () => assert.deepStrictEqual(paths.minMaxPaths(input), [207, 804]))
  })

  describe('Day 10', async () => {
    const input = '1321131112'
    let x40: string
    it('lookAndStutter x40', async () => {
      x40 = lookAndStutter(input, 40)
      assert.strictEqual(x40.length, 492982)
    })
  
    it.skip('lookAndStutter x40+10', async () => {
      assert.strictEqual(lookAndStutter(x40, 10).length, 6989950)
    }).timeout(1000 * 5)
    it.skip('lookAndStutter x50', async () => {
      assert.strictEqual(lookAndStutter(input, 50).length, 6989950)
    }).timeout(1000 * 5)
  })

  describe('Day 11', async () => {
    const input = 'vzbxkghb'
    let pswd: string
    it('nextValidPassword', async () => {
      pswd = nextValidPassword(input)
      assert.deepStrictEqual(pswd, 'vzbxxyzz')
    })
  
    it('next nextValidPassword', async () => {
      assert.deepStrictEqual(nextValidPassword(pswd), 'vzcaabcc')
    })
  })

  describe('Day 12', async () => {
    const input = readString(path.join(__dirname, './resources/2015/input12.txt'))
    it('sumDocument', async () => assert.strictEqual(sumDocument(input), 111754))
    it('sumDocument - red', async () => assert.strictEqual(sumDocument(input, ['red']), 65402))
  })

  describe('Day 13', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input13.txt'))
    it('optimalHappiness', async () => assert.strictEqual(optimalHappiness(input), 733))
    it.skip('optimalHappiness w/ ME', async () => assert.strictEqual(optimalHappiness(input, [ME]), 725))
      .timeout(1000 * 8) // ~5s
  })

  describe('Day 14', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input14.txt'))
    it('distanceTraveled', async () => assert.strictEqual(distanceTraveled(input, 2503), 2696))
    it('winningPoints', async () => assert.strictEqual(winningPoints(input, 2503), 1084))
  })

  describe('Day 15', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input15.txt'))
    it('highestScoringRecipe', async () => {
      assert.strictEqual(highestScoringRecipe(input), 18965440)
    }).timeout(1000 * 3)
  
    it('highestScoringRecipe: 500 calories', async () => {
      assert.strictEqual(highestScoringRecipe(input, 500), 15862900)
    }).timeout(1000 * 3)
  })

  describe('Day 16', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input16.txt'))
    it('whichSue', async () => assert.strictEqual(whichSue(input), 40))
    it('outdatedRetroencabulator', async () => assert.strictEqual(outdatedRetroencabulator(input), 241))
  })

  describe('Day 17', async () => {
    const input = readNumbers(path.join(__dirname, './resources/2015/input17.txt'))
    it.skip('canPermutations', async () => {
      assert.deepStrictEqual(canPermutations(input), [1304, 18])
    }).timeout(1000 * 5)
  })

  describe('Day 18', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input18.txt'))
    it('gameOfLife x100', async () => {
      const game = new ConwaysGame(input)
      assert.strictEqual(game.play(100), 821)
      // game.displayGrid()
    })
  
    it('gameOfLife w/ broken lights', async () => {
      const game = new ConwaysGame(input, true)
      assert.strictEqual(game.play(100), 886)
      // game.displayGrid()
    })
  })

  describe('Day 19', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input19.txt'))
    it('totalMolecules', async () => {
      const chem = new Chemist([...input])
      assert.strictEqual(chem.totalMolecules(), 509)
    })
  
    it('shortestPath', async () => {
      const chem = new Chemist([...input])
      assert.strictEqual(chem.shortestPath(), 195)
    })
  })

  describe('Day 20', async () => {
    const input = 34000000
    it('lowestHouse', async () => assert.strictEqual(lowestHouse(input), 786240))
    it('lowestHouseWithExtraPresent', async () => assert.strictEqual(lowestHouseWithExtraPresent(input), 831600))
  })

  describe(' Day 21', async () => {
    const boss = { armor: 2, damage: 8, hitPoints: 109 }
    it('tailorOutfits', async () => assert.deepStrictEqual(tailorOutfits(boss), [111, 188]))
  })

  describe('Day 22', async () => {
    const boss= { damage: 10, hitPoints: 71 }
    it('fightBoss', async () => {
      assert.strictEqual(fightBoss(boss, new Wizard(50, 500, boss.hitPoints)), 1824)
    })
  
    it('fightBoss hard', async () => {
      assert.strictEqual(fightBoss(boss, new Wizard(50, 500, boss.hitPoints), true), 1937)
    })
  })

  describe('Day 23', async () => {
    const input = readLines(path.join(__dirname, './resources/2015/input23.txt'))
    it('runProgram a=0', async () => assert.strictEqual(runProgram(input, { 'a': 0, 'b': 0 }), 307))
    it('runProgram a=1', async () => assert.strictEqual(runProgram(input, { 'a': 1, 'b': 0 }), 160))
  })

  describe('Day 24', async () => {
    const input = readNumbers(path.join(__dirname, './resources/2015/input24.txt'))
    it.skip('arrangePackages @ 3', async () => {
      assert.strictEqual(arrangePackages([...input], 3), 11846773891)
    }).timeout(1000 * 120) // 90! seconds #smh
  
    it('arrangePackages @ 4', async () => assert.strictEqual(arrangePackages([...input], 4), 80393059))
  })

  describe('Day 25', async () => {
    it('machineCode', async () => {
      assert.strictEqual(machineCode([3083, 2978]), 2650453)
    })
  })
})
