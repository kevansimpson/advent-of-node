/**
 * @module helpers
 */
import * as fs from 'fs'

/**
 * Reads input into Array<string> and provides to specified callback
 * @param file The input file
 * @param cb The specified callback
 */
export function readLines (file: string, cb: (lines: string[]) => void): void {
  const data: string[] = []
  const readline = require('readline')
  readline.createInterface({
    input: fs.createReadStream(file),
    terminal: false
  }).on('line', function (line: string) {
    data.push(line)
  }).on('close', function () {
    cb(data)
  })
}

/**
 * Reads input into Array<number> and provides to specified callback
 * @param file The input file
 * @param cb The specified callback
 */
export function readNumbers (file: string, cb: (lines: number[]) => void): void {
  readLines(file, (lines: string[]) => {
    cb(lines.map((str: string) => +str))
  })
}

/**
 * Reads input into string and provides to specified callback
 * @param file The input file
 * @param cb The specified callback
 */
export function readString (file: string, cb: (input: string) => void): void {
  fs.readFile(file, (err: Error | null, input: Buffer) => {
    if (err) throw err
    cb(input.toString('utf-8'))
  })
}

/**
 * Reads space-delimited numeric input into Array<number> and provides to specified callback
 * @param file The input file
 * @param cb The specified callback
 */
export function splitNumbers (file: string, cb: (input: number[]) => void): void {
  readString(file, (input: string) => {
    cb(input.split(/\s+/g).map(str => +str))
  })
}
