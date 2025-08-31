import crypto from "crypto";

class StorageNode {
  constructor(name, host) {
    this.name = name;
    this.host = host;
  }

  putFile(path) {
    console.log(`File ${path} stored on node ${this.name}`);
  }

  fetchFile(path) {
    console.log(`File ${path} fetched from node ${this.name}`);
  }
}

class ConsistentHashing {
  constructor(totalSlots, virtualNodes = 3) {
    if (!Number.isInteger(totalSlots) || totalSlots <= 0) {
      throw new Error("totalSlots must be a positive integer");
    }
    this.totalSlots = totalSlots;
    this.virtualNodes = virtualNodes;
    this.ring = []; // [{key, node}]
    this.keys = [];
  }

  hashFn(key) {
    const hash = crypto.createHash("sha256").update(String(key), "utf-8").digest("hex");
    return parseInt(hash.slice(0, 12), 16) % this.totalSlots;
  }

  addNode(node) {
    for (let i = 0; i < this.virtualNodes; i++) {
      let key, tries = 0;
      do {
        key = this.hashFn(node.host + "#" + i + (tries ? `_${tries}` : ""));
        tries++;
      } while (this.keys.includes(key) && tries < 10);
      if (this.keys.includes(key)) throw new Error("Hash space is full or too many collisions");
      // Insert in sorted order
      const index = this.keys.findIndex((k) => k > key);
      if (index === -1) {
        this.keys.push(key);
        this.ring.push({ key, node });
      } else {
        this.keys.splice(index, 0, key);
        this.ring.splice(index, 0, { key, node });
      }
    }
  }

  removeNode(node) {
    for (let i = 0; i < this.virtualNodes; i++) {
      const key = this.hashFn(node.host + "#" + i);
      const index = this.keys.indexOf(key);
      if (index !== -1) {
        this.keys.splice(index, 1);
        this.ring.splice(index, 1);
      }
    }
  }

  assign(item) {
    if (this.ring.length === 0) throw new Error("No nodes available");
    const key = this.hashFn(item);
    let index = this.keys.findIndex((k) => k >= key);
    if (index === -1) index = 0;
    return this.ring[index].node;
  }

  listNodes() {
    return this.ring.map(({ key, node }) => ({ key, name: node.name, host: node.host }));
  }
}

// Example usage
const consistentHashing = new ConsistentHashing(100, 5);

const nodes = [
  new StorageNode("A", "10.131.213.12"),
  new StorageNode("B", "10.131.217.11"),
  new StorageNode("C", "10.131.142.46"),
  new StorageNode("D", "10.131.114.17"),
  new StorageNode("E", "10.131.189.18"),
];

nodes.forEach((node) => consistentHashing.addNode(node));

const fileToUpload1 = "example.txt";
const assignedNode1 = consistentHashing.assign(fileToUpload1);
assignedNode1.putFile(fileToUpload1);

const fileToUpload2 = "example2.txt";
const assignedNode2 = consistentHashing.assign(fileToUpload2);
assignedNode2.putFile(fileToUpload2);

const fileToFetch = "example.txt";
const nodeToFetchFrom = consistentHashing.assign(fileToFetch);
nodeToFetchFrom.fetchFile(fileToFetch);

console.log(consistentHashing.listNodes());
