import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';
import mtManager, { Leaf, LeafSignature, LeafSourceObject } from '.';

export default class WMerkleTree<TLeafSource extends LeafSourceObject> {
  private _baseTree: MerkleTree;
  private _leaves: Leaf[];
  private _sourceItems: TLeafSource[];
  private _signature: LeafSignature;

  constructor(
    sourceItems: TLeafSource[],
    signature: LeafSignature,
    throwOnUneven?: boolean
  ) {
    if (sourceItems.length === 0) throw new Error('Invalid empty whitelist');
    this._sourceItems = sourceItems;

    if (signature.length == 0)
      throw new Error('Invalid empty signature definition');
    this._signature = signature;

    this._leaves = sourceItems.map(i => mtManager.toLeaf(i, signature));

    if (this._leaves.length % 2 !== 0) {
      if (throwOnUneven) throw new Error('whitelist entries must be even');
      else {
        this._leaves.push(mtManager.getBlankLeaf(signature));
      }
    }

    const merkleTree = new MerkleTree(
      this._leaves.map(l => mtManager.hashLeaf(l, this._signature)),
      keccak256,
      { sortPairs: true, sortLeaves: false }
    );

    this._baseTree = merkleTree;
  }

  get merkleTree(): MerkleTree {
    return this._baseTree;
  }

  get leaves(): Leaf[] {
    return this._leaves;
  }

  get sourceItems(): TLeafSource[] {
    return this._sourceItems;
  }

  get signature(): LeafSignature {
    return this._signature;
  }

  hashLeafIndex(leafIndex: number): string {
    return mtManager.hashLeaf(this.leaves[leafIndex], this._signature);
  }

  getHexProof(leafIndex: number): string[] {
    return this._baseTree.getHexProof(this.hashLeafIndex(leafIndex));
  }

  getHexRoot(): string {
    return this._baseTree.getHexRoot();
  }
}
