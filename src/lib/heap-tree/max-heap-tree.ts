import { HeapTree } from './heap-tree';

export class MaxHeapTree<T> extends HeapTree<T> {
  /**
   * Checks if a pair of heap elements is in correct order
   * For MinHeap the first element must be always smaller or equal
   * For MaxHeap the first element must be always bigger or equal
   *
   * @param {*} first
   * @param {*} second
   * @return {boolean}
   */
  protected isCorrectOrder(first: T, second: T): boolean {
    return this.comparator.greaterOrEqual(first, second);
  }
}
