import assert from 'assert';
import 'mocha'
import { buildStepMap, calculateDuration, orderInstructions } from '../../src/2018/day07'

describe('2018 examples - Day 07', () => {
  const input = [
    'Step C must be finished before step A can begin.',
    'Step C must be finished before step F can begin.',
    'Step A must be finished before step B can begin.',
    'Step A must be finished before step D can begin.',
    'Step B must be finished before step E can begin.',
    'Step D must be finished before step E can begin.',
    'Step F must be finished before step E can begin.'
  ]

  it('should order instructions', () => {
    assert.strictEqual(orderInstructions(buildStepMap(input)), 'CABDFE')
  })

  it('should calculate duration', () => {
    assert.strictEqual(calculateDuration(buildStepMap(input), 2, 0), 15)
  })
})
