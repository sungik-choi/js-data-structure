const LinkedList = require("./singly");

test("find linked list", () => {
  const list = new LinkedList();
  list.add(2);
  list.add(5);
  expect(list.find(1)).toEqual({ data: 2, next: null });
});

test("add linked list", () => {
  const list = new LinkedList();
  list.add(2);
  list.add(5);
  expect(list).toEqual({
    head: { data: 5, next: { data: 2, next: null } },
    length: 2,
  });
});

test("remove linked list", () => {
  const list = new LinkedList();
  list.add(2);
  list.add(5);
  list.remove(1);
  expect(list).toEqual({ head: { data: 5, next: null }, length: 1 });
});
