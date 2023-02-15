/**
 * @namespace Network
 * @module Manifest
 * Manifest for SKLAE version 3 - Scopes all possible slow-to-never-changing defaults
 * IMA: https://github.com/skalenetwork/IMA/tree/develop/proxy/contracts
 */

import { ABI } from '@/features/network/abi/abi';
import {
  CONTRACT,
  ContractDetailList,
  ContractId,
  ContractIdByAddress,
} from '@/features/network/contract';
import { NetworkType } from '@/features/network/types';
import { Address } from 'abitype';
import { NETWORK } from './literals';
export { CONTRACT } from './contract';
export type { ContractId } from './contract';

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
  contractIdFromAddress<TAddress extends ContractDetailList['address']>(
    address: TAddress,
  ): ContractIdByAddress<TAddress> {
    return Object.keys(CONTRACT).find(
      (key) => CONTRACT[key].address === address,
    ) as ContractIdByAddress<TAddress>;
  },
  contractEntries(): [ContractId, ContractDetailList] {},
};

/**
 * @todo bring associated chain metadata if needed (icons etc)
 * more suitable for runtime
 * https://github.com/skalenetwork/skale-network/blob/master/metadata/mainnet/chains.json
 */
