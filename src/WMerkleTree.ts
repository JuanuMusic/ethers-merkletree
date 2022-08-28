import keccak256 from 'keccak256';
import MerkleTree from 'merkletreejs';
import mtManager, {
  LeafSignature,
  LeafSourceObject,
  LeafValues,
  ObjectValue,
} from '.';

export type WMerkleTreeOptions = {
  sortPairs?: boolean;
  sortLeaves?: boolean;
  throwOnUneven?: boolean;
};

export default class WMerkleTree<TLeafSource extends LeafSourceObject> {
  private _baseTree: MerkleTree;
  private _leaves: LeafValues[];
  private _sourceItems: TLeafSource[];
  private _signature: LeafSignature;

  constructor(
    sourceItems: TLeafSource[],
    signature: LeafSignature,
    options: WMerkleTreeOptions = {
      sortPairs: true,
      sortLeaves: false,
      throwOnUneven: false,
    }
  ) {
    if (sourceItems.length === 0) throw new Error('Invalid empty whitelist');
    this._sourceItems = sourceItems;

    if (signature.length == 0)
      throw new Error('Invalid empty signature definition');
    this._signature = signature;

    this._leaves = sourceItems.map(i =>
      mtManager.getObjectValues(i, signature)
    );

    if (this._leaves.length % 2 !== 0) {
      if (options.throwOnUneven)
        throw new Error('whitelist entries must be even');
      else {
        this._leaves.push(mtManager.getBlankLeaf(signature));
      }
    }

    // Initialize base merkle tree
    this._baseTree = new MerkleTree(
      this._leaves.map(l => mtManager.hashLeaf(l, this._signature)),
      keccak256,
      { sortPairs: options.sortPairs, sortLeaves: options.sortLeaves }
    );
  }

  get merkleTree(): MerkleTree {
    return this._baseTree;
  }

  get leaves(): LeafValues[] {
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
