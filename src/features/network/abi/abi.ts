/**
 * register TS ABIs
 */

import { CONTRACT } from '@/features/network/manifest';

import { ConfigControllerABI } from './abi-configcontroller';
import { MultisigWalletABI } from './abi-multisigwallet';
import { MarionetteABI } from './abi-marionette';

// later better to come from autogen out of IMA releases
// impl side on skale.js
import unionIMA from './abi-ima.union';

export type ContractManifestId = keyof typeof CONTRACT;

export type GetAbiProps<T> = { id: T };

export type ContractName<K extends ContractManifestId> = Lowercase<
  (typeof CONTRACT)[K]['name']
>;

export const ABI = {
  CONFIG_CONTROLLER: ConfigControllerABI,
  MULTISIG_WALLET: MultisigWalletABI,
  MARIONETTE: MarionetteABI,
  TOKEN_MANAGER_ERC20: unionIMA['token_manager_erc20_abi'],
  TOKEN_MANAGER_ERC721: unionIMA['token_manager_erc721_abi'],
  TOKEN_MANAGER_ERC1155: unionIMA['token_manager_erc1155_abi'],
  TOKEN_MANAGER_ETH: unionIMA['token_manager_eth_abi'],
  TOKEN_MANAGER_LINKER: unionIMA['token_manager_linker_abi'],
} as const satisfies { [key in ContractManifestId]: [] };

export type ContractManifestIdAbi = keyof typeof ABI;

/**
 * Get ABI based on app-level contract identifier ex: CONFIG_CONTROLLER
 * @param param0
 * @returns
 */
export function getAbi<T extends ContractManifestIdAbi>({
  id,
}: GetAbiProps<T>) {
  return ABI[id];
}

/**
 * Dynamically import ABI
 * @todo dynamic import return type not inferring, deprecate if not possible
 * @param param0
 * @returns
 */
export function importAbi<T extends ContractManifestId>({
  id,
}: GetAbiProps<T>) {
  const lowerName = CONTRACT[id].name.toLocaleLowerCase() as ContractName<T>;
  const path = `./abi-${lowerName}` as const;
  // will require a default export from abi-*.ts when used
  return import(path).then((x) => x.default);
}
