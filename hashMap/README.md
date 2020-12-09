# 해시맵 구현

중복된 값 입력 처리를 위해 내부에 단일 연결 리스트를 가진 해시맵을 구현했다.

## 코드

```js
// 연결 리스트의 노드. 키와 밸류를 가진다.
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

// 연결 리스트. 노드를 찾거나, 찾고자 하는 노드의 직전 노드를 찾거나, 마지막 노드를 찾는다.
// 찾지 못할 경우 모두 Null을 반환한다.
class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // key를 인자로 받아 노드를 찾는다.
  // 없을 경우 null을 반환한다.
  findNode(key) {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current.key === key) return current;
      current = current.next;
    }
    return null;
  }

  // key를 인자로 받아 찾고자 하는 노드의 직전 노드를 찾는다.
  // 없을 경우 null을 반환한다.
  findPrevNode(key) {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current.next && current.next.key === key) return current;
      current = current.next;
    }
    return null;
  }

  // key를 인자로 받아 리스트의 가장 마지막 노드를 찾는다.
  // 없을 경우 null을 반환한다.
  findLastNode() {
    let current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (current.next === null) return current;
      current = current.next;
    }
    return null;
  }
}

// 해시맵
class HashMap {
  constructor(length) {
    // fill(new LinkedList()) 식으로 사용하면 같은 참조를 모두 공유하게 된다.
    // fill(null) 이후 map 메서드 사용으로 각기 다른 인스턴스를 생성하고 참조하도록 해준다.
    this.map = Array(length)
      .fill(null)
      .map(() => new LinkedList());
  }

  // 문자열 키를 인자로 받아, 각 문자를 아스키 코드로 변환 후 더하는 해시 함수.
  static hash(key) {
    return [...key].reduce((code, k) => (code += k.charCodeAt()), "");
  }

  // 전체 해시맵의 사이즈를 반환한다.
  size() {
    return this.map.length;
  }

  // 해시값을 해시맵의 사이즈에 맞게 인덱스로 변경해 분배한다.
  convertToIndex(hash) {
    return hash % this.size();
  }

  // 전체 해시맵을 초기화한다.
  clear() {
    this.map = Array(length)
      .fill(null)
      .map(() => new LinkedList());
    return this.map;
  }

  // 해당 키가 존재하는지 검사하고 Boolean을 반환한다.
  containsKey(key) {
    const index = this.convertToIndex(HashMap.hash(key));
    const targetNode = this.map[index].findNode(key);
    return !!targetNode;
  }

  // 해당 키와 매치되는 값을 찾는다.
  get(key) {
    const index = this.convertToIndex(HashMap.hash(key));
    const targetNode = this.map[index].findNode(key);
    return targetNode && targetNode.value;
  }

  // 비어있는 맵인지 확인한다.
  isEmpty() {
    return this.size() === 0;
  }

  // 전체 키 목록을 String 배열로 반환한다.
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

  // 키-값을 추가한다. 중복될 경우 값을 덮어쓴다.
  // 해당 연결 리스트를 반환한다.
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

  // 해당 키에 해당하는 노드를 삭제한다. 
  // 해당 연결 리스트를 반환하고, 존재하지 않는 키일 경우 null을 반환한다.
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

  // 키-값으로 기존 값을 대체한다.
  // 키가 없을 경우 null을 반환한다.
  replace(key, value) {
    const index = this.convertToIndex(HashMap.hash(key));
    const targetNode = this.map[index].findNode(key);
    if (targetNode) targetNode.value = value;
    return targetNode;
  }
}
```
