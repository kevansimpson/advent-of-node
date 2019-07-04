// primary Advent types

export type Answer = string | number

export type Solution = (input: any) => Answer

// helper types

export type Point = {
  x: number,
  y: number
}