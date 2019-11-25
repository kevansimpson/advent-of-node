/**
 * @module 2015_day12
 */

export function sumDocument (input: string, excluded: string[] = []): number {
  return sumObject(JSON.parse(input), excluded)
}

function sumArray (array: any[], excluded: string[] = []): number {
  return array.reduce((total, value) => total + sumObject(value, excluded), 0)
}

function sumObject (obj: any, excluded: string[] = []): number {
  if (Array.isArray(obj)) {
    return sumArray(obj, excluded)
  } else {
    switch (typeof obj) {
      case 'object':
        let sum = 0
        for (const key of Object.keys(obj)) {
          if (excluded.indexOf(obj[key]) >= 0) return 0
          else sum += sumObject(obj[key], excluded)
        }
        return sum
      case 'number': return obj
      case 'string': return +obj || 0
    }
  }
  throw new Error(`sumObject => ${JSON.stringify(obj)}`)
}
