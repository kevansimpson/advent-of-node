/**
 * @module 2015_day04
 */
import crypto from 'crypto'

export function mineCoins (secretKey: string, targetPrefix: string): number {
  let index = 1
  for (; index < Number.MAX_VALUE; index += 1) {
      const result = convertToMD5ThenHex(`${secretKey}${index}`)
      if (result && result.startsWith(targetPrefix)) return index
  }

  return -1
}

function convertToMD5ThenHex (text: string): string {
  return crypto.createHash('md5').update(text).digest("hex")
}