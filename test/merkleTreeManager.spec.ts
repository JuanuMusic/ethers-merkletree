import { ethers } from 'ethers';
import mtManager, {
  Leaf,
  LeafSignature,
  LeafSourceObject,
  ObjectPropertyValue,
} from '../src';

describe('merkleTreeManager', () => {
  describe('blankFromType', () => {
    it('Should correctly fetch hash Zero when fetching blank from any byte type', () => {
      const byteTypes = [
        'bytes32',
        'bytes16',
        'bytes8',
        'bytes4',
        'bytes2',
        'bytes1',
        'byte',
        'bytes',
      ];
      for (const type of byteTypes) {
        expect(mtManager.blankFromType(type)).toEqual(
          ethers.constants.HashZero
        );
      }
    });
    it('Should correctly fetch bigNumber Zero when fetching blank from any uint type', () => {
      const uintTypes = [
        'uint256',
        'uint128',
        'uint64',
        'uint32',
        'uint16',
        'uint8',
        'uint4',
        'uint2',
        'uint1',
        'uint',
      ];

      uintTypes.forEach(type =>
        expect(mtManager.blankFromType(type)).toEqual(ethers.constants.Zero)
      );
    });

    it('Should correctly fetch empty string when fetching blank from string type', () => {
      expect(mtManager.blankFromType('string')).toEqual('');
    });
    it('Should correctly fetch zero address when fetching blank from address type', () => {
      expect(mtManager.blankFromType('address')).toEqual(
        ethers.constants.AddressZero
      );
    });
  });

  describe('getBlankLeaf', () => {
    it('Should correctly fetch blank leaf from para', () => {
      const parameters: LeafSignature = [
        { type: 'string', name: 'helloMessage' },
        { type: 'address', name: 'recipient' },
        { type: 'bytes32', name: 'data' },
      ];

      expect(mtManager.getBlankLeaf(parameters)).toEqual([
        '',
        ethers.constants.AddressZero,
        ethers.constants.HashZero,
      ]);
    });
  });

  describe('hashLeaf', () => {
    it('Should correctly hash any valid leaf', () => {
      const signature: LeafSignature = [
        { type: 'string', name: 'helloMessage' },
        { type: 'address', name: 'recipient' },
        { type: 'bytes32', name: 'data' },
      ];

      const leaf: Leaf = [
        'hello',
        '0x7463996F63da6941F0d79487598d320b57fC0ffB',
        ethers.utils.formatBytes32String('wagmi'),
      ];

      const hash = mtManager.hashLeaf(leaf, signature);
      expect(hash).toEqual(
        '0x9520cddcc5c2c2d3db96563c4f3d57cb8ccc9202e10ce39c127cbf9a0db2197e'
      );
    });
  });

  describe('getObjectValues', () => {
    it('Should correctly convert to leaf object', () => {
      const signature: LeafSignature = [
        { type: 'string', name: 'stringProp' },
        { type: 'address', name: 'addressProp' },
        { type: 'bytes32', name: 'bytes32Prop' },
      ];

      const leafObject: ObjectPropertyValue = {
        stringProp: 'hello',
        addressProp: '0x7463996F63da6941F0d79487598d320b57fC0ffB',
        bytes32Prop: ethers.utils.formatBytes32String('wagmi'),
      };

      const leaf: Leaf = mtManager.getObjectValues(leafObject, signature);
      console.log('LEAF OBJECT', leafObject);
      console.log('LEAF', leaf);
      expect(leaf).toEqual([
        leafObject.stringProp,
        leafObject.addressProp,
        leafObject.bytes32Prop,
      ]);
    });

    it('Should fail hash with non existing property on object', () => {
      const signature: LeafSignature = [
        { type: 'string', name: 'stringProp' },
        { type: 'address', name: 'addressProp' },
        { type: 'bytes32', name: 'madeUpProp' },
      ];

      const leafObject: ObjectPropertyValue = {
        stringProp: 'hello',
        addressProp: '0x7463996F63da6941F0d79487598d320b57fC0ffB',
        bytes32Property: ethers.utils.formatBytes32String('wagmi'),
      };

      expect(() => mtManager.getObjectValues(leafObject, signature)).toThrow();
    });

    it('Should throw error when leaf values dont match length of leaf signature', () => {
      const leafSignature: LeafSignature = [
        { type: 'address', name: 'addressProp' },
        { type: 'uint256', name: 'uintProp' },
      ];

      const sourceItem = {
        addressProp: '0x68AC5eE798Ac6F6B0A42F9b34753C9FD26dbdeA3',
      };

      expect(() =>
        mtManager.getObjectValues(sourceItem, leafSignature)
      ).toThrow(
        'Source item has less attributes than Leaf Signature parameters.'
      );
    });
  });
});
