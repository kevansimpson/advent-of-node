import { Point, toKey } from "./point";

type Entry<K, V> = [K, V]

export class MapWithKeyEquality<K, V> {
    private map: Map<string, Entry<K, V>> = new Map();
    private getKey: (item: K) => string;
    public size: number

    constructor(getKey: (item: K) => string) {
        this.getKey = getKey;
        this.size = 0
    }

    public get(key: K): V | undefined {
        return this.has(key) ? this.map.get(this.getKey(key))![1] : undefined
    }

    public set(key: K, value: V): void {
        const str = this.getKey(key);
        this.map.set(str, [key, value]);
        this.size = this.map.size
    }

    public has(key: K): boolean {
        return this.map.has(this.getKey(key));
    }

    public entries(): [K, V][] {
        return [...this.map.values()];
    }

    public keys(): K[] {
        return [...this.map.values()].map(e => e[0]);
    }

    public values(): V[] {
        return [...this.map.values()].map(e => e[1]);
    }

    public delete(key: K): boolean {
        return this.map.delete(this.getKey(key))
    }

    public clear() {
        this.map.clear()
        this.size = 0
    }

    public forEach(fxn: (value: V, key: K, map: Map<string, Entry<K, V>>) => void) {
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