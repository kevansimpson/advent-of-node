import assert from 'assert';
import 'mocha'
import { CPU, OperationMatches, countAmbiguous, monitorCPU } from '../../src/2018/day16'

describe('2018 examples - Day 16', () => {
  it('monitor cpu + count ambiguous', async () => {
    const input = `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`
    const cpu: CPU = monitorCPU(input.split(/\r?\n/g))
    const expected = new CPU()
    expected.monitors.push({
      before: [3, 2, 1, 1],
      after: [3, 2, 2, 1],
      instruction: [9, 2, 1, 2]
    })
    assert.deepStrictEqual(cpu, expected)
    const ambiguous: [number, OperationMatches] = countAmbiguous(cpu)
    assert.strictEqual(ambiguous[0], 1)
  })
})
