/**
 * @module 2018_day07
 */
import { Answer } from '../types/advent'

export type Step = {
  name: string,
  steps: string[]
  done?: boolean
  active?: boolean
}

export function buildStepMap (input: string[]): Map<string, Step> {
  const pairs: [string, string][] = input
    .map(str => str.match(/[A-Z]/g))
    .filter((match: RegExpMatchArray | null) => match !== null)
    .map((match: RegExpMatchArray | null) => {
      if (match !== null) return [match[1].charAt(0), match[2].charAt(0)]
      throw new Error('buildStepMap')
    })

  const steps: Map<string, Step> = new Map()
  for (let lr of pairs) {
    if (!steps.has(lr[0])) steps.set(lr[0], { name: lr[0], steps: [] })
    if (!steps.has(lr[1])) steps.set(lr[1], { name: lr[1], steps: [] })

    const right = steps.get(lr[1])
    const left = steps.get(lr[0])
    if (left && right) right.steps.push(left.name)
  }

  return steps
}

export function orderInstructions (steps: Map<string, Step>): Answer {
  for (let key of steps.keys()) console.log(`${key} => ${JSON.stringify(steps.get(key))}`)
  let complete: boolean = false
  const instr: string[] = []
  const skeys = [...steps.keys()].sort()
  while (!complete) {
    complete = true
    for (let k of skeys) {
      const step = steps.get(k)
      if (step === undefined) throw new Error('Undefined Step!')
      if (isDone(step)) continue

      if (isAvailable(step, steps)) {
        instr.push(step.name)
        markDone(step)
        complete = false
        break
      }
    }
  }

  return instr.join('')
}

export function calculateDuration (steps: Map<string, Step>, workers: number, offset: number): Answer {
  return steps.size * workers * offset
}

function isAvailable (step: Step, steps: Map<string, Step>): boolean {
  if (step.steps.length === 0) return true

  for (let child of step.steps) if (!isDone(steps.get(child))) return false

  return true
}

function isDone (step: Step | undefined): boolean {
  return step !== undefined && Boolean(step.done)
}

// function activate (step: Step): void {
//   step.done = false
//   step.active = true
// }

function markDone (step: Step): void {
  step.done = true
  step.active = false
}
