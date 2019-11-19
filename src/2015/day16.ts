/**
 * @module 2015_day16
 */
import { tickerTape } from './day16.doc'

export function whichSue(sueList: string[]): number {
  return compareSues(sueList, hasSameAttr)
}

export function outdatedRetroencabulator (sueList: string[]) {
  return compareSues(sueList, hasSameRanges)
}

const INDEX = 'index'

function compareSues(sueList: string[], fxn: (tape: Sue, attr: Sue) => boolean): number {
  const potentials: Sue[] = []
  for (const aSueList of sueList) {
    const attr = parseSue(aSueList);
    if (fxn(tickerTape, attr)) potentials.push(attr)
  }

  return potentials[0][INDEX]
}

function hasSameRanges (attr1: Sue, attr2: Sue): boolean {
  return satisfiesTicker(attr1, attr2) && reverseTicker(attr2, attr1)
}

function satisfiesTicker (tickerTape: Sue, attr: Sue): boolean {
  for (const key of Object.keys(tickerTape)) {
    switch (key) {
      case INDEX:
        continue
      case 'trees':
      case 'cats':
        // ObjectUtils.compare(tickerTape.get(key), attr.get(key)) >= 0) {
        if (attr[key] && (tickerTape[key] - attr[key]) >= 0) return false
        break
      case 'pomeranians':
      case 'goldfish':
        // if (attr.containsKey(key) && ObjectUtils.compare(tickerTape.get(key), attr.get(key)) <= 0) {
        if (attr[key] && (tickerTape[key] - attr[key]) <= 0) return false
        break
      default:
        if (attr[key] && tickerTape[key] !== attr[key]) return false
    }
  }

  return true
}

function reverseTicker (attr: Sue, tickerTape: Sue) {
  for (const key of Object.keys(attr)) {
    switch (key) {
      case INDEX:
      case 'trees':
      case 'cats':
      case 'pomeranians':
      case 'goldfish':
        continue
      default:
        if (tickerTape[key] && attr[key] !== tickerTape[key]) return false
    }
  }

  return true
}

function hasSameAttr (attr1: Sue, attr2: Sue): boolean {
  return hasSameValues(attr1, attr2) && hasSameValues(attr2, attr1)
}

function hasSameValues (attr1: Sue, attr2: Sue): boolean {
  for (const key of Object.keys(attr1)) {
    if (INDEX === key) continue

    if (attr2[key] && attr1[key] !== attr2[key]) return false
  }

  return true
}

function parseSue(sue: string): Sue {
  const attr: Sue = {}
  const m: RegExpMatchArray | null = sue.match(/^Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)$/)
  if (m) {
    attr[INDEX] = +m[1]
    attr[m[2]] = +m[3]
    attr[m[4]] = +m[5]
    attr[m[6]] = +m[7]
  }
  else {
    throw new Error(`No match: ${sue}`)
  }

  return attr
}

type Sue = { [key: string]: number }
