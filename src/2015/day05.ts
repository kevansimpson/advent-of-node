/**
 * @module 2015_day05
 */

export function countNiceStrings (input: string[]): number {
  return input
    .filter(str => countMatches(str, VOWELS) >= 3)
    .filter(str => countMatches(str, DOUBLE_LETTERS) >= 1)
    .filter(str => countMatches(str, BAD_STRINGS) <= 0).length
}

export function countNicerStrings (input: string[]): number {
  return input
    .filter(str => countMatches(str, NON_OVERLAPPING_LETTER_PAIRS) >= 1)
    .filter(str => countMatches(str, SANDWICH_LETTERS) >= 1).length
}

const VOWELS = /[aeiou]/g
const DOUBLE_LETTERS = /([a-z])\1+/g
const BAD_STRINGS = /(ab|cd|pq|xy)/g
const NON_OVERLAPPING_LETTER_PAIRS = /([a-z]{2}).*\1+/g
const SANDWICH_LETTERS = /([a-z]).\1+/g

function countMatches (str: string, regex: RegExp): number {
  const match: RegExpMatchArray | null = str.match(regex)
  return (match === null) ? 0 : match.length
}
