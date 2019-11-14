/**
 * @module 2015_day06
 */
import { toPoint, key, Point } from '../helpers/point'

export function countLightsOn (directions: string[]): number {
  const lightGrid: LightGrid = {}

  for (const directive of directions) {
    const [cmd, start, end] = readDirective(directive)
    for (let x = start[0]; x <= end[0]; x++) {
      for (let y = start[1]; y <= end[1]; y++) {
        const xy = key(x, y)
        switch (cmd) {
          case Cmd.on:
            lightGrid[xy] = 1
            break
          case Cmd.off:
            lightGrid[xy] = 0
            break
          case Cmd.toggle:
            lightGrid[xy] = lightGrid[xy] === 1 ? 0 : 1
            break
        }
      }
    }
  }

  return tallyLightGrid(lightGrid)
}

export function totalBrightness (directions: string[]): number {
  const lightGrid: LightGrid = {}

  for (const directive of directions) {
    const [cmd, start, end] = readDirective(directive)
    for (let x = start[0]; x <= end[0]; x++) {
      for (let y = start[1]; y <= end[1]; y++) {
        const xy = key(x, y)
        const val = lightGrid[xy] || 0
        switch (cmd) {
          case Cmd.on:
            lightGrid[xy] = val + 1
            break
          case Cmd.off:
            if (val > 0) lightGrid[xy] = val - 1
            break
          case Cmd.toggle:
            lightGrid[xy] = val + 2
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
  return Object.values(grid).reduce((a, b) => a + b, 0)
}

// case-sensitive, to match input
enum Cmd {
  on = 'on',
  off = 'off',
  toggle = 'toggle'
}
type LightGrid = { [pt: string]: number }

type Directive = [ Cmd, Point, Point ]
