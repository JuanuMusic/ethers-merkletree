# ethers-merkletree

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]

> A library for interacting with Merkle Trees powereed by ethers.js and merkletreejs

## Install

```bash
npm install ethers-merkletree
```

## Usage

```ts
import { WMerkleTree } from 'ethers-merkletree';

const leaves: Leaf[] = [
  ['0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3', 1],
  ['0x8C6Dce95936c532f6d7e3f150b82D359b3938733', 2],
];

const leafDefinition: LeafSignature = [
  { type: 'address' },
  { type: 'uint256' },
];

const merkleTree = WMerkleTree.from(leaves, leafDefinition);

// Get merkle root
const merkleRoot = merkleTree.getHexRoot();

// Get a proof for a leaf
const merkleProof = merkleTree.gb;
```

## API

### WMerkleTree(input, options?)

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `object`

##### postfix

Type: `string`
Default: `rainbows`

Lorem ipsum.

[build-img]: https://github.com/juanumusic/ethers-merkletree/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/juanumusic/ethers-merkletree/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/ethers-merkletree
[downloads-url]: https://www.npmtrends.com/ethers-merkletree
[npm-img]: https://img.shields.io/npm/v/ethers-merkletree
[npm-url]: https://www.npmjs.com/package/ethers-merkletree
[issues-img]: https://img.shields.io/github/issues/juanumusic/ethers-merkletree
[issues-url]: https://github.com/juanumusic/ethers-merkletree/issues
