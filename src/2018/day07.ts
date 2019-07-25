/**
 * @module 2018_day07
 */
import { Step, Manager, markDone } from './day07.util'
import { Answer } from '../types/advent'

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
    if (!steps.has(lr[0])) steps.set(lr[0], newStep(lr[0]))
    if (!steps.has(lr[1])) steps.set(lr[1], newStep(lr[1]))

    const right = steps.get(lr[1])
    const left = steps.get(lr[0])
    if (left && right) right.steps.push(left.name)
  }

  return steps
}

export function orderInstructions (steps: Map<string, Step>): Answer {
  let complete: boolean = false
  const instr: string[] = []
  // steps MUST be analyzed in alphabetical order
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
  const skeys = [...steps.keys()].sort()
  for (let key of skeys) console.log(`${key} => ${JSON.stringify(steps.get(key))}`)
  const manager = new Manager(workers, offset)
  let elapsed = 0

  console.log(`MGR => ${JSON.stringify(manager)}`)
  // steps MUST be analyzed in alphabetical order
  let complete: boolean = false
  while (!complete) {
    complete = true
    for (let k of skeys) {
      const step = steps.get(k)
      if (step === undefined) throw new Error('Undefined Step!')

      if (isDone(step)) continue

      if (isAvailable(step, steps) && !step.active) {
        complete = false
        manager.addTask(step)
      }
    }

    if (!manager.isWorkDone()) {
      manager.distributeTasks()
      elapsed++
      manager.tick()
    }

    // More work to do in future?
    if (complete) {
      for (let k of skeys) {
        const step = steps.get(k)
        if (step === undefined) throw new Error('Undefined Future Step!')
        if (!isDone(step)) {
          complete = false
          break
        }
      }
    }
  }

  return elapsed
}

function isAvailable (step: Step, steps: Map<string, Step>): boolean {
  if (step.steps.length === 0) return true

  for (let child of step.steps) if (!isDone(steps.get(child))) return false

  return true
}

function isDone (step: Step | undefined): boolean {
  return step !== undefined && step.done
}

function newStep (name: string): Step {
  return {
    name: name,
    steps: [],
    done: false,
    active: false
  }
}
