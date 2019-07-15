import * as fs from 'fs'

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

export function readNumbers (file: string, cb: (lines: number[]) => void): void {
  readLines(file, (lines: string[]) => {
    cb(lines.map((str: string) => +str))
  })
}

export function readString (file: string, cb: (input: string) => void): void {
  fs.readFile(file, (err: Error | null, input: Buffer) => {
    if (err) throw err
    cb(input.toString('utf-8'))
  })
}
