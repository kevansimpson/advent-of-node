/**
 * @module 2024_day07
 */

export type RopeBridge = {
  calibration: number,
  concatenation: number
}

type Operation = ((a: number, b: number) => number)


const ADD_MULTIPLY: Operation[] = [(a: number, b: number) => a + b, (a: number, b: number) => a * b]
const WITH_CONCAT: Operation[] = [...ADD_MULTIPLY, (a: number, b: number) => Number(`${a}${b}`)]

export function solve (input: string[]): RopeBridge {
  let calibration = 0
  let concatenation = 0
  input.forEach( equation => {
    const values = Array.from(equation.matchAll(/(\d+)/g)).map(n => Number(n[0]))
    if (canBeCalibrated(values, ADD_MULTIPLY))
      calibration += values[0]
    else if (canBeCalibrated(values, WITH_CONCAT))
      concatenation += values[0]
  })
  concatenation += calibration
  return ({ calibration: calibration, concatenation: concatenation })
}

function canBeCalibrated(values: number[], operations: Operation[]): boolean {
  for (let i = 0; i < operations.length; i++) {
    if (isCalibrated(values, 0, 1, i, operations))
      return true
  }

  return false
}

function isCalibrated(values: number[], sum: number, index: number, op: number,
                         operations: Operation[]): boolean {
  if (sum == values[0] && index == values.length)
    return true
  else if (index < values.length) {
    for (let i = 0; i < operations.length; i++) {
      if (isCalibrated(values, operations[op](sum, values[index]), index + 1, i, operations))
        return true
    }
  }

  return false
}
