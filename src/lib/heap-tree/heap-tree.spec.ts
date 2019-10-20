// tslint:disable:no-expression-statement
import test from 'ava';
import { MaxHeapTree } from './max-heap-tree';
import { MinHeapTree } from './min-heap-tree';

test('min heap tree peeks minimum value', t => {
  const tree = new MinHeapTree<number>();

  t.is(tree.peek(), null);

  tree.add(1);
  t.is(tree.peek(), 1);

  tree.add(-5);
  t.is(tree.peek(), -5);

  tree.add(-1);
  t.is(tree.peek(), -5);

  tree.add(3);
  t.is(tree.peek(), -5);

  tree.add(-10);
  t.is(tree.peek(), -10);

  tree.add(10);
  t.is(tree.peek(), -10);
});

test('min heap tree polls minimum value', t => {
  const tree = new MinHeapTree<number>();

  t.is(tree.poll(), null);

  tree.add(1);
  tree.add(-5);
  tree.add(-1);
  tree.add(3);
  tree.add(3);
  tree.add(-10);
  tree.add(10);

  t.is(tree.poll(), -10);
  t.is(tree.poll(), -5);
  t.is(tree.poll(), -1);
  t.is(tree.poll(), 1);
  t.is(tree.poll(), 3);
  t.is(tree.poll(), 3);
  t.is(tree.poll(), 10);
  t.is(tree.poll(), null);
  t.is(tree.poll(), null);
});

test('max heap tree peeks minimum value', t => {
  const tree = new MaxHeapTree<number>();

  t.is(tree.peek(), null);

  tree.add(1);
  t.is(tree.peek(), 1);

  tree.add(-5);
  t.is(tree.peek(), 1);

  tree.add(-1);
  t.is(tree.peek(), 1);

  tree.add(3);
  t.is(tree.peek(), 3);

  tree.add(-10);
  t.is(tree.peek(), 3);

  tree.add(10);
  t.is(tree.peek(), 10);

  tree.add(9);
  t.is(tree.peek(), 10);
});

test('max heap tree polls minimum value', t => {
  const tree = new MaxHeapTree<number>();

  t.is(tree.poll(), null);

  const inserts = [1, -5, -1, 3, 3, -10, 10, 10, 10, 10, 9, 8];
  const polls = [10, 10, 10, 10, 9, 8, 3, 3, 1, -1, -5, -10];

  for (const insert of inserts) {
    tree.add(insert);
  }

  for (const poll of polls) {
    t.is(tree.poll(), poll);
  }

  t.is(tree.poll(), null);
  t.is(tree.poll(), null);
});

test('heap tree is empty', t => {
  const tree = new MaxHeapTree<number>();

  t.is(tree.isEmpty, true);

  tree.add(2);

  t.is(tree.isEmpty, false);

  tree.remove(2);

  t.is(tree.isEmpty, true);

  tree.add(3);
  tree.poll();

  t.is(tree.isEmpty, true);
});

test('heap tree remove', t => {
  const tree = new MinHeapTree<number>();

  tree.add(1);
  tree.remove(10);
  tree.add(10);
  tree.add(10);
  tree.add(10);
  tree.remove(10);
  t.is(tree.peek(), 1);

  tree.add(10);
  tree.add(1);
  tree.add(2);

  t.is(tree.peek(), 1);
  tree.remove(1);
  t.is(tree.peek(), 2);

  tree.add(-3);
  tree.add(-3);

  t.is(tree.peek(), -3);
  tree.remove(-3);
  t.is(tree.peek(), 2);

  tree.remove(2);
  t.is(tree.peek(), 10);

  tree.remove(10);
  t.is(tree.peek(), null);

  tree.remove(5);
  t.is(tree.peek(), null);
});

test('heap tree remove (test cases)', t => {
  const tree = new MaxHeapTree<number>();

  t.is(tree.poll(), null);

  const tests = [1, -5, -1, 3, 3, -10, 10, 10, 10, 10, 9, 8];

  for (const insert of tests) {
    tree.add(insert);
  }

  t.is(tree.peek(), 10);

  for (const remove of tests) {
    tree.remove(remove);
  }

  t.is(tree.poll(), null);
});

test('min heap tree find', t => {
  const tree = new MinHeapTree<number>();

  tree.add(10);
  tree.add(1);
  tree.add(2);
  tree.add(3);
  tree.add(3);
  tree.add(4);

  t.deepEqual(tree.find(3), [1, 4]);
});

test('max heap tree find', t => {
  const tree = new MaxHeapTree<number>();

  tree.add(0);
  tree.add(1);
  tree.add(2);
  tree.add(3);
  tree.add(3);
  tree.add(4);

  t.deepEqual(tree.find(3), [1, 2]);
});

test('max heap tree toString', t => {
  const tree = new MaxHeapTree<number>();

  t.is(tree.toString(), '');

  tree.add(0);
  tree.add(1);
  tree.add(2);
  tree.add(3);
  tree.add(4);

  t.is(tree.toString(), '4,3,1,0,2');
});

test('min heap tree toString', t => {
  const tree = new MinHeapTree<number>();

  t.is(tree.toString(), '');

  tree.add(10);
  tree.add(1);
  tree.add(2);
  tree.add(3);
  tree.add(4);

  t.is(tree.toString(), '1,3,2,10,4');
});
