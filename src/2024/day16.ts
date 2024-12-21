/**
 * @module 2024_day16
 */

import { MapWithKeyEquality } from "../helpers/map"
import { Node, createRootNode } from "../helpers/node"
import { Arrow, Point, manhattanDistance, move, samePoint, toKey, turnLeft, turnRight } from "../helpers/point"
import { PointSet } from "../helpers/set"
import { PriorityQueue } from "priority-queue-typescript"

export type ReindeerMaze = {
  steps: number,
  seats: number
}

export function solve(input: string[], debug?: boolean): ReindeerMaze {
  const maze = new Maze(input)
  const visited = new DirPointMap()
  const begin = new DirPoint('>', maze.start)
  visited.set(begin, 0)

  const paths = new PriorityQueue<ScoredPath>(1000000, (a: ScoredPath, b: ScoredPath) => {
    const da = manhattanDistance(maze.end, a.node.data!.pos)
    const db = manhattanDistance(maze.end, b.node.data!.pos)
    return db - da
  })
  paths.add(new ScoredPath(createRootNode(begin), 0))
  let minScore = Number.MAX_SAFE_INTEGER
  let solutions: Node<DirPoint>[] = []

  while (paths.size() > 0) {
    const path = paths.poll()!
    const node = path.node
    const data = node.data!
    const score = path.score
    // only proceed if not visited or this path has a lower score
    if (!visited.has(data) || score <= visited.get(data)! || score < minScore) {
      visited.set(data, score)

      if (samePoint(data.pos, maze.end)) {
        if (score < minScore) {
          minScore = score
          solutions = [node]
        }
        else if (score === minScore)
          solutions.push(node)
      }
      else {
        // move forward
        const forward = data.move()
        if (maze.get(forward.pos) != '#' && (!visited.has(forward) || score <= visited.get(forward)!))
          paths.add(new ScoredPath(node.addChild(forward), score + 1))

        const left = new DirPoint(turnLeft(data.dir), data.pos)
        if (canTurn(left, maze, visited, score))
          paths.add(new ScoredPath(node.addChild(left), score + 1000))
        const right = new DirPoint(turnRight(data.dir), data.pos)
        if (canTurn(right, maze, visited, score))
          paths.add(new ScoredPath(node.addChild(right), score + 1000))
      }
    }

  }
  if (debug)
    maze.displayPath(solutions[0])

  return { steps: minScore, seats: placesToSit(solutions) }
}

function canTurn(turn: DirPoint, maze: Maze, visited: DirPointMap, score: number): boolean {
  return maze.get(turn.move().pos) != '#' &&
    (!visited.has(turn) || score <= (visited.get(turn)!))
}

function placesToSit(solutions: Node<DirPoint>[]): number {
  const seats = new PointSet()
  solutions.forEach(n => {
    let node: Node<DirPoint> | undefined = n
    while (node) {
      seats.add(node.data!.pos)
      node = node.parent
    }
  })

  return seats.size
}

// function getSeats(node?: Node<DirPoint>): PointSet {
//   const seats = new PointSet()
//   while (node) {
//     seats.add(node.data!.pos)
//     node = node.parent
//   }
//   return seats
// }

class DirPoint {
  public dir: Arrow = '>'
  public pos: Point = [0,0]

  constructor(d: Arrow, p: Point) {
    this.dir = d
    this.pos = p
  }

  public move(): DirPoint {
    return new DirPoint(this.dir, move(this.pos, this.dir))
  }

  public toString(): string {
    return `DirPoint[dir=${this.dir}, pos=${toKey(this.pos)}]`
  }
}

class ScoredPath {
  public node: Node<DirPoint>
  public score: number

  constructor(n: Node<DirPoint>, s: number) {
    this.node = n
    this.score = s
  }

  public toString(): string {
    return `ScoredPath[node=${this.node}, score=${this.score}]`
  }
}

class DirPointMap extends MapWithKeyEquality<DirPoint, number> {
  constructor() {
      super((dp: DirPoint) => `${toKey(dp.pos)}-${dp.dir}`)
  }
}

class Maze {
  size: number
  grid: string[][]
  start: Point = [0,0]
  end: Point = [0,0]

  constructor(input: string[]) {
    this.size = input.length
    this.grid = new Array(this.size)
    for (let r = this.size - 1; r >= 0; r--) {
      const y = this.size - r - 1
      this.grid[y] = new Array(this.size)
      for (let c = 0; c < this.size; c++) {
        const at = input[r][c]
        this.grid[y][c] = at
        switch (at) {
          case 'S':
            this.start = [c, y]
            break
          case 'E':
            this.end = [c, y]
            break
          }
      }
    }

  }

  public get(pos: Point): string {
    return this.grid[pos[1]][pos[0]]
  }

  public displayPath(node: Node<DirPoint>) {
    let path: Node<DirPoint> | undefined = node
    while (path) {
      const pos = path.data!.pos
      this.grid[pos[1]][pos[0]] = path.data!.dir
      path = path.parent
    }

    console.log()
    for (let r = this.size - 1; r >= 0; r--)
      console.log(`${this.grid[r].toString().replaceAll(',', '').replaceAll('.', ' ')}`)
    console.log()
  }
}
