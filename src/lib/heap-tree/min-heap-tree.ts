import { HeapTree } from './heap-tree';

export class MinHeapTree<T> extends HeapTree<T> {
  /**
   * Checks if pair of heap elements is in correct order
   * For MinHeap the first element must be always smaller or equal
   * For MaxHeap the first element must be always bigger or equal
   *
   * @param {*} first
   * @param {*} second
   * @return {boolean}
   */
  protected isCorrectOrder(first: T, second: T): boolean {
    return this.comparator.lessOrEqual(first, second);
  }
}
