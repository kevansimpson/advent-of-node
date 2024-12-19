/**
 * @module helpers
 */
import * as fs from 'fs'

const endOfLine = require('os').EOL

/**
 * Reads input into Array<string>
 * @param file The input file
 */
export function readLines (file: string): string[] {
  return readString(file).split(endOfLine)
}

/**
 * Reads input into Array<number>
 * @param file The input file
 */
export function readNumbers (file: string): number[] {
  return readLines(file).map((str: string) => +str)
}

/**
 * Reads input into string
 * @param file The input file
 */
export function readString (file: string): string {
  return fs.readFileSync(file).toString()
}

/**
 * Reads space-delimited numeric input into Array<number>
 * @param file The input file
 */
export function splitNumbers (file: string): number[] {
  return readString(file).split(/\s+/g).map(str => +str)
}

/**
 * Splits list of strings into sublists by blank line separators.
 * @param input The list of strings
 */
export function splitByBlankLine(input: string[]): string[][] {
  const indexes = [-1]
  for (let i = 0; i < input.length; i++)
    if (input[i].length === 0)
      indexes.push(i)
  indexes.push(input.length)

  const result: string[][] = []
  for (let i = 0; i < indexes.length - 1; i++)
    result.push(input.slice(indexes[i] + 1, indexes[i + 1]))
  return result
}