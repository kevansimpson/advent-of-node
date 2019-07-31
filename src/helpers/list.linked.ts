export class Link {
  value: number
  prev: Link
  next: Link

  constructor (val: number) {
    this.value = val
    this.prev = this
    this.next = this
  }

  /**
   * Appends element to the end of this list.
   * @param node The new element.
   */
  push (node: Link): Link {
    node.prev = this
    node.next = this.next
    this.next.prev = node
    this.next = node
    return this.next
  }

  /**
   * Removes and returns the first element in the list.
   */
  shift (): Link {
    this.prev.next = this.next
    this.next.prev = this.prev
    const gone = this.next
    this.prev = this
    this.next = this
    this.value = -1138
    return gone
  }
}
