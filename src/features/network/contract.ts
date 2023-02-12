import * as ADDRESS from '@/features/network/address';
import { NETWORK } from '@/features/network/constants';
import { ContractType } from '@/features/network/types';

export type ContractManifest = {
  [key: string]: {
    network: (typeof NETWORK)[keyof typeof NETWORK];
    type: ContractType;
    key: string;
    name: string;
    address: `0x${string}`;
  };
};

const CONTRACT_INACTIVE = {
  CONTEXT: {
    network: NETWORK.SKALE,
    type: 'sudo',
    key: 'schain:context',
    address: ADDRESS.SCHAIN_CONTEXT_ADDRESS,
    name: 'Context',
  },
  ETHERBASE: {
    network: NETWORK.SKALE,
    type: 'sudo',
    key: 'schain:etherbase',
    address: ADDRESS.SCHAIN_ETHERBASE_ADDRESS,
    name: 'Etherbase',
  },
};

export const CONTRACT = {
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
    name: 'MultisigWallet',
  },
  MARIONETTE: {
    network: NETWORK.SKALE,
    type: 'sudo',
    key: 'schain:marionette',
    address: ADDRESS.SCHAIN_MARIONETTE_ADDRESS,
    name: 'Marionette',
  },
  TOKEN_MANAGER_ETH: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanagereth',
    address: ADDRESS.TOKEN_MANAGER_ETH_ADDRESS,
    name: 'TokenManagerEth',
  },
  TOKEN_MANAGER_ERC20: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager20',
    address: ADDRESS.TOKEN_MANAGER_ERC20_ADDRESS,
    name: 'TokenManagerERC20',
  },
  TOKEN_MANAGER_ERC721: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager721',
    address: ADDRESS.TOKEN_MANAGER_ERC721_ADDRESS,
    name: 'TokenManagerERC721',
  },
  TOKEN_MANAGER_ERC1155: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanager1155',
    address: ADDRESS.TOKEN_MANAGER_ERC1155_ADDRESS,
    name: 'TokenManagerERC1155',
  },
  TOKEN_MANAGER_LINKER: {
    network: NETWORK.SKALE,
    type: 'ima:bridge',
    key: 'schain:tokenmanagerlinker',
    address: ADDRESS.TOKEN_MANAGER_LINKER_ADDRESS,
    name: 'TokenManagerLinker',
  },
} as const satisfies ContractManifest;

export type ContractId = keyof typeof CONTRACT;
