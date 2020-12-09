class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  findNode(key) {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current.key === key) return current;
      current = current.next;
    }
    return null;
  }

  findPrevNode(key) {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current.next && current.next.key === key) return current;
      current = current.next;
    }
    return null;
  }

  findLastNode() {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current.next === null) return current;
      current = current.next;
    }
    return null;
  }
}

class HashMap {
  constructor(length) {
    this.map = Array(length)
      .fill(null)
      .map(() => new LinkedList());
  }

  static hash(key) {
    return [...key].reduce((code, k) => (code += k.charCodeAt()), "");
  }

  size() {
    return this.map.length;
  }

  convertToIndex(hash) {
    return hash % this.size();
  }

  clear() {
    this.map = Array(length)
      .fill(null)
      .map(() => new LinkedList());
    return this.map;
  }

  containsKey(key) {
    const index = this.convertToIndex(HashMap.hash(key));
    const targetNode = this.map[index].findNode(key);
    return !!targetNode;
  }

  get(key) {
    const index = this.convertToIndex(HashMap.hash(key));
    const targetNode = this.map[index].findNode(key);
    return targetNode && targetNode.value;
  }

  isEmpty() {
    return this.size() === 0;
  }

  keys() {
    return this.map.reduce((keys, cur) => {
      if (cur.head === null) return keys;
      let current = cur.head;
      keys.push(current.key);
      while (current.next !== null) {
        current = current.next;
        keys.push(current.key);
      }
      return keys;
    }, []);
  }

  put(key, value) {
    const index = this.convertToIndex(HashMap.hash(key));
    const list = this.map[index];
    if (list.length === 0) {
      list.head = new Node(key, value);
      list.length++;
      return list;
    }
    const node = this.map[index].findNode(key);
    if (node === null) {
      list.findLastNode().next = new Node(key, value);
      list.length++;
    } else node.value = value;
    return list;
  }

  remove(key) {
    const index = this.convertToIndex(HashMap.hash(key));
    const list = this.map[index];
    if (list.head && list.head.key === key) {
      list.head = list.head.next;
      list.length--;
      return list;
    }
    const prevNode = list.findPrevNode(key);
    if (prevNode && prevNode.next !== null) {
      prevNode.next = prevNode.next.next;
      list.length--;
      return list;
    }
    return null;
  }

  replace(key, value) {
    const index = this.convertToIndex(HashMap.hash(key));
    const targetNode = this.map[index].findNode(key);
    if (targetNode) targetNode.value = value;
    return targetNode;
  }
}
