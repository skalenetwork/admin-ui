/**
 * @module
 * Manifest for SKLAE version 3 - Scopes all possible slow-to-never-changing defaults
 * IMA: https://github.com/skalenetwork/IMA/tree/develop/proxy/contracts
 */

import { addresses } from './addresses';

export type NetworkType = 'mainnet' | 'staging';

export type ContractType = 'admin' | 'ima:bridge'; // may scope as ima:subthing

export type ContractManifest = {
  [key: string]: {
    type: ContractType;
    key: string;
    name: string;
    address: `0x${string}`;
  };
};

export const nativeCurrency = {
  decimals: 18,
  name: 'SKALE',
  symbol: 'SKL',
};

export const NETWORK = {
  ETHEREUM: 'ethereum',
  SKALE: 'skale',
} as const;

export const REGISTRY = {
  chainlist: {},
  [NETWORK.SKALE]: {
    baseUrl: 'https://raw.githubusercontent.com',
    path: 'skalenetwork/skale-network/master',
  },
};

export const CONTRACT = {
  CONFIG_CONTROLLER: {
    type: 'admin',
    key: 'schain:config_controller',
    address: addresses.SCHAIN_CONFIG_CONTROLLER_ADDRESS,
    name: 'ConfigController',
  },
  MULTISIG_WALLET: {
    type: 'admin',
    key: 'schain:multisig_wallet',
    address: addresses.SCHAIN_MULTISIG_WALLET_ADDRESS,
    name: 'MultisigWallet',
  },
  MARIONETTE: {
    type: 'admin',
    key: 'schain:marionette',
    address: addresses.SCHAIN_MARIONETTE_ADDRESS,
    name: 'Marionette',
  },
  CONTEXT: {
    type: 'admin',
    key: 'schain:context',
    address: addresses.SCHAIN_CONTEXT_ADDRESS,
    name: 'Context',
  },
  ETHERBASE: {
    type: 'admin',
    key: 'schain:etherbase',
    address: addresses.SCHAIN_ETHERBASE_ADDRESS,
    name: 'Etherbase',
  },
} as const satisfies ContractManifest;

export const getChainMetadataUrl = (networkType: NetworkType) => {
  const { path, baseUrl } = REGISTRY[NETWORK.SKALE];
  return `${baseUrl}/${path}/metadata/${networkType}/chains.json`;
};

/**
 * @todo bring associated chain metadata if needed (icons etc)
 * https://github.com/skalenetwork/skale-network/blob/master/metadata/mainnet/chains.json
 */
