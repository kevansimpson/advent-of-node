/**
 * @module 2015_day11
 */

export function nextValidPassword(input: string): string {
  let pswd = nextPassword(input)
  while (!isValidPassword(pswd)) pswd = nextPassword(pswd)

  return pswd
}

function nextPassword(input: string): string {
  const ltrs = input.split('')

  for (let i = ltrs.length - 1; i >= 0; i--) {
      const nextLtr = nextLetter(ltrs[i])
      ltrs[i] = nextLtr
      if (nextLtr !== 'a')
          break
  }

  return ltrs.join('')
}

function nextLetter(ltr: string): string {
  const next = (ltr === 'z') ? 'a' : String.fromCharCode((ltr.charCodeAt(0) + 1))
  switch (next) {
      case 'i':
          return 'j'
      case 'l':
          return 'm'
      case 'o':
          return 'p'
      default:
          return next
  }
}

function isValidPassword(pswd: string): boolean {
  return isAllowed(pswd) && hasNonOverlappingPairs(pswd) && hasSequence(pswd)
}

export function hasSequence(pswd: string): boolean {
  let count = 1
  let current = 0
  const letters = pswd.split('')
  for (const ch of letters) {
    if (ch.charCodeAt(0) === (current + 1)) {
      count += 1
      if (count >= 3) return true
    } else count = 1

    current = ch.charCodeAt(0)
  }

  return false
}

export function isAllowed(pswd: string): boolean {
  return (/^[^iol]+$/gi.test(pswd))
}

export function hasNonOverlappingPairs(pswd: string): boolean {
  return (`Q${pswd}Q`).split(/([a-z])\1/g).length >= 5
}
