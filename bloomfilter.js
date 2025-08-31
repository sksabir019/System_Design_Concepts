class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.bitArray = new Array(size).fill(0);
  }

  // Simple hash functions
  hash1(item) {
    if (typeof item !== 'string') item = String(item);
    return item.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % this.size;
  }

  hash2(item) {
    if (typeof item !== 'string') item = String(item);
    return item.split('').reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7) % this.size;
  }

  hash3(item) {
    if (typeof item !== 'string') item = String(item);
    return item.split('').reduce((acc, char) => acc * 17 + char.charCodeAt(0), 13) % this.size;
  }

  add(item) {
    this.bitArray[this.hash1(item)] = 1;
    this.bitArray[this.hash2(item)] = 1;
    this.bitArray[this.hash3(item)] = 1;
  }

  contains(item) {
    return this.bitArray[this.hash1(item)] === 1 &&
           this.bitArray[this.hash2(item)] === 1 &&
           this.bitArray[this.hash3(item)] === 1;
  }
}

// Usage
const bloom = new BloomFilter();
bloom.add("apple");
bloom.add("banana");

console.log(bloom.contains("apple"));   // true (probably)
console.log(bloom.contains("banana"));  // true (probably)
console.log(bloom.contains("grape"));   // false (definitely not)
