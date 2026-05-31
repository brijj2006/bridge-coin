const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data),
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "31/05/2026", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let bridgeCoin = new Blockchain();
bridgeCoin.addBlock(new Block(1, "01/06/2026", { amount: 4 }));
bridgeCoin.addBlock(new Block(2, "02/06/2026", { amount: 10 }));

console.log(JSON.stringify(bridgeCoin, null, 4));

//output
/**
 * {
    "chain": [
        {
            "index": 0,
            "timestamp": "31/05/2026",
            "data": "Genesis block",
            "previousHash": "0",
            "hash": "033f8596b885e1863ebbd6cf5d5cffba4d944bb9052d0029d091fef57af77bb8"
        },
        {
            "index": 1,
            "timestamp": "01/06/2026",
            "data": {
                "amount": 4
            },
            "previousHash": "033f8596b885e1863ebbd6cf5d5cffba4d944bb9052d0029d091fef57af77bb8",
            "hash": "c755f0b78f07258bc4af95dd82fa42b93c3eb33e2b55cf4c315fe98d965a2f4d"
        },
        {
            "index": 2,
            "timestamp": "02/06/2026",
            "data": {
                "amount": 10
            },
            "previousHash": "c755f0b78f07258bc4af95dd82fa42b93c3eb33e2b55cf4c315fe98d965a2f4d",
            "hash": "a9c1b6c97b599028b0aba636d1152851d2f2eccc4792960f13c26f5a3226a5fa"
        }
    ]
}
 */
