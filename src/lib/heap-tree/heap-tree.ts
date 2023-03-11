import { Comparator, EventEmitter, TCompareFn } from '@algo-js/core';

export const HeapTreeEvents = {
  ADDED: Symbol('add'),
  BEFORE_ADDED: Symbol('before_add'),
  BEFORE_POLL: Symbol('before_poll'),
  POLLED: Symbol('poll')
};

export class HeapTree<T> extends EventEmitter<T> {
  /**
   * @return {boolean}
   */
  public get isEmpty(): boolean {
    return !this.heap.length;
  }

  /**
   * Comparator instance for elements' comparisons
   */
  protected comparator: Comparator<T>;

  /**
   * Array representation of the heap
   */
  protected heap: T[] = [];

  constructor(compareFn: TCompareFn<T> = Comparator.defaultCompareFn) {
    super();

    this.comparator = new Comparator<T>(compareFn);
  }

  /**
   * @return {*}
   */
  public peek(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    return this.heap[0];
  }

  /**
   * @return {*}
   */
  public poll(): T | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    const element = this.heap[0];

    this.emit(HeapTreeEvents.BEFORE_POLL, element);

    if (this.heap.length === 1) {
      this.heap.pop();
    } else {
      // Move the last element from the end to the head
      this.heap[0] = this.heap.pop();

      this.heapifyDown();
    }

    this.emit(HeapTreeEvents.POLLED, element);

    return element;
  }

  /**
   * @param {*} element
   * @return {HeapTree}
   */
  public add(element: T): this {
    this.emit(HeapTreeEvents.BEFORE_ADDED, element);

    this.heap.push(element);
    this.heapifyUp();

    this.emit(HeapTreeEvents.ADDED, element);

    return this;
  }

  /**
   * @param {*} element
   * @param {Comparator} [comparator]
   * @return {HeapTree}
   */
  public remove(element: T, comparator = this.comparator): this {
    // Find number of elements to remove
    const numberOfItemsToRemove = this.find(element, comparator).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // We need to find element index to remove each time after removal since
      // indices are being changed after each heapify process
      const indexToRemove = this.find(element, comparator).pop();

      // If we need to remove last child in the heap then just remove it
      // There is no need to heapify the heap afterwards
      if (indexToRemove === this.heap.length - 1) {
        this.heap.pop();
      } else {
        // Move last element in heap to the vacant (removed) position
        this.heap[indexToRemove] = this.heap.pop();

        const parentItem = this.getParent(indexToRemove);

        // If there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up
        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.isCorrectOrder(parentItem, this.heap[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * @param {*} element
   * @param {Comparator} [comparator]
   * @return {number[]}
   */
  public find(element: T, comparator = this.comparator): number[] {
    const foundItemIndices = [];

    for (
      let elementIndex = 0;
      elementIndex < this.heap.length;
      ++elementIndex
    ) {
      if (comparator.equal(element, this.heap[elementIndex])) {
        foundItemIndices.push(elementIndex);
      }
    }

    return foundItemIndices;
  }

  /**
   * @return {string}
   */
  public toString(): string {
    return this.heap.toString();
  }

  /**
   * Checks if pair of heap elements is in correct order
   * For MinHeap the first element must be always smaller or equal
   * For MaxHeap the first element must be always bigger or equal
   *
   * @param {*} first
   * @param {*} second
   * @return {boolean}
   * @abstract
   */
  /* istanbul ignore next */
  protected isCorrectOrder(first: T, second: T): boolean {
    throw new Error(`
      You have to implement heap pair comparison method
      for ${first} and ${second} values.
    `);
  }

  /**
   * Computes left child index
   *
   * @param {number} position
   * @returns {number}
   */
  private computeLeftChildIndex(position: number): number {
    return (position << 1) + 1;
  }

  /**
   * Computes right child index
   *
   * @param {number} position
   * @returns {number}
   */
  private computeRightChildIndex(position: number): number {
    return (position << 1) + 2;
  }

  /**
   * Computes parent index
   *
   * @param {number} position
   * @returns {number}
   */
  private computeParentIndex(position: number): number {
    return (position - 1) >> 1;
  }

  /**
   * @param {number} position
   * @returns {boolean}
   */
  private hasParent(position: number): boolean {
    return this.computeParentIndex(position) >= 0;
  }

  /**
   * @param {number} position
   * @returns {boolean}
   */
  private hasLeftChild(position: number): boolean {
    return this.computeLeftChildIndex(position) < this.heap.length;
  }

  /**
   * @param {number} position
   * @returns {boolean}
   */
  private hasRightChild(position: number): boolean {
    return this.computeRightChildIndex(position) < this.heap.length;
  }

  /**
   * @param {number} position
   * @returns {*}
   */
  private getLeftChild(position: number): T {
    return this.heap[this.computeLeftChildIndex(position)];
  }

  /**
   * @param {number} position
   * @returns {*}
   */
  private getRightChild(position: number): T {
    return this.heap[this.computeRightChildIndex(position)];
  }

  /**
   * @param {number} position
   * @returns {*}
   */
  private getParent(position: number): T {
    return this.heap[this.computeParentIndex(position)];
  }

  /**
   * @param {number} positionA
   * @param {number} positionB
   */
  private swap(positionA: number, positionB: number): void {
    const tmp = this.heap[positionB];
    this.heap[positionB] = this.heap[positionA];
    this.heap[positionA] = tmp;
  }

  /**
   * @param {number} currentIndex
   */
  private heapifyUp(currentIndex = this.heap.length - 1): void {
    while (
      this.hasParent(currentIndex) &&
      !this.isCorrectOrder(
        this.getParent(currentIndex),
        this.heap[currentIndex]
      )
    ) {
      const nextIndex = this.computeParentIndex(currentIndex);
      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * @param {number} currentIndex
   */
  private heapifyDown(currentIndex = 0): void {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap).
    // Do the same for next children after swap

    while (this.hasLeftChild(currentIndex)) {
      const hasRight =
        this.hasRightChild(currentIndex) &&
        this.isCorrectOrder(
          this.getRightChild(currentIndex),
          this.getLeftChild(currentIndex)
        );

      const nextIndex = hasRight
        ? this.computeRightChildIndex(currentIndex)
        : this.computeLeftChildIndex(currentIndex);

      if (this.isCorrectOrder(this.heap[currentIndex], this.heap[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);

      currentIndex = nextIndex;
    }
  }
}
