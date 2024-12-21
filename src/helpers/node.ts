export class Node<T> {
    public data?: T
    public parent?: Node<T>
    public depth: number = 0
    public children: Node<T>[] = []

    constructor(d: number, content?: T, p?: Node<T>) {
        this.data = content
        this.parent = p
        this.depth = d
    }

    public addChild(newData?: T) {
        const child = new Node(this.depth + 1, newData, this)
        this.children.push(child)
        return child
    }

    public toString(): string {
        return `Node[${this.data} @ ${this.depth} w/ ${this.children.length} kids]`
    }
}

export function createRootNode<T>(data?: T): Node<T> {
    return new Node(1, data)
}
