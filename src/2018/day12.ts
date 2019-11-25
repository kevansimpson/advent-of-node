/**
 * @module 2018_day12
 */

/**
 * Calling python script because after my Java solution, my Typescript solution,
 * two other posters' Typescript solution... all failed.
 *
 * This was literally the only thing that works...
 *
 * @param generations Cycles to run
 */
export function sumGrowth (generations: number, inputFile?: string): number {
  const { execSync } = require('child_process')
  const param: string = (inputFile) ? ` ${inputFile}` : ''
  const output: string = execSync(`python3 ./src/2018/day12.py ${generations}${param}`)
  return +output
}
