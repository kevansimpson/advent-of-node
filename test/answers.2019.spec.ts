import assert from 'assert'
import 'mocha'
import path from 'path'
import { readLines, readString } from '../src/helpers/input'
import { intCode } from '../src/2019/intCode'
import { targetProgram } from '../src/2019/day02'
import { countSteps, crossWires } from '../src/2019/day03'
import { Enhanced } from '../src/2019/day05'
import { OrbitMap } from '../src/2019/day06'


describe('2019 solutions', () => {
  describe('Day02: intCode I', async () => {
    const input = readString(path.join(__dirname, './resources/2019/input02.txt')).split(',').map(Number)
    // before running the program, replace position 1 with the value 12 and replace position 2 with the value 2
    const copy = [...input]
    copy[1] = 12
    copy[2] = 2
    it('runProgram', async () => assert.strictEqual(intCode(copy)[0], 4570637))
    it('targetProgram', async () => assert.strictEqual(targetProgram(input, 19690720), 5485))
  })

  describe('Day03: wire steps', async () => {
    const input = readLines(path.join(__dirname, './resources/2019/input03.txt'))
    const wire1 = input[0].split(',')
    const wire2 = input[1].split(',')
    it('crossWires', async () => assert.strictEqual(crossWires(wire1, wire2), 352))
    it('countSteps', async () => assert.strictEqual(countSteps(wire1, wire2), 43848))
  })

  describe('Day 05: intCode II', async () => {
    const input = readString(path.join(__dirname, './resources/2019/input05.txt')).split(',').map(Number)
    it('enhancedProgram => 1', async () =>
      assert.strictEqual(new Enhanced(1).run([...input]), 13285749))
    it('enhancedProgram => 5', async () =>
      assert.strictEqual(new Enhanced(5).run([...input]), 5000972))
  })
  
  describe('Day 06: orbits', async () => {
    const input = readLines(path.join(__dirname, './resources/2019/input06.txt'))
    const omap: OrbitMap = new OrbitMap(input)
    it('totalOrbits', async () => assert.strictEqual(omap.totalOrbits(), 249308))
    it('minimumOrbitTransfers', async () => assert.strictEqual(omap.minimumOrbitTransfers(), 349))
  })
})
