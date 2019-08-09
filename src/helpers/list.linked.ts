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

  jump (distance: number): Link {
    let link: Link = this
    if (distance > 0) {         // right
      for (let d = 0; d < distance; d++) {
        link = link.next
      }
    } else if (distance < 0) {  // left
      for (let d = distance; d < 0; d++) {
        link = link.prev
      }
    }
    return link
  }
}
