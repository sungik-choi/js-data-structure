class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(data, index = 0) {
    const node = new Node(data);
    const current = this.head;
    if (index === 0) {
      this.head = node;
      if (current) this.head.next = current;
    } else {
      const prevNode = this.find(index - 1);
      if (!prevNode) return null;
      node.next = prevNode.next;
      prevNode.next = node;
    }
    this.length++;
    return node;
  }

  find(index) {
    if (index < 0 || index > this.length) return null;
    let current = this.head;
    let count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }
    return current;
  }

  remove(index) {
    const prevNode = this.find(index - 1);
    if (!prevNode) return null;
    prevNode.next = prevNode.next.next;
    this.length--;
  }
}

module.exports = LinkedList;
