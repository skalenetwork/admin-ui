/**
 * @module ConstantABI
 * @description Constant ABIs are the strongest future candidate for a transpile target
 */

import { CONTRACT, ContractId } from '@/features/network/contract';
import { Abi, AbiError, AbiEvent, AbiFunction } from 'abitype';
import ConfigControllerABI from './abi-config_controller';
import FileStorageABI from './abi-filestorage';
import mainnetImaUnion from './abi-ima-mainnet.union';
import schainImaUnion from './abi-ima.union';
import MarionetteABI from './abi-marionette';
import MultisigWalletABI from './abi-multisig_wallet';
import skaleManagerUnion from './abi-skale_manager.union';

export type ContractName<K extends ContractId> = Lowercase<
  (typeof CONTRACT)[K]['name']
>;

type RelaxedAbi = Readonly<
  (Omit<AbiFunction, 'stateMutability'> | AbiEvent | AbiError)[]
>;

/**
 * @description Must be satisfied to ensure feature / type availability in dev and runtime
 * Not satisfied on removing RelaxedAbi will show invalid ABIs
 * always 100% export as const to avoid nonsensical exceptions with indexing
 */
export const ABI = {
  PROXY_ADMIN: schainImaUnion['proxy_admin_abi'],
  FILESTORAGE: FileStorageABI,
  CONFIG_CONTROLLER: ConfigControllerABI,
  MULTISIG_WALLET: MultisigWalletABI,
  MARIONETTE: MarionetteABI,
  MESSAGE_PROXY_MAINNET_ON_MAINNET:
    mainnetImaUnion['message_proxy_mainnet_abi'],
  MESSAGE_PROXY_MAINNET_ON_TESTNET:
    mainnetImaUnion['message_proxy_mainnet_abi'],
  MESSAGE_PROXY_SCHAIN: schainImaUnion['message_proxy_chain_abi'],
  MANAGER_WALLETS_ON_MAINNET: skaleManagerUnion['wallets_abi'],
  MANAGER_WALLETS_ON_TESTNET: skaleManagerUnion['wallets_abi'],
  TOKEN_MANAGER_ERC20: schainImaUnion['token_manager_erc20_abi'],
  TOKEN_MANAGER_ERC721: schainImaUnion['token_manager_erc721_abi'],
  TOKEN_MANAGER_ERC721_WITH_METADATA:
    schainImaUnion['token_manager_erc721_with_metadata_abi'],
  TOKEN_MANAGER_ERC1155: schainImaUnion['token_manager_erc1155_abi'],
  TOKEN_MANAGER_ETH: schainImaUnion['token_manager_eth_abi'],
  TOKEN_MANAGER_LINKER: schainImaUnion['token_manager_linker_abi'],
  COMMUNITY_LOCKER: schainImaUnion['community_locker_abi'],
  COMMUNITY_POOL: mainnetImaUnion['community_pool_abi'],
  DEPOSIT_BOX_ETH: mainnetImaUnion['deposit_box_eth_abi'],
  DEPOSIT_BOX_ERC20: mainnetImaUnion['deposit_box_erc20_abi'],
  DEPOSIT_BOX_ERC721: mainnetImaUnion['deposit_box_erc721_abi'],
  DEPOSIT_BOX_ERC1155: mainnetImaUnion['deposit_box_erc1155_abi'],
  LINKER: mainnetImaUnion['linker_abi'],
  DEPOSIT_BOX_ERC721_WITH_METADATA:
    mainnetImaUnion['deposit_box_erc721_with_metadata_abi'],
} as const satisfies {
  [key in ContractId as ContractId]: Abi | RelaxedAbi;
};

export type ContractIdWithAbi = keyof typeof ABI;

/**
 * Get ABI based on app-level contract identifier ex: CONFIG_CONTROLLER
 * @param param0
 * @returns
 */

export function getAbi<T extends ContractId>(id: T): (typeof ABI)[T] {
  return ABI[id] as (typeof ABI)[T];
}
