// tslint:disable:no-expression-statement
import test from 'ava';
import {
  findMax,
  findMin,
  generateIntegerNumber,
  generateNumber
} from '../../utils/tests';
import { HeapTreeEvents } from './heap-tree';
import { MaxHeapTree } from './max-heap-tree';
import { MinHeapTree } from './min-heap-tree';

interface Item {
  name: string;
  weight: number;
}

const compareFn = (a: Item, b: Item) => {
  return a.weight === b.weight ? 0 : a.weight < b.weight ? -1 : 1;
};

test('min heap tree peeks minimum value', t => {
  const tree = new MinHeapTree<number>();

  t.is(tree.peek(), undefined);

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

  t.is(tree.poll(), undefined);

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
  t.is(tree.poll(), undefined);
  t.is(tree.poll(), undefined);
});

test('max heap tree peeks minimum value', t => {
  const tree = new MaxHeapTree<number>();

  t.is(tree.peek(), undefined);

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

  t.is(tree.poll(), undefined);

  const inserts = [1, -5, -1, 3, 3, -10, 10, 10, 10, 10, 9, 8];
  const polls = [10, 10, 10, 10, 9, 8, 3, 3, 1, -1, -5, -10];

  for (const insert of inserts) {
    tree.add(insert);
  }

  for (const poll of polls) {
    t.is(tree.poll(), poll);
  }

  t.is(tree.poll(), undefined);
  t.is(tree.poll(), undefined);
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
  tree.remove(1);
  t.is(tree.peek(), 10);

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
  t.is(tree.peek(), undefined);

  tree.remove(5);
  t.is(tree.peek(), undefined);
});

test('heap tree remove (test cases)', t => {
  const tree = new MaxHeapTree<number>();

  t.is(tree.poll(), undefined);

  const tests = [1, -5, -1, 3, 3, -10, 10, 10, 10, 10, 9, 8];

  for (const insert of tests) {
    tree.add(insert);
  }

  t.is(tree.peek(), 10);

  for (const remove of tests) {
    tree.remove(remove);
  }

  t.is(tree.poll(), undefined);
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

test('heap tree clears', t => {
  const tree = new MaxHeapTree<number>();

  tree.add(0);
  tree.add(1);
  tree.add(2);
  tree.add(3);
  tree.add(3);
  tree.add(4);

  t.deepEqual(tree.peek(), 4);

  tree.clear();

  t.deepEqual(tree.peek(), undefined);
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

test('heap tree complex data', t => {
  const items: Item[] = [
    {
      name: 'Banana',
      weight: 10
    },
    {
      name: 'Banana',
      weight: 50
    },
    {
      name: 'Banana',
      weight: -5
    },
    {
      name: 'Banana',
      weight: 23
    },
    {
      name: 'Banana',
      weight: -23
    }
  ];

  const minHeapTree = new MinHeapTree<Item>(compareFn);
  const maxHeapTree = new MaxHeapTree<Item>(compareFn);

  items.forEach(v => {
    minHeapTree.add(v);
    maxHeapTree.add(v);
  });

  t.deepEqual(minHeapTree.peek(), items[4]);
  t.deepEqual(maxHeapTree.peek(), items[1]);
});

test('heap tree high load', t => {
  const items: Item[] = Array(1e7)
    .fill(0)
    .map(v => {
      return {
        name: generateIntegerNumber().toString(35),
        weight: generateNumber()
      };
    });

  const minItem = findMin<Item>(items, compareFn);
  const maxItem = findMax<Item>(items, compareFn);

  const minHeapTree = new MinHeapTree<Item>(compareFn);
  const maxHeapTree = new MaxHeapTree<Item>(compareFn);

  items.forEach(v => {
    minHeapTree.add(v);
    maxHeapTree.add(v);
  });

  t.is(minHeapTree.peek(), minItem);
  t.is(maxHeapTree.peek(), maxItem);
});

test('heap tree add event', t => {
  const items: Item[] = [
    {
      name: 'Banana',
      weight: 10
    },
    {
      name: 'Banana',
      weight: 50
    },
    {
      name: 'Banana',
      weight: -5
    },
    {
      name: 'Banana',
      weight: 23
    },
    {
      name: 'Banana',
      weight: -23
    }
  ];

  const minHeapTree = new MinHeapTree<Item>(compareFn);

  let insertIndex = 0;
  minHeapTree.on(HeapTreeEvents.ADDED, item => {
    t.is(item, items[insertIndex++]);
  });

  items.forEach(v => minHeapTree.add(v));
});

test('heap tree before add event', t => {
  const heap = new MinHeapTree<number>();

  heap.add(1);
  heap.add(2);
  heap.add(3);
  heap.add(-1);
  heap.add(4);
  heap.add(5);

  heap.on(HeapTreeEvents.BEFORE_ADDED, value => {
    t.is(value, -10);
    t.is(heap.peek(), -1);
  });

  heap.on(HeapTreeEvents.ADDED, value => {
    t.is(value, -10);
    t.is(heap.peek(), -10);
  });

  t.is(heap.peek(), -1);

  heap.add(-10);
});

test('heap tree poll events', t => {
  const heap = new MinHeapTree<number>();

  heap.on(HeapTreeEvents.BEFORE_POLL, value => {
    t.is(value, -1);
    t.is(heap.peek(), -1);
  });

  heap.on(HeapTreeEvents.POLLED, value => {
    t.is(value, -1);
    t.is(heap.peek(), 2);
  });

  heap.add(2);
  heap.add(3);
  heap.add(-1);
  heap.add(4);
  heap.add(5);

  t.is(heap.peek(), -1);
  t.is(heap.poll(), -1);
});

test('heap tree once events', t => {
  const heap = new MinHeapTree<number>();

  heap.add(1);
  heap.add(2);
  heap.add(3);
  heap.add(-1);
  heap.add(4);
  heap.add(5);

  heap.once(HeapTreeEvents.ADDED, value => {
    t.is(value, -10);
    t.is(heap.poll(), -10);
  });

  t.is(heap.peek(), -1);

  heap.add(-10);
  heap.add(-20);

  t.is(heap.eventNames().length, 0);
});
