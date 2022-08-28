import { ethers, BigNumberish } from 'ethers';

export { default as WMerkleTree } from './WMerkleTree';

export type UIntTypes =
  | 'uint256'
  | 'uint128'
  | 'uint64'
  | 'uint32'
  | 'uint16'
  | 'uint8'
  | 'uint4'
  | 'uint2'
  | 'uint1'
  | 'uint';
export type ByteTypes =
  | 'bytes32'
  | 'bytes16'
  | 'bytes8'
  | 'bytes4'
  | 'bytes2'
  | 'bytes1'
  | 'byte'
  | 'bytes';

export type FunctionParameterType =
  | 'string'
  | 'address'
  | 'bool'
  | UIntTypes
  | ByteTypes;

export type FunctionParameter = {
  name: string;
  type: FunctionParameterType;
};

export type LeafSignature = FunctionParameter[];

export type Leaf = ObjectValue[];
export type ObjectPropertyValue = {
  [key: string]: ObjectValue;
};

export type LeafSourceObject = {
  [key: string]: ObjectValue;
};

export type ObjectValue = string | BigNumberish | number | boolean;

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
  blankFromType(type: string): ObjectValue {
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
  getBlankLeaf(leafSignature: LeafSignature): Leaf {
    const retVal: ObjectValue[] = leafSignature.map(l =>
      this.blankFromType(l.type)
    );

    return retVal;
  },
  /**
   * Hash a leaf to be used in the merkle tree
   * @param leaf Leaf to hash
   * @returns Hash of the leaf
   */
  hashLeaf(leaf: Leaf, signature: LeafSignature): string {
    return (
      '0x' +
      Buffer.from(
        ethers.utils
          .solidityKeccak256(
            signature.map(p => p.type), // Types
            leaf.map((v, index) => v.toString())
          )
          .slice(2),
        'hex'
      ).toString('hex')
    );
  },

  toLeaf(sourceItem: LeafSourceObject, signature: LeafSignature): Leaf {
    const objectKeys = Object.keys(sourceItem);
    if (signature.length > objectKeys.length)
      throw new Error(
        'Source item has less attributes than Leaf Signature parameters.'
      );

    let retVal: Leaf = [];
    for (let functionParameter of signature) {
      if (!objectKeys.includes(functionParameter.name))
        throw new Error(
          'Source object does not contain attribute with name ' +
            functionParameter.name
        );

      retVal.push(sourceItem[functionParameter.name].toString());
    }

    return retVal;
  },
};
