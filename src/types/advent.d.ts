// primary Advent types

export type Answer = string | number

export type Input = Answer | number[] | string[]

export type Solution = (input: Input) => Answer

// low, high [inclusive]
export type Range = [ number, number ]
