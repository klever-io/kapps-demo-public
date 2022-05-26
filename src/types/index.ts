//Account ===============================================================

export interface IAccount {
  address: string;
  nonce: number;
  rootHash: string;
  balance: number;
  allowance: number;
  timestamp: number;
  assets: {
    [key: string]: IAccountAsset;
  };
}

export interface IAccountAsset {
  address: string;
  assetId: string;
  assetType: number;
  balance: number;
  precision: number;
  assetName: string;
  frozenBalance: number;
  lastClaim: {
    timestamp: number;
    epoch: number;
  };
  buckets?: IBucket[];
}

export interface IBucket {
  id: string;
  stakeAt: number;
  stakedEpoch: number;
  unstakedEpoch: number;
  balance: number;
  delegation: string;
}

// Assets ======================================================================

export interface IAsset {
  assetType: string;
  assetId: string;
  name: string;
  ticker: string;
  ownerAddress: string;
  logo: string;
  uris?: any;
  precision: number;
  initialSupply: number;
  circulatingSupply: number;
  maxSupply: number;
  mintedValue: number;
  burntValue: number;
  issueDate: number;
  royalties?: {
    [address: string]: string;
  };
  properties: IProperties;
  attributes?: {
    isPaused: boolean;
    isNFTMintStopped: boolean;
  };
  roles?: IRolesInfo[];
  ito?: {
    isActive: boolean;
    maxAmount: number;
    mintedAmount: number;
    receiverAddress: string;
    packData: {
      key: string;
      packs: IPack[];
    }[];
  };
}

interface IProperties {
  canFreeze: boolean;
  canWipe: boolean;
  canPause: boolean;
  canMint: boolean;
  canBurn: boolean;
  canChangeOwner: boolean;
  canAddRoles: boolean;
}

export interface IRolesInfo {
  address: string;
  hasRoleMint: boolean;
  hasRoleSetITOPrices: boolean;
}
export interface IPack {
  name: string;
  amount: number;
  description: string;
  url: string;
  price: number;
}
// Marketplace =================================================================

export interface IMarketplace {
  id: string;
  name?: string;
  ownerAddress?: string;
  referralAddress?: string;
  referralPercentage?: number;
}

// Requests ====================================================================

export interface IResponse {
  data: any;
  code: string;
  error: string;
  pagination: IPagination;
}

export interface IPagination {
  next: number;
  previous: number;
  perPage: number;
  totalPages: number;
  totalRecords: number;
}

interface IReceipt {
  assetId: string;
  from: string;
  to: string;
  type: number;
  value: string;
}

interface IContract {
  type: number;
  typeString: string;
  parameter: any;
}
export interface ITransactionResponse extends IResponse {
  data: {
    transaction: {
      hash: string;
      blockNum: number;
      sender: string;
      nonce: number;
      timestamp: number;
      kAppFee: number;
      bandwidthFee: number;
      status: string;
      resultCode: string;
      version: number;
      chainID: string;
      signature: string;
      searchOrder: number;
      receipts: IReceipt[];
      contracts: IContract[];
    };
  };
}

export interface IBroadcastResponse {
  txCount: number;
  txHashes: string[];
}

export interface IAddressResponse extends IResponse {
  data: {
    account: IAccount;
  };
}

export interface ICollectionResponse extends IResponse {
  data: {
    collection: IAccountAsset[];
  };
}
