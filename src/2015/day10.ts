/**
 * @module 2015_day10
 */

export function lookAndStutter (input: string, count: number): string {
  for (let i = 0; i < count; i++) {
    input = lookAndSay(input)
  }
  return input
}

export function lookAndSay (input: string): string {
  let count = 0
  let digit = input.charAt(0)
  let bldr = ''

  for (const ch of input.split('')) {
    if (digit === ch) {
      count += 1
    } else {
      bldr += `${count}${digit}`
      digit = ch
      count = 1
    }
  }

  bldr += `${count}${digit}`
  return bldr
}
