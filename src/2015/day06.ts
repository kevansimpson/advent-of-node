/**
 * @module 2015_day06
 */
import { toPoint, Point } from '../helpers/point'
import { array2D, sum } from '../helpers/util'

export function countLightsOn (directions: string[]): number {
  const lightGrid: LightGrid = array2D(1000, 0)

  for (const directive of directions) {
    const [cmd, start, end] = readDirective(directive)
    for (let x = start[0]; x <= end[0]; x++) {
      const row = lightGrid[x]
      for (let y = start[1]; y <= end[1]; y++) {
        switch (cmd) {
          case Cmd.on:
            row[y] = 1
            break
          case Cmd.off:
            row[y] = 0
            break
          case Cmd.toggle:
            row[y] = (row[y] === 1) ? 0 : 1
            break
        }
      }
    }
  }

  return tallyLightGrid(lightGrid)
}

export function totalBrightness (directions: string[]): number {
  const lightGrid: LightGrid = array2D(1000, 0)

  for (const directive of directions) {
    const [cmd, start, end] = readDirective(directive)
    for (let x = start[0]; x <= end[0]; x++) {
      const row = lightGrid[x]
      for (let y = start[1]; y <= end[1]; y++) {
        const val = row[y] || 0
        switch (cmd) {
          case Cmd.on:
            row[y] = val + 1
            break
          case Cmd.off:
            if (val > 0) row[y] = val - 1
            break
          case Cmd.toggle:
            row[y] = val + 2
            break
        }
      }
    }
  }

  return tallyLightGrid(lightGrid)
}

function readDirective (directive: string): Directive {
  const parts = directive.split(/\s/g)
  let start
  let end
  let cmd
  if (parts[0] === Cmd.toggle) {
    cmd = Cmd.toggle
    start = toPoint(parts[1])
    end = toPoint(parts[3])
  } else {
    start = toPoint(parts[2])
    end = toPoint(parts[4])
    cmd = (parts[1] === Cmd.on) ? Cmd.on : Cmd.off
  }

  return [cmd, start, end]
}

function tallyLightGrid (grid: LightGrid) {
  return Object.values(grid).reduce((a, b) => a + sum(b), 0)
}

// case-sensitive, to match input
enum Cmd {
  on = 'on',
  off = 'off',
  toggle = 'toggle'
}

type LightGrid = Array<number[]>

type Directive = [ Cmd, Point, Point ]
