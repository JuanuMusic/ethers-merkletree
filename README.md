# ethers-merkletree

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> My awesome module

## Install

```bash
npm install my-package-name
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

[build-img]: https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/typescript-npm-package-template
[downloads-url]: https://www.npmtrends.com/typescript-npm-package-template
[npm-img]: https://img.shields.io/npm/v/typescript-npm-package-template
[npm-url]: https://www.npmjs.com/package/typescript-npm-package-template
[issues-img]: https://img.shields.io/github/issues/ryansonshine/typescript-npm-package-template
[issues-url]: https://github.com/ryansonshine/typescript-npm-package-template/issues
[codecov-img]: https://codecov.io/gh/ryansonshine/typescript-npm-package-template/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ryansonshine/typescript-npm-package-template
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
