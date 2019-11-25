/**
 * @module 2015_day07
 */

export function signalA (directions: string[]): number {
  return buildCircuitMap(directions).calculate('a')
}

export function overrideSignalB (directions: string[]): number {
  const cmap = buildCircuitMap(directions)
  // override wire 'b'
  cmap.valueMap = { 'b': 46065 }
  return cmap.calculate('a')
}

export function buildCircuitMap (directions: string[]): CircuitMap {
  const cmap: CircuitMap = new CircuitMap()
  for (const dir of directions) {
    const keyval = dir.split(/\s->\s/g)
    cmap.circuits[keyval[1]] = keyval[0].split(/\s/g)
  }
  return cmap
}

class CircuitMap {
  circuits: { [key: string]: string[] } = {}
  valueMap: SignalMap = {}

  calculate (wire: string): number {
    const logic: string[] = this.circuits[wire]
    if (!this.valueMap[wire]) {
      if (!logic) {
        return +wire
      } else {
        switch (logic.length) {
          case 1: // literal value OR undocumented variable
            const val = +logic[0]
            if (Number.isNaN(val)) this.valueMap[wire] = this.calculate(logic[0])
            else this.valueMap[wire] = val
            break
          case 2: // bitwise complement, the ~ operator is NOT appropriate
            if ('NOT' === logic[0]) this.valueMap[wire] = (65535 - this.calculate(logic[1]))
            break
          case 3: // equation
            switch (logic[1]) {
              case 'AND':
                const val2 = +logic[2]
                const val0 = this.calculate(logic[0])
                if (Number.isNaN(val2)) {
                  this.valueMap[wire] = val0 & this.calculate(logic[2])
                } else {
                  this.valueMap[wire] = val0 & val2
                }
                break
              case 'OR':
                this.valueMap[wire] = this.calculate(logic[0]) | this.calculate(logic[2])
                break
              case 'LSHIFT':
                this.valueMap[wire] = this.calculate(logic[0]) << +logic[2]
                break
              case 'RSHIFT':
                this.valueMap[wire] = this.calculate(logic[0]) >>> +logic[2]
                break
            }
        }

      }
    }

    return this.valueMap[wire]
  }
}

type SignalMap = { [key: string]: number }
