/**
 * @module 2024_day13
 */

import { Point } from "../helpers/point"
import { extractNumbers } from '../helpers/util'

export function solve (input: string[]): [number, number] {
  let near = 0
  let far = 0
  installMachines(input).forEach(m => {
    near += playCramersRule(m)
    far += playCramersRule(m.further())
  })

  return [near, far]
}


/**
 * <a href="https://www.youtube.com/watch?v=KOUjAzDyeZY">Cramer's Rule</a>
 * <ul>
 *     <li><pre>Determinant   (D)  =      (a.y * b.x) - (b.y * a.x)</pre></li>
 *     <li><pre>Determinant A (Da) = (target.y * b.x) - (b.y * target.x)</pre></li>
 *     <li><pre>Determinant B (Db) = (a.y * target.x) - (target.y * a.x)</pre></li>
 *     <li><pre>a = Da / D where Da % D == 0</pre></li>
 *     <li><pre>b = Db / D where Db % D == 0</pre></li>
 * </ul>
 */
function playCramersRule(m: Machine): number {
  const determinant = (m.btnA[1] * m.btnB[0]) - (m.btnB[1] * m.btnA[0])
  const detA = (m.target[1] * m.btnB[0]) - (m.btnB[1] * m.target[0])
  const detB = (m.btnA[1] * m.target[0]) - (m.target[1] * m.btnA[0])
  if ((detA % determinant) === 0 && (detB % determinant) === 0 )
    return 3 * (detA / determinant) + (detB / determinant)
  else
    return 0
}

function installMachines(input: string[]) {
  const machines = []
  for (let i = 0; i < input.length; i += 4) {
    const a = extractNumbers(input[i])
    const b = extractNumbers(input[i + 1])
    const t = extractNumbers(input[i + 2])
    machines.push(new Machine([a[0], a[1]], [b[0], b[1]], [t[0], t[1]]))
  }

  return machines
}

class Machine {
  public btnA: Point
  public btnB: Point
  public target: Point

  constructor(a: Point, b: Point, t: Point) {
    this.btnA = a
    this.btnB = b
    this.target = t
  }

  public further(): Machine {
    return new Machine(this.btnA, this.btnB, [this.target[0] + 10000000000000, this.target[1] + 10000000000000])
  }
}