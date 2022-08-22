import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';
import mtManager, { Leaf, LeafSignature } from '.';

export default class WMerkleTree {
  private _baseTree: MerkleTree;
  private _originalValues: Leaf[];
  private _signature: LeafSignature;

  private constructor(
    baseTree: MerkleTree,
    originalValues: Leaf[],
    signature: LeafSignature
  ) {
    this._baseTree = baseTree;
    this._originalValues = originalValues;
    this._signature = signature;
  }

  /**
   * Build a merkle tree from a list of leaves
   * @param leaves Array of leaves to build the tree from
   * @returns Merkle tree object.
   */
  static from(
    leaves: Leaf[],
    leafSignature: LeafSignature,
    throwOnUneven = false
  ): WMerkleTree {
    if (leaves.length === 0) throw new Error('Invalid empty whitelist');
    if (leaves.length % 2 !== 0) {
      if (throwOnUneven) throw new Error('whitelist entries must be even');
      else {
        leaves.push(mtManager.getBlankLeaf(leafSignature));
      }
    }

    const merkleTree = new MerkleTree(
      leaves.map(l => mtManager.hashLeaf(l, leafSignature)),
      keccak256,
      { sortPairs: true, sortLeaves: false }
    );

    return new WMerkleTree(merkleTree, leaves, leafSignature);
  }

  get merkleTree(): MerkleTree {
    return this._baseTree;
  }

  get originalValues(): Leaf[] {
    return this._originalValues;
  }

  get signature(): LeafSignature {
    return this._signature;
  }

  hashLeaf(leaf: Leaf): string {
    return mtManager.hashLeaf(leaf, this._signature);
  }

  getHexProof(leaf: Leaf): string[] {
    return this._baseTree.getHexProof(this.hashLeaf(leaf));
  }

  getHexRoot(): string {
    return this._baseTree.getHexRoot();
  }
}
