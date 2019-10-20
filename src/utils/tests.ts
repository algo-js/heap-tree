import { Comparator, TCompareFn } from '@algo-js/core';

export function generateNumber(min = -1e9, max = 1e9): number {
  return Math.random() * (max - min) + min;
}

export function generateIntegerNumber(min = -1e9, max = 1e9): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findExtremum<T>(items: T[], comparator: Comparator<T>): T {
  let extremum: T = null;

  for (let i = 0; i < items.length; ++i) {
    if (!extremum || comparator.less(extremum, items[i])) {
      extremum = items[i];
    }
  }

  return extremum;
}

export function findMax<T>(items: T[], compareFn: TCompareFn<T>): T {
  const comparator = new Comparator<T>(compareFn);

  return findExtremum<T>(items, comparator);
}

export function findMin<T>(items: T[], compareFn: TCompareFn<T>): T {
  const comparator = new Comparator<T>(compareFn).reverse();

  return findExtremum<T>(items, comparator);
}
