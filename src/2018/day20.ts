/**
 * @module 2018_day20
 */
import { Point, move, Cardinal } from '../helpers/point'
import { array2D, sum } from '../helpers/util'

enum Area {
  ROOM = '.',
  HDOOR = '-',
  VDOOR = '|',
  WALL = '#',
  SPACE = '?'
}

export function mapArea (directions: string): MappedArea {
  const area = new MappedArea(directions)
  // let path = area.path
  // console.log(`PATH1 => ${JSON.stringify(path)}`, typeof path)
  return area
}

const deadex = /NEWS|SEWN|NWES|SWEN|ENSW|ESNW|WNSE|WSNE/i // dead end paths
export function shortestPath (path: string | Path): number {
  if (typeof path === 'string') {
    // console.log(`STR => ${path}`, path.match(deadex))
    return path.replace(deadex, '').length
  } else if (path.forks) {
    return path.steps.map(s => shortestPath(s)).reduce((a, b) => a > b ? a : b, Number.MIN_VALUE)
  } else {
    return sum(path.steps.map(s => shortestPath(s)))
  }
}

const regex = /\([^()]*\)/i // finds nested ()

interface Path {
  forks: boolean
  steps: Array<string | Path>
}

export class MappedArea {
  size: number = 5
  grid: string[][]
  map: string
  path: string | Path
  vars: { [ name: string]: string } = {}
  guide: Point

  constructor (directions: string) {
    this.map = directions
    this.path = this.mapPath(directions.replace('^', '').replace('$', ''))
    if (typeof this.path === 'string') this.path = this.unroll(this.path)
    this.size = shortestPath(this.path)
    this.grid = array2D(this.size * 2, Area.SPACE)
    this.guide = [this.size, this.size]
  }

  followPath (): void {
    this.follow(this.path, this.guide)
  }

  private follow (path: string | Path, guide: Point): void {
    let xy = guide
    if (typeof path === 'string') {
      this.followDirect(path, xy)
    } else if (path.forks) {
      console.log('')

    } else {
      console.log('')
    }
  }

  private followDirect (path: string, xy: Point): void {
    const moves = path.split('')
    for (const dir of moves) {
      xy = move(xy, dir as Cardinal)
      switch (dir) {
        case 'N':
        case 'S':
          this.grid[xy[0]][xy[1]] = Area.HDOOR
          break
        default:
          this.grid[xy[0]][xy[1]] = Area.VDOOR
          break
      }
      // thru door
      xy = move(xy, dir as Cardinal)
      this.grid[xy[0]][xy[1]] = Area.ROOM
    }
  }

  areaAt (x: number, y: number) {
    return this.grid[x][y]
  }

  display (): string {
    let grid = ''
    for (let y = 0; y < this.size; y++) {
      let row = ''
      for (let x = 0; x < this.size; x++) {
        row += this.areaAt(x, y)
      }
      grid += `${row}
`
    }

    return grid
  }

  private mapPath (directions: string, index: number = 1): string | Path {
    // console.log('DIR   => ', directions)
    const match = directions.match(regex)
    // console.log('MATCH => ', match)
    if (match && match.index) {
      let key = `x${index}x`
      const path = match[0].replace(/\(|\)/g, '')
      if (path.split('|').indexOf('') >= 0) key = ''
      else this.vars[key] = path
      // console.log('VARS => ', this.vars)
      const steps = directions.substring(0, match.index) + key + directions.substring(match.index + match[0].length)
      return this.mapPath(steps, 1 + index)
    }
    // console.log('PATH2 => ', directions.split('x'))
    return directions
  }

  private unroll (step: string): string | Path {
    const steps = step.split('|')
    if (steps.length === 1) {
      if (step.indexOf('x') >= 0) {
        return {
          forks: false,
          steps: step.split('x').filter(s => s.length > 0).map(s => this.unroll(this.vars[`x${s}x`] || s))
        }
      } else return step
    }

    // if (steps.indexOf('') >= 0) return ''
    return { forks: true, steps: steps.map(s => this.unroll(s)) }
  }
}
