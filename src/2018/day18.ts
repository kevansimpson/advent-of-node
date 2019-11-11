/**
 * @module 2018_day17
 */
import { key, surrounding } from '../helpers/point'
import { debug, modulo } from '../helpers/util'

enum Acre {
  GROUND = '.',
  TREES = '|',
  LUMBER = '#'
}

export function sustainableMagic (lumberArea: LumberArea): LumberArea {
  const original = lumberArea.display()
  debug(original)

  const set: string[] = []
  set.push(original)
  let yard: LumberArea = new LumberArea(lumberArea.area, lumberArea.size)
  for (let ix1 = 0; ix1 < 1000; ix1++) {
    const next = strangeMagic(yard)
    const grid = next.display()
    const index = set.indexOf(grid)
    if (index >= 0) {
      debug(`Found duplicate at ${index} during minute ${ix1}`)
      const extra = modulo((1000000000 - index), (ix1 - index + 1))
      debug(grid)
      return strangeMagic(next, extra)
    } else set.push(grid)
    yard = next
  }

  return yard
}

export function strangeMagic (lumberArea: LumberArea, minutes: number = 1): LumberArea {
  let yard: LumberArea = new LumberArea(lumberArea.area, lumberArea.size)
  for (let i = 0; i < minutes; i++) {
    const next: Area = {}
    for (let y = 0; y < lumberArea.size; y++) {
      for (let x = 0; x < lumberArea.size; x++) {
        const surrounding: Survey = yard.surroundingAcres(x, y)
        switch (yard.acreAt(x, y)) {
          case Acre.GROUND:
            next[key(x, y)] = (surrounding['t'] >= 3) ? Acre.TREES : Acre.GROUND
            break
          case Acre.TREES:
            next[key(x, y)] = (surrounding['l'] >= 3) ? Acre.LUMBER : Acre.TREES
            break
          case Acre.LUMBER:
            next[key(x, y)] = (surrounding['l'] >= 1 && surrounding['t'] >= 1) ? Acre.LUMBER : Acre.GROUND
            break
        }
      }
    }

    yard = new LumberArea(next, yard.size)
  }

  return yard
}

export function mapLumberArea (input: string[], size: number = 50): LumberArea {
  const area: Area = {}
  for (let y = 0; y < size; y++) {
    const row = input[y].split('')
    for (let x = 0; x < size; x++) {
      const a = row[x] as Acre
      if (a === Acre.LUMBER || a === Acre.TREES) area[key(x, y)] = a
    }
  }
  return new LumberArea(area, size)
}

export type Area = { [pt: string]: Acre }

export type Survey = { g: number, t: number, l: number }

export class LumberArea {
  area: Area
  size: number = 50

  constructor (area: Area, size: number) {
    this.area = area
    this.size = size
  }

  acreAt (x: number, y: number): Acre {
    return this.area[key(x, y)] || Acre.GROUND
  }

  getResources (): number {
    const survey = this.survey()
    return survey['t'] * survey['l']
  }

  survey (): Survey {
    const result = { g: 0, t: 0, l: 0 }
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        switch (this.acreAt(x, y)) {
          case Acre.GROUND:
            result['g'] += 1
            break
          case Acre.TREES:
            result['t'] += 1
            break
          case Acre.LUMBER:
            result['l'] += 1
            break
        }
      }
    }
    return result
  }

  surroundingAcres (x: number, y: number): Survey {
    const result = { g: 0, t: 0, l: 0 }
    const acres = surrounding([x, y])
      .filter(xy => xy[0] >= 0 && xy[0] < this.size && xy[1] >= 0 && xy[1] < this.size)
    // console.log(`ACRES => ${acres}`)
    acres.forEach(xy => {
      switch (this.acreAt(xy[0], xy[1])) {
        case Acre.GROUND:
          result['g'] += 1
          break
        case Acre.TREES:
          result['t'] += 1
          break
        case Acre.LUMBER:
          result['l'] += 1
          break
      }
    })
    return result
  }

  display (): string {
    let grid = ''
    for (let y = 0; y < this.size; y++) {
      let row = ''
      for (let x = 0; x < this.size; x++) {
        row += this.acreAt(x, y)
      }
      grid += `${row}
`
    }

    return grid
  }
}
