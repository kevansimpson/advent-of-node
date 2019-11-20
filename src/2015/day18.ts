/**
 * @module 2015_day18
 */
import { array2D } from '../helpers/util'

export class ConwaysGame {
  lightGrid: boolean[][] = []
  brokenCorners: boolean

  constructor (input: string[], broken: boolean = false) {
    this.brokenCorners = broken
    this.lightGrid.push(new Array<boolean>(input.length + 2).fill(false)) // top border
    input.forEach(line => this.lightGrid.push(`.${line}.`.split('').map(ch => ch === '#')))
    this.lightGrid.push(new Array<boolean>(input.length + 2).fill(false)) // bottom border
  }

  play (steps: number): number {
    if (this.brokenCorners) this.breakCornerLights()

    for (let i = 0; i < steps; i++) this.click()

    return this.countLights()
  }

  breakCornerLights() {
    const size = this.lightGrid.length
    this.lightGrid[1][1] = true
    this.lightGrid[1][size - 2] = true
    this.lightGrid[size - 2][1] = true
    this.lightGrid[size - 2][size - 2] = true
  }

  click () {
    const size = this.lightGrid.length
    const next: boolean[][] = array2D(size, false)

    for (let i = 1; i <= size - 2; i++) {
      for (let j = 1; j <= size - 2; j++) {
        const isOn = this.lightGrid[i][j]
        const neighborsOn = this.countNeighbors(i, j)
        next[i][j] = (isOn) ? neighborsOn === 2 || neighborsOn === 3 : neighborsOn === 3
      }
    }

    this.lightGrid = next
    if (this.brokenCorners) this.breakCornerLights()
  }

  countLights (): number {
    let on = 0
    for (let i = 1; i <= this.lightGrid.length - 2; i++) {
      for (let j = 1; j <= this.lightGrid.length - 2; j++) if (this.lightGrid[i][j]) on += 1
    }

    return on
  }

  countNeighbors(i: number, j: number) {
    let on = 0
    if (this.lightGrid[i - 1][j - 1]) on += 1
    if (this.lightGrid[i][j - 1]) on += 1
    if (this.lightGrid[i + 1][j - 1]) on += 1
    if (this.lightGrid[i - 1][j]) on += 1
    if (this.lightGrid[i + 1][j]) on += 1
    if (this.lightGrid[i - 1][j + 1]) on += 1
    if (this.lightGrid[i][j + 1]) on += 1
    if (this.lightGrid[i + 1][j + 1]) on += 1
    return on
  }

  displayGrid () {
    for (let i = 1; i <= this.lightGrid.length - 2; i++) {
      let line = ''
      for (let j = 1; j <= this.lightGrid.length - 2; j++) line += (this.lightGrid[i][j]) ? "#" : "."
      console.log(line)
    }
  }
}