/**
 * @module 2024_day23
 */

import { combinations } from "../helpers/util"

export function solve(input: string[]): [number, string] {
  const linksMap = createLinksMap(input)
  const chief = new Set<string>()
  let password = new Set<string>()

  linksMap.forEach((links, c1) => {
    const pairs = combinations(Array.from(links.connections), 2)
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i]
      const c2 = pair[0]
      const c3 = pair[1]
      const c2Links = linksMap.get(c2)!
      const c3Links = linksMap.get(c3)!
      if (containsAll(c2Links.connections, [c1, c3]) && containsAll(c3Links.connections, [c1, c2])) {
        if (c1.startsWith('t') || c2.startsWith('t') || c3.startsWith('t'))
          chief.add([c1, c2, c3].sort().toString())

        const pswd = links.toSet().intersection(c2Links.toSet().intersection(c3Links.toSet()))
        // not sure why size comparison isn't necessary :-(
        if (isPassword(pswd, linksMap)) {
          password = pswd
        }
      }
    }
  })

  return [chief.size, [...password].sort().join(',')]
}

function isPassword(pswd: Set<string>, linksMap: Map<string, Links>): boolean {
  for (const c in pswd) {
    const set = linksMap.get(c)!.toSet()
    if (!containsAll(pswd, [...set]))
      return false
  }
  return true
}

function containsAll(set: Set<string>, other: string[]) {
  return other.every(c => [...set].includes(c))
}

function createLinksMap(input: string[]): Map<string, Links> {
  const linksMap = new Map<string, Links>()
  input.forEach(line => {
    const pair = line.split('-')
    const c1 = linksMap.get(pair[0]) ?? new Links(pair[0])
    c1.connections.add(pair[1])
    linksMap.set(pair[0], c1)
    const c2 = linksMap.get(pair[1]) ?? new Links(pair[1])
    c2.connections.add(pair[0])
    linksMap.set(pair[1], c2)
  })
  return linksMap
}

class Links {
  public name: string
  public connections = new Set<string>()
  private all: Set<string> | undefined

  public constructor(nm: string) {
    this.name = nm
  }

  public toSet(): Set<string> {
    if (!this.all) {
      this.all = new Set<string>(this.connections)
      this.all.add(this.name)
    }
    
    return this.all
  }
}