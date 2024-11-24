export class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 0-based indexing
  par(index) {
    return Math.floor((index - 1) / 2);
  }
  left(index) {
    return 2 * index + 1;
  }
  right(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
  heapifyUp(index) {
    while (index > 0 && this.heap[index] < this.heap[this.par(index)]) {
      this.swap(index, this.par(index));
      index = this.par(index);
    }
  }
  heapifyDown(index) {
    let smallest = index;
    const leftChildIndex = this.left(index);
    const rightChildIndex = this.right(index);

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallest]
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallest]
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  empty() {
    return this.heap.length === 0;
  }
  push(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }
  pop() {
    if (this.empty()) return null;

    const min = this.heap[0];
    if (this.heap.length === 1) return this.heap.pop();
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }
  top() {
    return this.heap[0];
  }
}
