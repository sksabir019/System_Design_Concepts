const crypto = require("crypto");

class ConsistentHashRing {
  constructor(replicas = 100) {
    this.replicas = replicas;
    this.ring = new Map();
    this.sortedKeys = [];
    this.nodes = new Set();
  }

  _hash(value) {
    return crypto.createHash("md5").update(value).digest("hex");
  }

  _hashInt(value) {
    return parseInt(this._hash(value).slice(0, 8), 16);
  }

  addNode(node) {
    this.nodes.add(node);
    for (let i = 0; i < this.replicas; i++) {
      const key = this._hashInt(`${node}:${i}`);
      // Ensure key uniqueness
      if (!this.ring.has(key)) {
        this.ring.set(key, node);
        this.sortedKeys.push(key);
      }
    }
    this.sortedKeys.sort((a, b) => a - b);
  }

  removeNode(node) {
    this.nodes.delete(node);
    this.sortedKeys = this.sortedKeys.filter(
      (key) => this.ring.get(key) !== node
    );
    for (let [key, value] of this.ring.entries()) {
      if (value === node) this.ring.delete(key);
    }
  }

  getNode(key) {
    if (this.ring.size === 0) return null;
    const hash = this._hashInt(key);
    for (let i = 0; i < this.sortedKeys.length; i++) {
      if (hash <= this.sortedKeys[i]) {
        return this.ring.get(this.sortedKeys[i]);
      }
    }
    return this.ring.get(this.sortedKeys[0]); // wrap around
  }
}

const ring = new ConsistentHashRing();

ring.addNode("ServerA");
ring.addNode("ServerB");
ring.addNode("ServerC");

console.log(ring.getNode("user123")); // → ServerB (for example)
console.log(ring.getNode("session456")); // → ServerC
