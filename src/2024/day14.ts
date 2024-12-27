/**
 * @module 2024_day14
 */

import { Point } from "../helpers/point"
import { PointSet } from "../helpers/set"
import { extractNumbers } from '../helpers/util'

export function solve(input: string[], width: number, height: number, debug?: boolean): [number, number] {
  const bots = findRobots(input)
  bots.forEach(bot => bot.move(100, width, height))

  return [safetyFactor(bots, width, height), findTree(bots, width, height, debug)]
}

function findTree(bots: Robot[], width: number, height: number, debug?: boolean): number {
  // start after the first 100 seconds + 0-index offset
  for (let s = 101; s < 100000; s++) {
    const image = new PointSet()
    const finalPositions: number[][] = []
    for (let v = 0; v < height; v++)
      finalPositions.push(new Array(width).fill(0))
  
    bots.forEach(b => {
      b.move(1, width, height)
      finalPositions[-b.position[1]][b.position[0]]++
      image.add([-b.position[1], b.position[0]])
    })

    if (image.size === bots.length) {
      if (debug)
        printTree(finalPositions)
      return s
    }
  }
  return -1
}

function printTree(positions: number[][]) {
  positions.forEach(row => console.log(row.toString().replaceAll(',', '').replaceAll('0', ' ')))
}

function safetyFactor(bots: Robot[], width: number, height: number): number {
  const midX = Math.floor(width / 2)
  const midY = Math.floor(height / 2)
  const quadrants = [0, 0, 0, 0]

  bots.forEach(b => {
    if (b.position[0] < midX) {
      if (b.position[1] > -midY)
          quadrants[0]++
      else if (b.position[1] < -midY)
          quadrants[1]++
    }
    else if (b.position[0] > midX) {
        if (b.position[1] > -midY)
            quadrants[2]++
        else if (b.position[1] < -midY)
            quadrants[3]++
    }
  })

  let safetyFactor = 1
  quadrants.forEach(q => safetyFactor *= q)
  return safetyFactor
}

function findRobots(input: string[]): Robot[] {
  const robots: Robot[] = []
  input.forEach(line => {
    const nums = extractNumbers(line)
    robots.push(new Robot([nums[0], -nums[1]], [nums[2], -nums[3]]))
  })

  return robots
}

class Robot {
  public position: Point
  public velocity: Point

  constructor(p: Point, v: Point) {
    this.position = p
    this.velocity = v
  }

  public move(seconds: number, width: number, height: number) {
    for (let s = 0; s < seconds; s++) {
      let newX = this.position[0] + this.velocity[0]
      let newY = this.position[1] + this.velocity[1]

      if (newX < 0) // out of bounds horizontally
        newX += width;
      else if (newX >= width) // out of bounds horizontally
        newX -= width;
  
      if (newY > 0) // out of bounds vertically
        newY -= height;
      else if (newY <= -height) // out of bounds vertically
        newY += height;

      this.position = [newX, newY]
    }
  }
}