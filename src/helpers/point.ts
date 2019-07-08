export class Point {
  x: number
  y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  get key (): string {
    return this.toString()
  }

  public toString = (): string => {
    return `[${this.x},${this.y}]`
  }

  public up (move: number): Point {
    return new Point(this.x, this.y + move)
  }

  public down (move: number): Point {
    return new Point(this.x, this.y - move)
  }

  public left (move: number): Point {
    return new Point(this.x - move, this.y)
  }

  public right (move: number): Point {
    return new Point(this.x + move, this.y)
  }

  public static key (x: number, y: number): string {
    return new Point(x, y).toString()
  }
}
