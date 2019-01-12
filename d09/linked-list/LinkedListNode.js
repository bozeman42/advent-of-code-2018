class LinkedListNode {
  constructor (data) {
    this.data = data
    this.next = null
    this.prev = null
  }

  setNext(node) {
    this.next = node
    return this
  }

  setPrev(node) {
    this.prev = node
    return this
  }
}

module.exports = LinkedListNode