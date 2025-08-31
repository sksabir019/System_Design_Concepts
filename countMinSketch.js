/**
 * CountMin Sketch: A probabilistic data structure for estimating the frequency of events in a data stream.
 * It uses multiple hash functions to map events to counters, allowing for efficient and approximate frequency queries.
 * This implementation supports insertion and query operations with tunable accuracy and memory usage.
 * The data structure is particularly useful in scenarios where memory is limited and exact counts are not necessary.
 * The sketch is defined by its width (number of counters) and depth (number of hash functions).
 * It provides a balance between accuracy and memory efficiency, making it suitable for large-scale data stream processing.
 * It supports insertion and query operations with tunable accuracy and memory usage.
 * It is designed to handle high-speed data streams and can be used in network monitoring, database systems, and other applications requiring approximate frequency counts.
 * It is implemented as a two-dimensional array of counters, with each row corresponding to a different hash function.
 * It provides methods for insertion and query operations, allowing for efficient updates and approximate frequency estimation.
 * It is widely used in network monitoring, database systems, and other applications requiring approximate frequency counts.
 */

class CountMinSketch {
  constructor(depth = 3, width = 1000) {
    this.depth = depth;
    this.width = width;
    this.table = Array.from({ length: depth }, () => new Array(width).fill(0));
  }

  _hash(str, seed) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * seed + str.charCodeAt(i)) % this.width;
    }
    // Ensure non-negative index
    return (hash + this.width) % this.width;
  }

  add(item) {
    if (typeof item !== "string") {
      throw new Error("Item must be a string");
    }
    for (let i = 1; i <= this.depth; i++) {
      const index = this._hash(item, i * 31);
      this.table[i - 1][index]++;
    }
  }

  estimate(item) {
    if (typeof item !== "string") {
      throw new Error("Item must be a string");
    }
    let min = Infinity;
    for (let i = 1; i <= this.depth; i++) {
      const index = this._hash(item, i * 31);
      min = Math.min(min, this.table[i - 1][index]);
    }
    return min;
  }
}

const cms = new CountMinSketch();
cms.add("Taylor");
cms.add("Taylor");
cms.add("Swift");

console.log(cms.estimate("Taylor")); // ~2
console.log(cms.estimate("Swift"));  // ~1
console.log(cms.estimate("Drake"));  // ~0
