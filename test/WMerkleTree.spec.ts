import { Leaf, LeafSignature } from '../src';
import { WMerkleTree } from '../src/index';

describe('WMerkleTree', () => {
  it('Should correctly hash leaf', () => {
    const leaves: Leaf[] = [
      ['0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3', 1],
      ['0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7', 3],
      ['0x8C6Dce95936c532f6d7e3f150b82D359b3938733', 2],
    ];
    const wMerkleTree = WMerkleTree.from(leaves, [
      { type: 'address' },
      { type: 'uint256' },
    ]);

    expect(wMerkleTree.hashLeaf(leaves[1])).toEqual(
      '0x434b738482ef935ed552adc1472dbff44b1671673d7061b96c946880f3de9c15'
    );
  });

  it('Should correctly calculate the tree root', () => {
    const leaves: Leaf[] = [
      ['0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3', 1],
      ['0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7', 3],
      ['0x8C6Dce95936c532f6d7e3f150b82D359b3938733', 2],
    ];

    const merkleTree: WMerkleTree = WMerkleTree.from(leaves, [
      { type: 'address' },
      { type: 'uint256' },
    ]);

    expect(merkleTree.getHexRoot()).toEqual(
      '0xdac35965baae61d02d4dc70bb203aff54694a337ced3d486e3f3ff5ed7d0acc3'
    );
  });

  it('Should correctly get a proof for a leaf', () => {
    const leafSignature: LeafSignature = [
      { type: 'address' },
      { type: 'uint256' },
      { type: 'bool' },
    ];
    const leaves: Leaf[] = [
      ['0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3', 1, true],
      ['0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7', 3, true],
      ['0x8C6Dce95936c532f6d7e3f150b82D359b3938733', 2, false],
    ];

    const merkleTree = WMerkleTree.from(leaves, leafSignature);

    const proof = merkleTree.getHexProof(leaves[1]);
    expect(proof).toEqual([
      '0x3fe7670925e8ad8766b6e2e8c398d69c341c18f6e224cd59313b1cd56f9d8bb7',
      '0x52dc182ef0157bfbd62f3ece237ca9bd52d942018b00284d30c4afdd91c94623',
    ]);
  });

  it('Should throw error when leaf values dont match length of leaf signature', () => {
    const leafSignature: LeafSignature = [
      { type: 'address' },
      { type: 'uint256' },
      { type: 'bool' },
    ];
    const leaves: Leaf[] = [
      ['0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3', true],
      ['0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7', true],
      ['0x8C6Dce95936c532f6d7e3f150b82D359b3938733', false],
    ];

    expect(() => WMerkleTree.from(leaves, leafSignature)).toThrow(
      'Leaf values do not match length of Leaf Signature parameters.'
    );
  });
});
