/**
 * @module 2024_day03
 */

export type MulProducts = {
    all: number,
    enabled: number
}

const MUL_REGEX = /mul\((\d+),(\d+)\)/g
const DO_OR_DO_NOT_REGEX = /do\(\)|don't\(\)/g

export function solve (input: string): MulProducts {
  let all = 0
  let enabled = 0
  let doMul = true
  let index = 0
  
  let result
  while (result = MUL_REGEX.exec(input)) {
    const matches = Array.from(input.substring(index, result.index).matchAll(DO_OR_DO_NOT_REGEX))
    if (matches.length > 0) {
      matches.map(e => e[0]).forEach(element => {
        if (element === "do()")
          doMul = true
        else if (element === "don't()")
          doMul = false
      });
    }
  
    const mul = Number(result[1]) * Number(result[2])
    all += mul
    if (doMul)
      enabled += mul

    index = result.index
  }

  return ({ all: all, enabled: enabled })
}
