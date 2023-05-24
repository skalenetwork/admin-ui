/**
 * @namespace Network
 * @module ManifestContract
 * @description The most primitive contract registry, various properties allow any kind of generative types, SDKs, and scopes for query management
 */

import * as ADDRESS from '@/features/network/address';
import { NETWORK } from '@/features/network/literals';

import type { Entries } from 'type-fest';

import mainnetImaUnion from './abi/abi-ima-mainnet.union';
import schainImaUnion from './abi/abi-ima.union';

type SwapKeyValue<
  T extends Record<string, S>,
  S extends { address: string },
> = {
  [K in keyof T as T[K]['address']]: K;
};

namespace ContractManifestBase {
  export type ContractType =
    | 'sudo'
    | 'sudo:manager'
    | 'ima:bridge'
    | 'ima:message'
    | 'storage'
    | 'standard';
  export type Item<TContractType = ContractType> = {
    [key: string]: {
      network: (typeof NETWORK)[keyof typeof NETWORK];
      type: TContractType;
      key: string;
      name: string;
      address: TContractType extends 'standard' ? undefined : `0x${string}`;
    };
  };
}

/**
 * NETWORK is a direct match of `Chain.network` and used as a comparison filter
 *
 * @later if needed a multinetwork supporting nested schema of CONTRACT manifest
 * example: { FILESTORAGE: { 'common': {type, key, name}, [NETWORK.NAME]: {...overrides, address} } }
 * will require refactoring in:
 * - getter functions in this module
 * - manifest.build to fully use getters from here
 * - network/hooks to fully use getters from here
 * - few direct CONTRACT references across the project to be replaced with getters here
 */

export const CONTRACT = {
  PROXY_ADMIN: {
    network: NETWORK.SKALE,
    type: 'sudo',
    key: 'schain:proxy_admin',
    address: ADDRESS.PROXY_ADMIN_ADDRESS,
    name: 'ProxyAdmin',
  },
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
  MESSAGE_PROXY_MAINNET_ON_MAINNET: {
    network: NETWORK.ETHEREUM,
    type: 'ima:message',
    key: 'foreign:message_proxy',
    address: '0x8629703a9903515818C2FeB45a6f6fA5df8Da404',
    name: 'MessageProxyForMainnet',
  },
  MESSAGE_PROXY_MAINNET_ON_TESTNET: {
    network: NETWORK.GOERLI,
    type: 'ima:message',
    key: 'foreign:message_proxy',
    address: '0x08913E0DC2BA60A1626655581f701bCa84f42324',
    name: 'MessageProxyForMainnet',
  },
  MESSAGE_PROXY_SCHAIN: {
    network: NETWORK.SKALE,
    type: 'ima:message',
    key: 'schain:message_proxy',
    address: schainImaUnion['message_proxy_chain_address'],
    name: 'MessageProxyForSchain',
  },
  MANAGER_WALLETS_ON_MAINNET: {
    network: NETWORK.ETHEREUM,
    type: 'sudo:manager',
    key: 'foreign:wallets',
    address: '0xbAec960713a6c41d391C93AE42128d72C916965f',
    name: 'Wallets',
  },
  MANAGER_WALLETS_ON_TESTNET: {
    network: NETWORK.GOERLI,
    type: 'sudo:manager',
    key: 'foreign:wallets',
    address: '0x8886d506c8C3985B004CE6875da0a106E0725D30',
    name: 'Wallets',
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
    address: schainImaUnion['community_locker_address'],
    name: 'CommunityLocker',
  },
  TOKEN_MANAGER_ETH: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:eth',
    address: schainImaUnion['token_manager_eth_address'],
    name: 'TokenManagerEth',
  },
  TOKEN_MANAGER_ERC20: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:erc20',
    address: schainImaUnion['token_manager_erc20_address'],
    name: 'TokenManagerERC20',
  },
  TOKEN_MANAGER_ERC721: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:erc721',
    address: schainImaUnion['token_manager_erc721_address'],
    name: 'TokenManagerERC721',
  },
  TOKEN_MANAGER_ERC721_WITH_METADATA: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:erc721_with_metadata',
    address: schainImaUnion['token_manager_erc721_with_metadata_address'],
    name: 'TokenManagerERC721WithMetadata',
  },
  TOKEN_MANAGER_ERC1155: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:erc1155',
    address: schainImaUnion['token_manager_erc1155_address'],
    name: 'TokenManagerERC1155',
  },
  TOKEN_MANAGER_LINKER: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager:linker',
    address: schainImaUnion['token_manager_linker_address'],
    name: 'TokenManagerLinker',
  },
  DEPOSIT_BOX_ETH: {
    network: NETWORK.ETHEREUM,
    type: 'ima:bridge',
    key: 'foreign:depositbox:eth',
    address: mainnetImaUnion['deposit_box_eth_address'],
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

export function getSContractDetails<T extends ContractId>(
  id: T,
): ContractDetail<T> {
  return CONTRACT[id] as ContractDetail<T>;
}

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
