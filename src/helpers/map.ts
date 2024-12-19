import { Point, toKey } from "./point";

type Entry<K, V> = [K, V]

class MapWithKeyEquality<K, V> {
    private map: Map<string, Entry<K, V>> = new Map();
    private getKey: (item: K) => string;
    public size: number

    constructor(getKey: (item: K) => string) {
        this.getKey = getKey;
        this.size = 0
    }

    get(key: K): V | undefined {
        return this.has(key) ? this.map.get(this.getKey(key))![1] : undefined
    }

    set(key: K, value: V): void {
        const str = this.getKey(key);
        this.map.set(str, [key, value]);
        this.size = this.map.size
    }

    has(key: K): boolean {
        return this.map.has(this.getKey(key));
    }

    entries(): [K, V][] {
        return [...this.map.values()];
    }

    keys(): K[] {
        return [...this.map.values()].map(e => e[0]);
    }

    values(): V[] {
        return [...this.map.values()].map(e => e[1]);
    }

    delete(key: K): boolean {
        return this.map.delete(this.getKey(key))
    }

    clear() {
        this.map.clear()
        this.size = 0
    }

    forEach(fxn: (value: V, key: K, map: Map<string, Entry<K, V>>) => void) {
        this.map.forEach((v, _, m) => fxn(v[1], v[0], m))
    }

    public toString = () : string => {
        return `[${Array.from(this.entries()).map(kv => `[${this.getKey(kv[0])},${kv[1]}]`).join(',')}]`
    }
}

export class PointMap<V> extends MapWithKeyEquality<Point, V> {
    constructor() {
        super((pt) => toKey(pt))
    }
}