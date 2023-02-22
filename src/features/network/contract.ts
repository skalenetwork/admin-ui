/**
 * @namespace Network
 * @module ManifestContract
 * @description The most primitive contract registry, various properties allow any kind of generative types, SDKs, and scopes for query management
 */

import * as ADDRESS from '@/features/network/address';
import { NETWORK } from '@/features/network/literals';

import type { Entries } from 'type-fest';

import mainnetImaUnion from './abi/abi-ima-mainnet.union';

type SwapKeyValue<
  T extends Record<string, S>,
  S extends { address: string },
> = {
  [K in keyof T as T[K]['address']]: K;
};

namespace ContractManifestBase {
  export type ContractType = 'sudo' | 'ima:bridge' | 'ima:message' | 'storage';
  export type Item = {
    [key: string]: {
      network: (typeof NETWORK)[keyof typeof NETWORK];
      type: ContractType;
      key: string;
      name: string;
      address: `0x${string}`;
    };
  };
}

/**
 * An important iteration would be to make the network field an array
 * example [NETWORK.GOERLI, NETWORK.ETHEREUM]
 * NETWORK is a direct match of `Chain.network` and used as a comparison filter
 * this will require minor refactor in network hooks and libs
 */

const CONTRACT_INACTIVE = {
  MESSAGE_PROXY_MAINNET: {
    network: NETWORK.ETHEREUM,
    type: 'ima:message',
    key: 'foreign:message_proxy',
    address: ADDRESS.MESSAGE_PROXY_MAINNET_ADDRESS,
    name: 'MessageProxyForMainnet', // to confirm
  },
  MESSAGE_PROXY_SCHAIN: {
    network: NETWORK.SKALE,
    type: 'ima:message',
    key: 'schain:message_proxy',
    address: ADDRESS.MESSAGE_PROXY_FOR_SCHAIN_ADDRESS,
    name: 'MessageProxyForSchain', // to confirm
  },
} satisfies ContractManifestBase.Item;

export const CONTRACT = {
  FILESTORAGE: {
    network: NETWORK.SKALE,
    type: 'storage',
    key: 'schain:filestorage',
    address: ADDRESS.FILESTORAGE_ADDRESS,
    name: 'FileStorage',
  },
  CONFIG_CONTROLLER: {
    network: NETWORK.SKALE,
    type: 'sudo',
    key: 'schain:config_controller',
    address: ADDRESS.SCHAIN_CONFIG_CONTROLLER_ADDRESS,
    name: 'ConfigController',
  },
  MULTISIG_WALLET: {
    network: NETWORK.SKALE,
    type: 'sudo',
    key: 'schain:multisig_wallet',
    address: ADDRESS.SCHAIN_MULTISIG_WALLET_ADDRESS,
    name: 'MultiSigWallet',
  },
  MARIONETTE: {
    network: NETWORK.SKALE,
    type: 'sudo',
    key: 'schain:marionette',
    address: ADDRESS.SCHAIN_MARIONETTE_ADDRESS,
    name: 'Marionette',
  },
  COMMUNITY_POOL: {
    network: NETWORK.ETHEREUM,
    type: 'sudo',
    key: 'foreign:community:pool',
    address: mainnetImaUnion['community_pool_address'],
    name: 'CommunityPool',
  },
  COMMUNITY_LOCKER: {
    network: NETWORK.SKALE,
    type: 'sudo',
    key: 'schain:community:locker',
    address: ADDRESS.COMMUNITY_LOCKER_ADDRESS,
    name: 'CommunityLocker',
  },
  TOKEN_MANAGER_ETH: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:eth',
    address: ADDRESS.TOKEN_MANAGER_ETH_ADDRESS,
    name: 'TokenManagerEth',
  },
  TOKEN_MANAGER_ERC20: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:erc20',
    address: ADDRESS.TOKEN_MANAGER_ERC20_ADDRESS,
    name: 'TokenManagerERC20',
  },
  TOKEN_MANAGER_ERC721: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:erc721',
    address: ADDRESS.TOKEN_MANAGER_ERC721_ADDRESS,
    name: 'TokenManagerERC721',
  },
  TOKEN_MANAGER_ERC721_WITH_METADATA: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:erc721_with_metadata',
    address: ADDRESS.TOKEN_MANAGER_ERC721_WITH_METADATA_ADDRESS,
    name: 'TokenManagerERC721WithMetadata',
  },
  TOKEN_MANAGER_ERC1155: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:erc1155',
    address: ADDRESS.TOKEN_MANAGER_ERC1155_ADDRESS,
    name: 'TokenManagerERC1155',
  },
  TOKEN_MANAGER_LINKER: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:linker',
    address: ADDRESS.TOKEN_MANAGER_LINKER_ADDRESS,
    name: 'TokenManagerLinker',
  },
  DEPOSIT_BOX_ETH: {
    network: NETWORK.ETHEREUM,
    type: 'ima:bridge',
    key: 'foreign:depositbox:eth',
    address: ADDRESS.DEPOSIT_BOX_ETH_ADDRESS,
    name: 'DepositBoxEth',
  },
  DEPOSIT_BOX_ERC20: {
    network: NETWORK.ETHEREUM,
    type: 'ima:bridge',
    key: 'foreign:depositbox:erc20',
    address: mainnetImaUnion['deposit_box_erc20_address'],
    name: 'DepositBoxERC20',
  },
  DEPOSIT_BOX_ERC721: {
    network: NETWORK.ETHEREUM,
    type: 'ima:bridge',
    key: 'foreign:depositbox:erc721',
    address: mainnetImaUnion['deposit_box_erc721_address'],
    name: 'DepositBoxERC721',
  },
  DEPOSIT_BOX_ERC721_WITH_METADATA: {
    network: NETWORK.ETHEREUM,
    type: 'ima:bridge',
    key: 'foreign:depositbox:erc721_with_metadata',
    address: mainnetImaUnion['deposit_box_erc721_with_metadata_address'],
    name: 'DepositBoxERC721WithMetadata',
  },
  DEPOSIT_BOX_ERC1155: {
    network: NETWORK.ETHEREUM,
    type: 'ima:bridge',
    key: 'foreign:depositbox:erc1155',
    address: mainnetImaUnion['deposit_box_erc1155_address'],
    name: 'DepositBoxERC1155',
  },
  LINKER: {
    network: NETWORK.ETHEREUM,
    type: 'ima:bridge',
    key: 'foreign:linker',
    address: mainnetImaUnion['linker_address'],
    name: 'Linker',
  },
} as const satisfies ContractManifestBase.Item;

export type ContractManifest = typeof CONTRACT;

export type ContractId = keyof ContractManifest;

export type ContractDetailList = ContractManifest[ContractId];

export type ContractDetail<TContractId extends ContractId> =
  ContractManifest[TContractId];

export type ContractDetailField = keyof ContractDetailList;

// @todo implement object swap
type ExtractContractId<
  T extends ContractDetailField,
  U extends ContractDetailList[T],
  //@ts-ignore
> = SwapKeyValue<U, ContractManifest, ContractDetailList>[U];

export type ContractIdByAddress<T extends ContractDetailList['address']> =
  SwapKeyValue<ContractManifest, ContractManifest[ContractId]>[T];

// export type ContractDetailsByAddress<TAddress extends ContractList['address']> =
//   ContractManifest[ContractId];

export const SContractEntries = Object.entries(
  CONTRACT,
) as Entries<ContractManifest>;

export function getSContractProp<
  TContractId extends ContractId,
  TProp extends keyof ContractManifest[TContractId],
>(id: TContractId, prop: TProp): ContractManifest[TContractId][TProp] {
  return CONTRACT[id]?.[prop];
}

export function compareSContractProp<
  TContractId extends ContractId,
  TProp extends keyof ContractManifest[TContractId],
>(id: TContractId, prop: TProp, predicate: string): boolean {
  return CONTRACT[id]?.[prop] === predicate;
}
