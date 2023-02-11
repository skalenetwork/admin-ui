/**
 * @module
 * Manifest for SKLAE version 3 - Scopes all possible slow-to-never-changing defaults
 * IMA: https://github.com/skalenetwork/IMA/tree/develop/proxy/contracts
 */

import { ABI } from '@/features/network/abi/abi';
import { CONTRACT, ContractId } from '@/features/network/contract';
import { NetworkType } from '@/features/network/types';
import { Address } from 'abitype';
import { NETWORK } from './constants';

export { CONTRACT } from './contract';
export type { ContractId } from './contract';

export const nativeCurrency = {
  decimals: 18,
  name: 'SKALE',
  symbol: 'SKL',
};

export const OFFCHAIN = {
  chainlist: {},
  [NETWORK.SKALE]: {
    baseUrl: 'https://raw.githubusercontent.com',
    path: 'skalenetwork/skale-network/master',
  },
};

export const build = {
  chainMetadataUrl(networkType: NetworkType) {
    const { path, baseUrl } = OFFCHAIN[NETWORK.SKALE];
    return `${baseUrl}/${path}/metadata/${networkType}/chains.json`;
  },
  addressAbiPair(contractId: ContractId, address?: Address) {
    return {
      address: CONTRACT[contractId].address,
      abi: ABI[contractId],
    };
  },
};

/**
 * @todo bring associated chain metadata if needed (icons etc)
 * more suitable for runtime
 * https://github.com/skalenetwork/skale-network/blob/master/metadata/mainnet/chains.json
 */
