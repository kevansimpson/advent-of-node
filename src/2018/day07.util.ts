/**
 * @module 2018_day07
 */
// import { Answer } from '../types/advent'

export type Step = {
  name: string,
  steps: string[]
  done: boolean
  active: boolean
}

export class Manager {
  workers: Worker[]
  tasks: Step[]

  constructor (workers: number, offset: number) {
    this.tasks = []
    this.workers = []
    for (let i = 0; i < workers; i++) this.workers.push(new Worker(i, offset))
  }

  addTask (task: Step): void {
    activate(task)
    this.tasks.push(task)
  }

  distributeTasks (): void {
    if (this.tasks.length > 0) {
      const iter: Iterator<Step> = this.tasks[Symbol.iterator]()
      let next = iter.next()
      let worker: Worker | null = this.nextWorker()
      while (worker !== null && !next.done) {
        const task = next.value
        worker.startTask(task)
        const index = this.tasks.indexOf(task, 0)
        if (index > -1) this.tasks.splice(index, 1)
        worker = this.nextWorker()
        next = iter.next()
      }
    }
  }

  isWorkDone (): boolean {
    if (this.tasks.length > 0) return false

    for (let w of this.workers) {
      if (!w.isAvailable()) return false
    }

    return true
  }

  nextWorker (): Worker | null {
    for (let w of this.workers) {
      if (w.isAvailable()) return w
    }

    return null
  }

  tick (): void {
    this.workers.forEach(w => w.tick())
  }
}

export class Worker {
  id: number
  offset: number
  duration: number
  task?: Step

  constructor (uuid: number, offset: number) {
    this.id = uuid
    this.offset = offset
    this.duration = 0
  }

  tick (): void {
    if (this.duration > 0) --this.duration

    if (this.duration === 0) {
      if (this.task !== undefined) markDone(this.task)
    }
  }

  startTask (step: Step): void {
    this.duration = getDuration(step, this.offset)
    this.task = step
    activate(this.task)
  }

  isAvailable (): boolean {
    return this.duration === 0
  }
}

function activate (step: Step): void {
  step.done = false
  step.active = true
}

function getDuration (step: Step, offset: number): number {
  return (step.name.codePointAt(0) || 0) - 64 + offset
}

export function markDone (step: Step): void {
  step.done = true
  step.active = false
}
