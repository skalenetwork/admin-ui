/**
 * @module ConstantABI
 * @description Constant ABIs are the strongest future candidate for a transpile target
 */

import { CONTRACT } from '@/features/network/contract';
import { getContract, Provider } from '@wagmi/core';
import {
  Abi,
  AbiError,
  AbiEvent,
  AbiFunction,
  AbiStateMutability,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype';
import { ConfigControllerABI } from './abi-configcontroller';
import mainnetImaUnion from './abi-ima-mainnet.union';
import schainImaUnion from './abi-ima.union';
import { MarionetteABI } from './abi-marionette';
import { MultisigWalletABI } from './abi-multisigwallet';

/**
 * @todo type(s) for autogen wrapper with named parameters around ethers contract functions
 * constructibe with abitype
 **/
/// BEGIN
type AbiFunctionInputNames<
  I extends Abi,
  F extends ExtractAbiFunctionNames<I, AbiStateMutability>,
> = ExtractAbiFunction<I, F>['inputs'];

type AbiFunctionParams<
  I extends Abi,
  F extends ExtractAbiFunctionNames<I, AbiStateMutability>,
> = {
  [Input in AbiFunctionInputNames<I, F>[number] as Input['name'] extends string
    ? Input['name']
    : '']: Input['type'];
};
/// END

export type ContractManifestId = keyof typeof CONTRACT;

export type GetAbiProps<T> = { id: T };

export type ContractName<K extends ContractManifestId> = Lowercase<
  (typeof CONTRACT)[K]['name']
>;

type RelaxedAbi = Readonly<
  (Omit<AbiFunction, 'stateMutability'> | AbiEvent | AbiError)[]
>;

/**
 * @description If not satisfied it means some ABIs are missing
 * @todo For strict ABI checking, change RelaxedAbi to Abi type
 */
export const ABI = {
  CONFIG_CONTROLLER: ConfigControllerABI,
  MULTISIG_WALLET: MultisigWalletABI,
  MARIONETTE: MarionetteABI,
  TOKEN_MANAGER_ERC20: schainImaUnion['token_manager_erc20_abi'],
  TOKEN_MANAGER_ERC721: schainImaUnion['token_manager_erc721_abi'],
  TOKEN_MANAGER_ERC1155: schainImaUnion['token_manager_erc1155_abi'],
  TOKEN_MANAGER_ETH: schainImaUnion['token_manager_eth_abi'],
  TOKEN_MANAGER_LINKER: schainImaUnion['token_manager_linker_abi'],
  COMMUNITY_LOCKER: schainImaUnion['community_locker_abi'],
  DEPOSIT_BOX_ETH: mainnetImaUnion['deposit_box_eth_abi'],
  DEPOSIT_BOX_ERC20: mainnetImaUnion['deposit_box_erc20_abi'],
  DEPOSIT_BOX_ERC721: mainnetImaUnion['deposit_box_erc721_abi'],
  DEPOSIT_BOX_ERC1155: mainnetImaUnion['deposit_box_erc1155_abi'],
  LINKER: mainnetImaUnion['linker_abi'],
} as const satisfies {
  [key in keyof typeof CONTRACT]: RelaxedAbi;
};

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
false &&
  function importAbi<T extends ContractManifestId>({ id }: GetAbiProps<T>) {
    const lowerName = CONTRACT[id].name.toLocaleLowerCase() as ContractName<T>;
    const path = `./abi-${lowerName}` as const;
    // will require a default export from abi-*.ts when used
    /* @vite-ignore */
    return import(path).then((x) => x.default);
  };

/**
 * Create contract with methods
 * @todo implement around stubbornness of AbiType, use AbiFunctionParams
 */
export function createContractWithMethods({
  address,
  abi,
  provider,
}: {
  address: string;
  abi: Abi;
  provider: Provider;
}) {
  const functions = abi.filter((a) => a.type === 'function');

  const contract = getContract({
    address,
    abi,
    signerOrProvider: provider,
  });

  contract.methods = {};
}
