/**
 * @module 2024_day24
 */

import { splitByBlankLine } from '../helpers/input'

export function solve(input: string[]): [number, string] {
  const system = scan(input)
  const swaps = new Set<string>()
  let gateLevels = system.firstLevelGates()
  while (true) {
    system.identifySwappedWires(gateLevels, swaps)
    if (swaps.size === 8) break
    gateLevels = system.nextLevelGates(gateLevels, swaps)
  }

  system.reset()
  return [system.resolveAll('z'), [...swaps].sort().join(',')]
}

class LiveSystem {
  public initialWires: Map<string, number>
  public gatesByOutput: Map<string, Gate>
  public gatesByInput: Map<string, Gate[]>
  public resolved = new Map<string, number>()

  public constructor(wires: Map<string, number>, out: Map<string, Gate>, input: Map<string, Gate[]>) {
    this.initialWires = wires
    this.gatesByOutput = out
    this.gatesByInput = input

    wires.forEach((v, k) => this.resolved.set(k, v))
  }

  public resolveAll(prefix: string): number {
    let out = ''
    for (let c = this.wireCount(prefix) - 1; c >=0; c--)
      out += this.resolve(`${prefix}${c.toString().padStart(2, '0')}`)

    return parseInt(out, 2)
  }

  public resolve(output: string): number {
    if (!this.resolved.has(output)) {
      const g = this.gatesByOutput.get(output)!
      const left = this.resolve(g.left)
      const right = this.resolve(g.right)
      switch (g.op) {
        case 'AND':
          this.resolved.set(output, left & right)
          break;
        case 'OR':
          this.resolved.set(output, left | right)
          break;
        case 'XOR':
          this.resolved.set(output, left ^ right)
          break;
      }
    }
    return this.resolved.get(output)!
  }

  public nextLevelGates(current: Gate[], swaps: Set<string>): Gate[] {
    const next: Gate[] = []
    current.forEach(level => {
      const wire = level.output
      if (!wire.startsWith('z') && !swaps.has(wire)) {
        this.gatesByInput.get(wire)!.forEach(g => {
          g.type = `${level.type} ${level.op}`
          g.nextOps = this.findNextOps(g.output)
          next.push(g)
        })
      }
    })
    return next
  }

  public identifySwappedWires(gateLevels: Gate[], swaps: Set<string>) {
    const outputById = new Map<string, string[]>()
    gateLevels.forEach(level => {
      const id = level.id()
      if (!this.isOutlier(level, id)) {
        if (!outputById.has(id))
          outputById.set(id, [])
        outputById.get(id)!.push(level.output)
      }
    })

    outputById.values().forEach(out => {
      if (out.length <= 8)
        out.forEach(o => swaps.add(o))
    })
  }

  public isOutlier(gate: Gate, id: string): boolean {
    switch (id) {
      case 'XOR~~XY~~ZZZ':
      case 'AND~~XY~~AND-XOR':
        return gate.left.endsWith('00')
      case 'OR~~XY AND~~ZZZ':
        return gate.output.startsWith('z') && Number(gate.output.substring(1)) == Math.floor(this.initialWires.size / 2)
      default: return false
    }
  }

  public firstLevelGates(): Gate[] {
    const firstLevel: Gate[] = new Array(this.initialWires.size)
    this.gatesByOutput.forEach((g, out) => {
      if (g.left.startsWith('x') || g.left.startsWith('y')) {
        g.type = "XY"
        g.nextOps = this.findNextOps(out)
        firstLevel[Number(g.left.substring(1)) * 2 + (g.op === "AND" ? 0 : 1)] = g
      }
    })
    return firstLevel
  }

  public findNextOps(outWire: string): string {
    return (outWire.startsWith("z")) ? "ZZZ" : this.gatesByInput.get(outWire)!.map(g => g.op).toSorted().join('-')
  }

  public reset() {
    this.resolved.clear()
    this.initialWires.forEach((v, k) => this.resolved.set(k, v))
  }

  public wireCount(prefix: string): number {
    let count = 0
    this.gatesByOutput.forEach((_, out) => {
      if (out.startsWith(prefix))
        count++
    });

    if (count === 0)
      this.resolved.forEach((_, out) => {
        if (out.startsWith(prefix))
          count++
      });
  
    return count
  }
}

function scan(input: string[]): LiveSystem {
  const data = splitByBlankLine(input)
  const initialWires = new Map<string, number>()
  data[0].forEach(wire => {
    const parts = wire.split(': ')
    initialWires.set(parts[0], Number(parts[1]))
  })

  const gatesByOutput = new Map<string, Gate>()
  const gatesByInput = new Map<string, Gate[]>()
  data[1].forEach(conn => {
    const wires = conn.split(' ')
    const g = new Gate(wires[0], wires[1], wires[2], wires[4])
    gatesByOutput.set(g.output, g)

    if (!gatesByInput.has(g.left))
      gatesByInput.set(g.left, [])
    gatesByInput.get(g.left)!.push(g)
    if (!gatesByInput.has(g.right))
      gatesByInput.set(g.right, [])
    gatesByInput.get(g.right)!.push(g)
  })

  return new LiveSystem(initialWires, gatesByOutput, gatesByInput)
}

class Gate {
  public left: string
  public op: string
  public right: string
  public output: string
  public type = ''
  public nextOps = ''

  public constructor(l: string, o: string, r: string, out: string) {
    this.left = l
    this.op = o
    this.right = r
    this.output = out
  }

  public id(): string {
    return `${this.op}~~${this.type}~~${this.nextOps}`
  }
}