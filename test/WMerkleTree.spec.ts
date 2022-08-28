import { LeafSignature, LeafSourceObject } from '../src';
import { WMerkleTree } from '../src/index';

describe('WMerkleTree', () => {
  it('Should correctly hash leaf', () => {
    const leaves: LeafSourceObject[] = [
      {
        addressProp: '0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3',
        uintProp: 1,
      },
      {
        addressProp: '0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7',
        uintProp: 3,
      },
      {
        addressProp: '0x8C6Dce95936c532f6d7e3f150b82D359b3938733',
        uintProp: 3,
      },
    ];

    const signature: LeafSignature = [
      { type: 'address', name: 'addressProp' },
      { type: 'uint256', name: 'uintProp' },
    ];
    const wMerkleTree = new WMerkleTree(leaves, signature);

    expect(wMerkleTree.hashLeafIndex(1)).toEqual(
      '0x434b738482ef935ed552adc1472dbff44b1671673d7061b96c946880f3de9c15'
    );
  });

  it('Should correctly calculate the tree root', () => {
    const leaves: LeafSourceObject[] = [
      {
        addressProp: '0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3',
        uintProp: 1,
      },
      {
        addressProp: '0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7',
        uintProp: 3,
      },
      {
        addressProp: '0x8C6Dce95936c532f6d7e3f150b82D359b3938733',
        uintProp: 3,
      },
    ];

    const signature: LeafSignature = [
      { type: 'address', name: 'addressProp' },
      { type: 'uint256', name: 'uintProp' },
    ];

    const merkleTree = new WMerkleTree(leaves, signature);

    expect(merkleTree.getHexRoot()).toEqual(
      '0xe7122d64b772c3b10e6bbb30bb0b713ddebcd84d4ce3877794704557ae35ae66'
    );
  });

  it('Should correctly get a proof for a leaf', () => {
    const leafSignature: LeafSignature = [
      { type: 'address', name: 'addressProp' },
      { type: 'uint256', name: 'uintProp' },
      { type: 'bool', name: 'boolProp' },
    ];
    const leaves: LeafSourceObject[] = [
      {
        uintProp: 1,
        boolProp: true,
        addressProp: '0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3',
      },
      {
        addressProp: '0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7',
        uintProp: 3,
        boolProp: true,
      },
      {
        addressProp: '0x8C6Dce95936c532f6d7e3f150b82D359b3938733',
        uintProp: 2,
        boolProp: false,
      },
    ];

    const merkleTree = new WMerkleTree(leaves, leafSignature);

    const proof = merkleTree.getHexProof(1);
    expect(proof).toEqual([
      '0x3fe7670925e8ad8766b6e2e8c398d69c341c18f6e224cd59313b1cd56f9d8bb7',
      '0xdc1f56c2fd49f7cb8bbe918fa6d23f591e1a0bdd420af2808ba27074b2fd0580',
    ]);
  });

  it('Should correctly build tree with options', () => {
    const leaves: LeafSourceObject[] = [
      {
        addressProp: '0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3',
        uintProp: 1,
      },
      {
        addressProp: '0xCf43D97Ed9EC1d458cA69551C021Bb157314E0d7',
        uintProp: 3,
      },
      {
        addressProp: '0x8C6Dce95936c532f6d7e3f150b82D359b3938733',
        uintProp: 3,
      },
    ];

    const signature: LeafSignature = [
      { type: 'address', name: 'addressProp' },
      { type: 'uint256', name: 'uintProp' },
    ];

    const merkleTree = new WMerkleTree(leaves, signature, {
      sortLeaves: true,
      sortPairs: true,
    });

    expect(merkleTree.getHexRoot()).toEqual(
      '0x591fbf292ed0fbb2e4483f082b6b1a3e026e104365a20337cabc879a4350e260'
    );
  });
});
