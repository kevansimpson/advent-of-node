/**
 * @module 2015_day01
 */

export function findFloor (instructions: string): number {
  const total = instructions.length
  instructions = instructions.replace(/\(/g, '')
  const down = instructions.length
  const up = total - down
  instructions = instructions.replace(/\)/g, '')
  return (up - down - instructions.length)
}

export function firstEntersBasement (instructions: string): number {
  let floor = 0
  let pos = 0
  for (let ch of instructions.split('')) {
    pos++
    switch (ch) {
      case ')':
        --floor
        break
      case '(':
        ++floor
        break
    }
    if (floor === -1) break
  }

  return pos
}
