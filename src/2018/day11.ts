/**
 * @module 2018_day11
 */

import { Point, toKey } from '../helpers/point'
import { modulo, sum } from '../helpers/util'

export function findTopLeftOfMostPowerfulSquare (serial: number,
                                                 width: number,
                                                 maxPower: number): [FuelCell, number] | null {
  // const powerGrid: Map<string, FuelCell> = grid || new Map()
  let currentMaxPower = maxPower
  let maxPoint: Point | null = null

  for (let y = 1; y < 300; y++) {
    XX:
    for (let x = 1; x < 300; x++) {
      const topLeft: Point = [x, y]
      const points: Point[] = []
      // build grid
      const maxY = y + width
      if (maxY > 300) continue

      for (let yy = y; yy < maxY; yy++) {
        const maxX = x + width
        if (maxX > 300) continue XX

        for (let xx = x; xx < maxX; xx++) points.push([xx, yy])
      }

      // points.stream().mapToInt(pt -> powerGrid.get(pt).getPower()).sum();
      const squarePower = sum(points.map(pt => {
        let cell = powerCell(pt, serial)
        return cell[2]
      }))
      if (squarePower > currentMaxPower) {
        currentMaxPower = squarePower
        maxPoint = topLeft
      }
    }
  }
  /*
        return Pair.of(powerGrid.get(maxPoint), maxPower);
  */
  if (maxPoint !== null) {
    const cell = powerCell(maxPoint, serial)
    if (cell) {
      // console.log(`ANSWER => `, [cell, currentMaxPower])
      return [cell, currentMaxPower]
    }
    throw new Error(`No Cell @ ${toKey(maxPoint)}`)
  }

  // throw new Error('No Max Point!')
  return null
}

export function findMostPowerfulSquareFromSerial (serial: number): [FuelCell, number] {
  let maxPower = 0
  let maxWidth = 0
  // const powerGrid: Map<string, FuelCell> = new Map()
  let maxPoint: Point | null = null

  for (let width = 2; width <= 16; width++) {
    const cell: [FuelCell, number] | null = findTopLeftOfMostPowerfulSquare(serial, width, maxPower)
    if (cell !== null && cell[1] > maxPower) {
      maxPower = cell[1]
      maxPoint = cell[0][0]
      maxWidth = width
    }
  }

  if (maxPoint !== null) {
    const cell: FuelCell = powerCell(maxPoint, serial) // powerGrid.get(toKey(maxPoint)) || powerCell(maxPoint, serial)
    return [cell, maxWidth]
  }

  throw new Error(`No MaxPoint for serial: ${serial}`)
  /*
        for (int width = 2; width <= lastWidth; width++) {
            if ((width % 10) == 0)
                debug("width = %d", width);

            final Pair<FuelCell, Integer> cell = findTopLeftOfMostPowerfulSquare(powerGrid, width, maxPower);
            if (cell != null && cell.getRight() > maxPower) {
                maxPower = cell.getRight();
                maxPoint = cell.getLeft().getPoint();
                maxWidth = width;
                debug("max=%s ~ %d ~ %d", maxPoint, maxPower, maxWidth);
            }
        }

        return Pair.of(powerGrid.get(maxPoint), maxWidth);
  */
}

export function powerCell (point: Point, serial: number): FuelCell {
  const rackId = point[0] + 10
  let power = rackId * point[1]
  power += serial
  power *= rackId
  // power = (power / 100) % 10
  power = modulo(Math.floor(power / 100), 10)
  return [ point, serial, power - 5 ]
}

//                      point  serial  power
export type FuelCell = [Point, number, number]
