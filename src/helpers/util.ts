import assert from 'assert'
import { Answer } from '../types/advent'

const indent: string = '                    '

export function answer (expected: Answer, actual: Function, input: Answer | number[] | string[]): void {
  start(actual.name)
  assert.strictEqual(actual(input), expected)
  end(actual.name)
}

export function debug (): boolean {
  return process.argv.includes('--advent')
}

export function start (name: string): void {
  if (debug()) console.time(`${indent}${name}`)
}

export function end (name: string, next?: string): void {
  if (debug()) console.timeEnd(`${indent}${name}`)
  if (next) start(next)
}
