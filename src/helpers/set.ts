import { Point, toKey } from "./point";

/**
 * <a href="https://howtodoinjava.com/typescript/sets/">Reference</a>
 */
class SetWithContentEquality<T> {
    private items: T[] = [];
    private getKey: (item: T) => string;
    public size: number

    constructor(getKey: (item: T) => string) {
        this.getKey = getKey;
        this.size = 0
    }

    add(item: T): void {
        const key = this.getKey(item);
        if (!this.items.some(existing => this.getKey(existing) === key)) {
            this.items.push(item);
            this.size++
        }
    }

    has(item: T): boolean {
        return this.items.some(existing => this.getKey(existing) === this.getKey(item));
    }

    values(): T[] {
        return [...this.items];
    }

    delete(item: T): boolean {
        const index = this.items.findIndex((element) => this.getKey(item) === this.getKey(element))
        if (index >= 0) {
            this.items.splice(index, 1)
            this.size--
            return true
        }
        return false
    }

    clear() {
        this.items.length = 0
        this.size = 0
    }

    forEach(fxn: (element: T, index: number, array: T[]) => void) {
        this.items.forEach((e, i, a) => fxn(e, i, a))
    }
}

export class PointSet extends SetWithContentEquality<Point> {
    constructor() {
        super((pt) => toKey(pt))
    }
}