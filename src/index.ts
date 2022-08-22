import { ethers, BigNumberish } from 'ethers';

export type FunctionParameter = {
  name?: string;
  type: string;
};

export type LeafSignature = FunctionParameter[];

export type Leaf = LeafValue[];
export type LeafValue = string | BigNumberish | number | boolean;

const BYTE_TYPES = [
  'bytes32',
  'bytes16',
  'bytes8',
  'bytes4',
  'bytes2',
  'bytes1',
  'byte',
  'bytes',
];
const UINT_TYPES = [
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

export default {
  blankFromType(type: string): LeafValue {
    type = type.toLowerCase();
    if (BYTE_TYPES.includes(type)) return ethers.constants.HashZero;
    else if (type === 'address') {
      return ethers.constants.AddressZero;
    } else if (UINT_TYPES.includes(type)) {
      return ethers.constants.Zero;
    } else if (type === 'bool') {
      return false;
    } else if (type == 'string') {
      return '';
    } else {
      throw new Error(`Unknown type ${type} converting  to blank`);
    }
  },
  getBlankLeaf(leafSignature: LeafSignature): LeafValue[] {
    const retVal: LeafValue[] = leafSignature.map(l =>
      this.blankFromType(l.type)
    );

    return retVal;
  },
  /**
   * Hash a leaf to be used in the merkle tree
   * @param leaf Leaf to hash
   * @returns Hash of the leaf
   */
  hashLeaf(leaf: Leaf, leafSignature: LeafSignature): string {
    return (
      '0x' +
      Buffer.from(
        ethers.utils
          .solidityKeccak256(
            leafSignature.map(parameter => parameter.type),
            leaf
          )
          .slice(2),
        'hex'
      ).toString('hex')
    );
  },
};
