/**
 * @module 2018_day05
 */
import { Answer } from '../types/advent'

export function formPolymer (input: string, rxns: Map<string, string>): Answer {
  const polymers = input.split('')
  const stack: string[] = []
  for (let ch of polymers) {
    if (stack.length > 0 && rxns.get(ch) === stack[stack.length - 1]) stack.pop()
    else stack.push(ch)
  }

  return stack.join('')
}

export function improvePolymer (input: string, rxns: Map<string, string>): Answer {
  const collapsed: Map<string, string> = new Map()
  for (let ch of rxns.keys()) {
    if (collapsed.has(ch)) continue

    const rxn = rxns.get(ch) || ch
    const permutation = input.replace(new RegExp(ch, 'gi'), '')
    const newPolymer = formPolymer(permutation, rxns).toString()
    collapsed.set(ch, newPolymer)
    collapsed.set(rxn, newPolymer)
  }

  return [...collapsed.values()].sort((a, b) => a.length - b.length)[0]
}

export function buildReactionMap (): Map<string, string> {
  const rxns: Map<string, string> = new Map()

  for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    const ucase = String.fromCharCode(i)
    const lcase = String.fromCharCode(i + 32)
    rxns.set(ucase, lcase)
    rxns.set(lcase, ucase)
  }

  return rxns
}
