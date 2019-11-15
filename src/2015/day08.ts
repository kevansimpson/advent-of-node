/**
 * @module 2015_day08
 */

export function totalCharacters(directions: string[]): number {
  let inMemory = 0
  for (let line of directions) {
    line = line.trim().substring(1).slice(0, -1)
    inMemory += 2
    inMemory += computeInMemory(line)
  }

  return inMemory
}

export function totalEncryptedCharacters(directions: string[]): number {
  let encrypted = 0
  for (let line of directions) {
    line = line.trim().substring(1)
    line.slice(0, -1)
    encrypted += 4 // escape surrounding quotes
    encrypted += computeEncrypted(line)
  }

  return encrypted
}

function computeInMemory(line: string): number {
  const chars = line.split('')
  let count = 0
  let flag = 0

  for (const ch of chars) {
    switch (ch) {
      case '\\':
        if (flag === 1) {
          count += 1    // don't dbl count
          flag = 0    // reset flag
        } else flag = 1
        break
      case '"':

        if (flag === 1) {
          count += 1    // don't dbl count
        }
        flag = 0    // reset flag
        break
      case 'x':
        flag = (flag === 1) ? 2 : 0
        break
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case 'a':
      case 'b':
      case 'c':
      case 'd':
      case 'e':
      case 'f':
        switch (flag) {
          case 3: {    // found escaped hex
            count += 3
            flag = 0    // reset flag
            break
          }
          case 2:
            flag = 3
            break
          default:
            flag = 0    // reset flag
        }
        break
      default:
    }
  }

  return count
}

function computeEncrypted(line: string): number {
  const chars = line.split('')
  let count = 0
  let flag = 0

  for (const ch of chars) {
    switch (ch) {
      case '\\':
        if (flag == 1) {
          count += 2    // escape
          flag = 0    // reset flag
        } else
          flag = 1
        break
      case '"':
        if (flag == 1) {
          count += 2    // escape
        }
        flag = 0    // reset flag
        break
      case 'x':
        flag = flag == 1 ? 2 : 0
        break
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case 'a':
      case 'b':
      case 'c':
      case 'd':
      case 'e':
      case 'f':
        switch (flag) {
          case 3: {    // found escaped hex
            count += 1
            flag = 0    // reset flag
            break
          }
          case 2:
            flag = 3
            break
          default:
            flag = 0    // reset flag
        }
        break
      default:
    }
  }

  return count
}
