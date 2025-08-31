import crypto from "crypto";
/**
 * Bloom Filter: A bloom fileter is a space-efficient probabilistic data structure used to test whether an element is a member of a set.
 * It can quickly determine if an element is definitely not in the set or possibly in the set, with a configurable false positive rate.
 * The filter uses multiple hash functions to map elements to positions in a bit array, setting bits to indicate presence.
 * It supports adding elements and checking membership, but does not support removal of elements.
 * Bloom filters are widely used in network security, databases, and distributed systems to optimize queries and reduce expensive lookups.
 * This implementation uses cryptographic hash functions from the Node.js crypto module for better distribution.
 * The size of the bit array and the number of hash functions can be tuned to balance accuracy and memory usage.
 * It is particularly useful in scenarios where space is limited and some false positives are acceptable.
 * The filter provides constant time complexity for insertions and membership checks.
 * It is a foundational data structure in streaming algorithms and big data applications.
 */

/**
 * Formula for bloom filter
 * m = size of bit array
 * k = number of hash functions
 * n = number of elements added
 * P = probability of false positive
 * P = (1 - e^(-kn/m))^k
 * where e is the base of the natural logarithm
 */

class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.bitArray = new Array(size).fill(0);
  }

  // Use Node.js crypto module for real hash functions

  hash1(item) {
    const hash = crypto.createHash("sha256").update(String(item)).digest("hex");
    return parseInt(hash.slice(0, 8), 16) % this.size;
  }

  hash2(item) {
    const hash = crypto.createHash("sha512").update(String(item)).digest("hex");
    return parseInt(hash.slice(0, 8), 16) % this.size;
  }

  hash3(item) {
    const hash = crypto.createHash("sha1").update(String(item)).digest("hex");
    return parseInt(hash.slice(0, 8), 16) % this.size;
  }

  add(item) {
    this.bitArray[this.hash1(item)] = 1;
    this.bitArray[this.hash2(item)] = 1;
    this.bitArray[this.hash3(item)] = 1;
  }

  contains(item) {
    return (
      this.bitArray[this.hash1(item)] === 1 &&
      this.bitArray[this.hash2(item)] === 1 &&
      this.bitArray[this.hash3(item)] === 1
    );
  }
}

// bloom filter example with real hashing functions
const bloom = new BloomFilter(10);
bloom.add("azam");
bloom.add("sabir");
bloom.add("Azam sabir");


console.log(bloom.contains("apple"));   // true (probably)
console.log(bloom.contains("banana"));  // true (probably)
console.log(bloom.contains("sabir"));   // false (definitely not)
console.log(bloom.bitArray);

// counter bloom filter
class CountingBloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.countArray = new Array(size).fill(0);
  }

  hash1(item) {
    const hash = crypto.createHash("sha256").update(String(item)).digest("hex");
    return parseInt(hash.slice(0, 8), 16) % this.size;
  }

  hash2(item) {
    const hash = crypto.createHash("sha512").update(String(item)).digest("hex");
    return parseInt(hash.slice(0, 8), 16) % this.size;
  }

  hash3(item) {
    const hash = crypto.createHash("sha1").update(String(item)).digest("hex");
    return parseInt(hash.slice(0, 8), 16) % this.size;
  }

  add(item) {
    this.countArray[this.hash1(item)]++;
    this.countArray[this.hash2(item)]++;
    this.countArray[this.hash3(item)]++;
  }

  remove(item) {
    this.countArray[this.hash1(item)]--;
    this.countArray[this.hash2(item)]--;
    this.countArray[this.hash3(item)]--;
  }

  contains(item) {
    return (
      this.countArray[this.hash1(item)] > 0 &&
      this.countArray[this.hash2(item)] > 0 &&
      this.countArray[this.hash3(item)] > 0
    );
  }
}
const countingBloom = new CountingBloomFilter(10);
countingBloom.add("azam");
countingBloom.add("sabir");
countingBloom.add("Azam sabir");

console.log(countingBloom.contains("azam"));      // true
console.log(countingBloom.contains("sabir"));     // true
console.log(countingBloom.contains("Azam sabir")); // true
console.log(countingBloom.contains("unknown"));   // false
console.log(countingBloom.countArray);
countingBloom.remove("azam");
countingBloom.remove("sabir");
console.log(countingBloom.countArray);