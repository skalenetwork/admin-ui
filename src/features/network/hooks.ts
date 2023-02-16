/**
 * @namespace Network
 * @module NetworkHooks
 * @description Low-level hooks for using network contracts, roles, explorers etc.
 */

import { API, getApi } from '@/features/network/api';
import { NETWORK } from '@/features/network/literals';
import { ChainManifestItem, NetworkType } from '@/features/network/types';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getContract, getProvider } from '@wagmi/core';
import { Abi, ExtractAbiEventNames } from 'abitype';
import { useEffect, useMemo, useState } from 'react';
import {
  Address,
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from 'wagmi';
import { ABI, ContractIdWithAbi, getAbi, GetAbiProps } from './abi/abi';
import type {
  ContractDetailList,
  ContractId,
  ContractIdByAddress,
} from './contract';
import { build, CONTRACT } from './manifest';

const { chainMetadataUrl } = build;

const MODULES = [
  'account',
  'stats',
  'transaction',
  'logs',
  'block',
  'token',
  'contract',
] as const;

type ExplorerProps = {
  module: (typeof MODULES)[number];
  action: 'listaccounts' | 'getLogs' | string;
  args?: {
    [key: string]: string;
  };
};

/**
 * Use API of the block explorer as configured by the chain
 * @param param0
 * @returns
 */
export function useExplorer(requests: ExplorerProps[]) {
  const { chain } = useNetwork();
  const baseUrl = chain?.blockExplorers?.default.url;

  const queries = requests.map((request: ExplorerProps) => {
    const { module, action, args } = request;
    const queryString = new URLSearchParams(args).toString();
    const url =
      baseUrl +
      `api?module=${module}&action=${action}${
        queryString ? '&' + queryString : ''
      }`;
    return {
      queryKey: [chain?.id, module, action, args],
      queryFn: () => fetch(url).then((res) => res.json()),
    };
  });
  return useQueries({
    queries,
  });
}

export function useEvents<
  TAddress extends ContractDetailList['address'],
  TContractId extends ContractIdByAddress<TAddress>,
  TAbi extends (typeof ABI)[TContractId],
>({
  address,
  fromBlock,
  toBlock,
  blockHash,
  eventNames,
}: {
  address: TAddress;
  fromBlock?: number | string;
  toBlock?: number | string;
  blockHash?: string;
  eventNames: TAddress extends ContractDetailList['address']
    ? TAbi extends Abi
      ? ExtractAbiEventNames<TAbi>[]
      : string[]
    : string[];
}) {
  const contractId = build.contractIdFromAddress(address);
  const { contract } = useTypedContract({ id: contractId });
  const abi = getAbi({
    id: contractId,
  });

  const [streamEvents, setStreamEvents] = useState([]);

  const pastEvents = useQueries({
    queries: eventNames.map((eventName) => {
      return {
        enabled: Boolean(contract && contract.provider),
        queryKey: ['logs', address, eventName],
        queryFn: () => {
          if (!contract) return [];
          const filter = contract.filters[eventName]();
          return contract?.queryFilter(filter, fromBlock, toBlock);
        },
      };
    }),
  });

  // eventNames.map((eventName) => {
  //   const filter = contract?.filters[eventName]();
  //   contract?.on({ ...filter, fromBlock, toBlock }, (event) => {
  //     console.log(events);
  //     setStreamEvents((events) => [...events, event]);
  //   });
  // });

  return {
    pastEvents,
    streamEvents,
  };
}

export function useRoles({ address }: { address: Address }) {}

export function useChainMetadata({
  networkType,
}: {
  networkType: NetworkType;
}) {
  const { data, isError } = useQuery({
    queryKey: ['offchain', `metadata:${networkType}`] as const,
    queryFn: (): Promise<{ [key: string]: ChainManifestItem }> => {
      return fetch(chainMetadataUrl(networkType)).then((res) => res.json());
    },
  });
  return { data, isError };
}

export function useAbi<T extends ContractIdWithAbi>({ id }: GetAbiProps<T>) {
  const { data } = useQuery({
    queryKey: ['*', 'abi', id],
    queryFn: () => getAbi({ id }),
  });
  return data;
}

export function getContractProvider<T extends ContractId>({
  id,
  chains,
  chain,
}: {
  id: T;
  chains: ReturnType<typeof useNetwork>['chains'];
  chain: ReturnType<typeof useNetwork>['chain'];
}) {
  if (!chain) return;

  const { network: contractNetwork } = CONTRACT[id];
  let chainId;

  // verbose for intuition

  if (chain.network === NETWORK.SKALE) {
    if (contractNetwork === NETWORK.SKALE) {
      chainId = chain.id;
    } else {
      chainId = chains.find((c) => chain.network === c.network)?.id;
    }
  } else if (chain.network === NETWORK.ETHEREUM) {
  } else {
    return;
  }

  return getProvider({
    chainId,
  });
}

export function useContractProvider<T extends ContractId>({ id }: { id: T }) {
  const { chain, chains } = useNetwork();
  return getContractProvider({
    id,
    chain,
    chains,
  });
}

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @param param0
 * @returns
 */
export function useTypedContract<T extends ContractIdWithAbi>({
  id,
}: {
  id: T;
}): {
  address?: (typeof CONTRACT)[T]['address'];
  abi?: (typeof ABI)[T];
  contract?: ReturnType<typeof useContract<(typeof ABI)[T]>>;
} {
  const { address } = CONTRACT[id];
  const abi = useAbi({
    id,
  });

  const provider = useContractProvider({ id });

  const contract = useContract({
    address,
    abi,
    signerOrProvider: provider,
  });

  return {
    address,
    abi,
    contract,
  };
}

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @description Fetches a list of contracts, for a single, prefer useTypedContract
 * @param param0
 * @returns
 */
export function useTypedContracts<T extends ContractIdWithAbi>({
  id,
}: {
  id: T[];
}): {
  contractId: T;
  address?: (typeof CONTRACT)[T]['address'];
  abi?: (typeof ABI)[T];
  contract?: ReturnType<typeof useContract<(typeof ABI)[T]>>;
}[] {
  const connectedProvider = useProvider();
  const mainnetProvider = getProvider({ chainId: 1 });

  return useMemo(
    () =>
      id
        ? id.map((contractId, index) => {
            const { address, network } = CONTRACT[contractId];

            let abi, contract;

            try {
              abi = getAbi({
                id: contractId,
              });
            } catch (e) {
              console.error(e);
            }

            const provider =
              network === NETWORK.SKALE ? connectedProvider : mainnetProvider;

            contract =
              abi &&
              getContract({
                address,
                abi,
                signerOrProvider: provider,
              });

            return {
              contractId,
              address,
              abi,
              contract,
            };
          })
        : [],
    [connectedProvider],
  );
}

/**
 * Use predeployed contract SDK wrapper instance
 * @todo make consistent with useTypedContract signature
 * @todo after wrapper registration in manifest: refactor to remove injection
 * @todo consider consuming useTypedContract within
 * @param param0
 * @returns
 */
export function useContractApi<T extends keyof typeof API>({ id }: { id: T }) {
  const { chain } = useNetwork();
  const {
    data: signer,
    isError: signerIsError,
    isLoading: signerIsLoading,
  } = useSigner();
  const { address } = useAccount();
  const provider = useContractProvider({ id });

  const connected = chain ? chain.network === NETWORK.SKALE : false;

  const api = useMemo(() => {
    return chain && signer && provider && id
      ? getApi(id, {
          chain,
          provider,
          signer,
        })
      : undefined;
  }, [id, connected, chain?.id, signer, provider]);

  useEffect(() => {
    try {
      // @ts-ignore
      address && api?.setSigner?.({ signer });
    } catch (e) {}
  }, [address, api]);

  return { connected, chainId: chain?.id, signer, api };
}

/**
 * useContract with methods API i.e. functionName({...}: { [arg_name]: [arg_type] })
 */
function useContractWithApi() {}
