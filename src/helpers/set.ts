import { Point, toKey } from "./point";

/**
 * <a href="https://howtodoinjava.com/typescript/sets/">Reference</a>
 */
export class SetWithContentEquality<T> {
    private items: Map<string, T> = new Map();
    private getKey: (item: T) => string;
    public size: number

    constructor(getKey: (item: T) => string) {
        this.getKey = getKey;
        this.size = 0
    }

    add(item: T): void {
        const key = this.getKey(item);
        if (!this.items.has(key)) {
            this.items.set(key, item);
            this.size++
        }
    }

    has(item: T): boolean {
        return this.items.has(this.getKey(item));
    }

    values(): T[] {
        return [...this.items.values()];
    }

    delete(item: T): boolean {
        return this.items.delete(this.getKey(item))
    }

    clear() {
        this.items.clear()
        this.size = 0
    }

    forEach(fxn: (value: T, key: string, map: Map<string, T>) => void) {
        this.items.forEach((v, k, m) => fxn(v, k, m))
    }

    public toString = () : string => {
        return `[${Array.from(this.items.keys()).toString()}]`
    }
}

export class PointSet extends SetWithContentEquality<Point> {
    constructor() {
        super((pt) => toKey(pt))
    }
}