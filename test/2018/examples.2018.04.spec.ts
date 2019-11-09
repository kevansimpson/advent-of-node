import assert from 'assert';
import 'mocha'
import { Guard, findSleepiestGuard, getSleepiestMinute, parseRecords, strategy1, strategy2 } from '../../src/2018/day04'

describe('2018 examples - Day 04', () => {
  const input: string[] = [
    '[1518-11-01 00:00] Guard #10 begins shift',
    '[1518-11-01 00:05] falls asleep',
    '[1518-11-01 00:25] wakes up',
    '[1518-11-01 00:30] falls asleep',
    '[1518-11-01 00:55] wakes up',
    '[1518-11-01 23:58] Guard #99 begins shift',
    '[1518-11-02 00:40] falls asleep',
    '[1518-11-02 00:50] wakes up',
    '[1518-11-03 00:05] Guard #10 begins shift',
    '[1518-11-03 00:24] falls asleep',
    '[1518-11-03 00:29] wakes up',
    '[1518-11-04 00:02] Guard #99 begins shift',
    '[1518-11-04 00:36] falls asleep',
    '[1518-11-04 00:46] wakes up',
    '[1518-11-05 00:03] Guard #99 begins shift',
    '[1518-11-05 00:45] falls asleep',
    '[1518-11-05 00:55] wakes up'
  ]
  const records = parseRecords(input.sort())

  it('should return guardID * minute', () => {
    const guard: Guard = findSleepiestGuard(records)
    assert.strictEqual(guard.id, 10)
    assert.strictEqual(getSleepiestMinute(guard), 24)
    assert.strictEqual(strategy1(records), 240)
  })

  it('should return alternate strategy', () => {
    assert.strictEqual(strategy2(records), 4455)
  })
})
