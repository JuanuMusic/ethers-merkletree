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

A smart contract that uses a Merkle Tree for validating an account:

- Says hello to the `recipient` that pays `price` to the contract.
- Both values must be pased, and a `proof` that they are the right values.
- If proof is correctly verified, the event `Hello(to)` is emited.

```solidity
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract PermissionedSalutation {
    event Hello(string);
    using MerkleProof for bytes32[];
    bytes32 public merkleRoot;

    function setMerkleRoot(bytes32 pMerkleRoot) public {
      merkleRoot = pMerkleRoot
    }

    function sayHello(address to, uint256 price, bytes32[] memory proof) public {
        bytes32 leaf = keccak256(abi.encodePacked(to, price));
        require(proof.verify(rootByStage[curStage], leaf), "invalid proof");
        require(price = msg.value, "invalid price paid");
        emit Hello(to);
    }
}
```

## Typescript Implementation

Import WMerkleTree (and types if needed)

```ts
import { WMerkleTree, LeafSignature } from 'ethers-merkletree';`
```

Mock of a list. You should be generating this on your own.

```ts
const myAllowList: LeafSourceObject[] = [
    { to: '0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3',
      price: ethers.utils.formatEther("1"),
    },
    { to: '0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7',
      price: price: ethers.utils.formatEther("1")
    }
  ];

```

Describe the items structure mapping it to the solidity types on the contract's parameters of function `sayHello`.
For each of the parameters, define the name and the solicity type.Names MUST be exact to the source items, but there is no constrains for using the same names on the solidity contract, although I highly recomment it for making code easyly readable.

```ts
const leafSignature: LeafSignature = [
  { type: 'address', name: 'to' },
  { type: 'uint256', name: 'price' },
];
```

Create a new instance of `WMerkleTree` (Wrapped Merkle Tree _suggestions accepted_) passing the `leafSignature` and `myAllowList`

```ts
const merkleTree = new WMerkleTree(myAllowList, leafSignature);
```

You can now get the Merkle root of the Tree.

```ts
const merkleRoot = merkleTree.getHexRoot();
await permissionedSalutationContract.setMerkleRoot(merkleRoot);
```

And request to say hello to Second item on the list, with the evidence that the address can receive a Hello

```ts
// Generate the proof of item 1 on the array
const merkleProof = merkleTree.getHexProof(1);
const allowedRecipient = myAllowList[1];
await permissionedSalutationContract.sayHello(item.to item.price, merkleProof, {value: item.price});
```

## API

### WMerkleTree(sourceItems, leafSignature)

#### sourceItems

Type: `T extends LeafSourceObject`

An array with the items that make the leaves of the tree.

#### leafSignature

Type: `LeafSignature`
An array of objects that define the signature of the leaf items.
`nane` the name of the property of the item object type of `sourceItems`. It must match the item property name. It is not needed to match the name on the smart contract function, although I highly recommend it for clarity.
`type` defines the solidity type to which a parameter resolves. (`addess`,`uint256`, `bytes32`,etc...).

[build-img]: https://github.com/juanumusic/ethers-merkletree/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/juanumusic/ethers-merkletree/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/ethers-merkletree
[downloads-url]: https://www.npmtrends.com/ethers-merkletree
[npm-img]: https://img.shields.io/npm/v/ethers-merkletree
[npm-url]: https://www.npmjs.com/package/ethers-merkletree
[issues-img]: https://img.shields.io/github/issues/juanumusic/ethers-merkletree
[issues-url]: https://github.com/juanumusic/ethers-merkletree/issues
