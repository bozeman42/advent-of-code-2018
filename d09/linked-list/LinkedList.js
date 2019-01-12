const LinkedListNode = require('./LinkedListNode')

class LinkedList {
  constructor() {
    this.currentNode = null
    this.count = 0
  }

  read() {
    return this.currentNode.data
  }

  insert(data) {
    this.count++
    const node = new LinkedListNode(data)
    if (this.currentNode === null) {
      this.currentNode = node
      this.currentNode.next = this.currentNode
      this.currentNode.prev = this.currentNode
    } else {
      node.next = this.currentNode.next
      this.currentNode.next.prev = node
      node.prev = this.currentNode
      this.currentNode = node
      this.currentNode.prev.next = this.currentNode
    }
    return this
  }

  next (n = 1) {
    for(let i = 0; i < n; i++) {
      this.currentNode = this.currentNode.next
    }
    return this
  }

  prev (n = 1) {
    for(let i = 0; i < n; i++) {
      this.currentNode = this.currentNode.prev
    }
    return this
  }

  delete() {
    if (this.count > 1) {
      this.currentNode.next.prev = this.currentNode.prev
      this.currentNode.prev.next = this.currentNode.next
      this.currentNode = this.currentNode.next
      this.count--
    } else if (this.count === 1) {
      this.currentNode = null
      this.count = 0
    }
    return this
  }
}

module.exports = LinkedList