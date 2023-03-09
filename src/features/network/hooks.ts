/**
 * @namespace Network
 * @module NetworkHooks
 * @description Low-level hooks for using network contracts, roles, explorers etc.
 */

import { ABI, ContractIdWithAbi, getAbi } from '@/features/network/abi/abi';
import { API, getApi } from '@/features/network/api';
import {
  CONTRACT,
  ContractDetailList,
  ContractId,
  ContractIdByAddress,
  getSContractDetails,
} from '@/features/network/contract';
import { getSContractProvider } from '@/features/network/core';
import { NETWORK } from '@/features/network/literals';
import { build } from '@/features/network/manifest';
import { ChainManifestItem, NetworkType } from '@/features/network/types';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getContract, getProvider } from '@wagmi/core';
import {
  Abi,
  AbiParametersToPrimitiveTypes,
  AbiTypeToPrimitiveType,
  ExtractAbiEventNames,
  ExtractAbiFunction,
} from 'abitype';
import { useEffect, useMemo, useState } from 'react';
import { useAsyncFn } from 'react-use';
import {
  Address,
  useAccount,
  useContract,
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useSigner,
} from 'wagmi';

const { chainMetadataUrl } = build;

export type RoleFragment = {
  type: 'function';
  name: `${string}_ROLE`;
} & (
  | {
      stateMutability: 'view';
    }
  | { constant: true }
);

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
 * Retrieve provider and signer for the network contract
 * @param param0
 * @returns
 */
export function useSContractProvider<T extends ContractId>({ id }: { id: T }) {
  const { chain, chains } = useNetwork();
  const provider = getSContractProvider(id, {
    chain,
    chains,
  });
  const network = useAsyncFn(async () => {
    return provider?.getNetwork();
  });
  const { data: signer } = useSigner({
    chainId: network[0].value?.chainId,
  });
  return {
    provider,
    signer,
  };
}

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @param param0
 * @returns
 */
export function useSContract<
  TContractId extends ContractIdWithAbi,
  TAbi extends (typeof ABI)[TContractId] = (typeof ABI)[TContractId],
>({
  id,
}: {
  id: TContractId;
}): {
  address?: (typeof CONTRACT)[TContractId]['address'];
  abi?: TAbi;
  contract?: ReturnType<typeof useContract<TAbi>>;
} {
  let isError = false;
  let address, abi;
  try {
    address = getSContractDetails(id).address;
    abi = getAbi(id);
  } catch (e) {
    isError = true;
  }
  const { provider, signer } = useSContractProvider({ id });
  const contract = useContract({
    address,
    abi,
    signerOrProvider: signer || provider,
  });
  return {
    isError,
    address,
    abi,
    contract,
  };
}

/**
 * Use network contract SDK wrapper instance
 * @todo make consistent with useTypedContract signature
 * @todo after wrapper registration in manifest: refactor to remove injection
 * @todo consider consuming useTypedContract within
 * @param param0
 * @returns
 */
export function useSContractApi<T extends keyof typeof API>({ id }: { id: T }) {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { provider, signer } = useSContractProvider({ id });
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

  return { connected, chainId: chain?.id, signer, api };
}

/**
 * Read a single variable from a network contract
 * @param id
 * @param param1
 * @returns
 */
export function useSContractRead<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TBaseParams extends Parameters<typeof useContractRead>[0],
  TFunctionName extends Extract<
    TAbi[number],
    | { type: 'function'; stateMutability: 'view' }
    | { type: 'function'; constant: true }
  >['name'],
  TReturnData extends AbiTypeToPrimitiveType<
    ExtractAbiFunction<TAbi, TFunctionName>['outputs'][number]['type']
  >,
>(
  id: TContractId,
  {
    name,
    ...params
  }: {
    [K in keyof TBaseParams as Exclude<
      K,
      'args' | 'functionName' | 'abi' | 'address'
    >]: TBaseParams[K];
  } & {
    name: TFunctionName;
    args?: AbiParametersToPrimitiveTypes<
      ExtractAbiFunction<TAbi, TFunctionName>['inputs']
    >;
  },
) {
  const { abi, address } = useSContract({ id });
  const query = useContractRead({
    ...params,
    abi,
    address,
    functionName: name,
  });
  return {
    ...query,
  } as typeof query & { data?: TReturnData };
}

/**
 * Read multiple values from a network contract
 * @param id ContractId
 * @param param1
 * @returns
 */
export function useSContractReads<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TBaseParams extends Parameters<typeof useContractReads>[0],
  TFunctionName extends Extract<
    TAbi[number],
    | { type: 'function'; stateMutability: 'view' }
    | { type: 'function'; constant: true }
  >['name'],
  TReturnData extends AbiTypeToPrimitiveType<
    ExtractAbiFunction<TAbi, TFunctionName>['outputs'][number]['type']
  >,
>(
  id: TContractId,
  {
    reads,
    ...params
  }: {
    [K in keyof TBaseParams as Exclude<K, 'contracts'>]: TBaseParams[K];
  } & {
    reads: Array<{
      name: TFunctionName;
      args?: AbiParametersToPrimitiveTypes<
        ExtractAbiFunction<TAbi, TFunctionName>['inputs']
      >;
      chainId?: number;
    }>;
  },
) {
  const { abi, address } = useSContract({ id: id });
  const contracts = reads.map(({ name, ...oneRead }) => {
    const params: TBaseParams = {
      abi,
      address,
      functionName: name,
      ...oneRead,
    };
    return params;
  });
  const response = useContractReads({
    ...params,
    contracts,
  });
  return {
    ...response,
    data: response.data && Array.from(response.data),
  } as typeof response & { data?: TReturnData[] };
}

/**
 * Write to a network contract
 * @param id ContractId
 * @param param1
 * @returns
 */
export function useSContractWrite<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TFunctionName extends Extract<
    TAbi[number],
    | { type: 'function'; stateMutability: 'payable' | 'nonpayable' }
    | { type: 'function'; constant: false }
  >['name'],
  TBaseParams extends Parameters<
    typeof usePrepareContractWrite<TAbi, TFunctionName>
  >[0],
>(
  id: TContractId,
  {
    name,
    ...params
  }: Exclude<TBaseParams, 'abi' | 'address' | 'functionName'> & {
    name: TFunctionName;
  },
) {
  const { abi, address } = build.addressAbiPair(id);

  const args = {
    ...params,
    abi,
    address: address as Address,
    functionName: name,
  };

  const { config } = usePrepareContractWrite(args);

  return useContractWrite(config);
}

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @description Fetches a list of contracts, for a single, prefer useTypedContract
 * @todo refactor to getSContractProvider() when it's stable
 * @param param0
 * @returns
 */
export function useSContracts<T extends ContractIdWithAbi>({
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
              abi = getAbi(contractId);
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

export function useSContractRole<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, role: TRoleName) {
  const { data, ...rest } = useSContractRoles(id, [role]);
  return {
    data: data[0],
    ...rest,
  };
}

export function useSContractRoles<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, roleList?: TRoleName[]) {
  const { address } = useAccount();
  const abi = getAbi(id) || [];

  const rolesOfContract = abi
    .filter(({ type, name }) => type === 'function' && name.includes('_ROLE'))
    .map((fragment) => fragment.name) as TRoleName[];

  const roles = roleList
    ? roleList.filter((role) => rolesOfContract.includes(role))
    : rolesOfContract;

  const roleHash = useSContractReads(id, {
    reads: roles.map((role: TRoleName) => ({
      name: role,
    })),
  });
  const ofSigner = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'hasRole',
          args: [role, address],
        }))
      : [],
  });
  const ofMarionette = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'hasRole',
          args: [role, CONTRACT.MARIONETTE.address],
        }))
      : [],
  });
  const roleAdmin = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'getRoleAdmin',
          args: [role],
        }))
      : [],
  });

  const data: {
    name: string;
    hash?: Address;
    adminAddress?: Address;
    permissions: {
      marionette?: boolean;
      signer?: boolean;
    };
  }[] = roles.map((role, index) => ({
    name: role,
    hash: roleHash.data?.[index] as Address,
    adminAddress: roleAdmin.data?.[index] as Address,
    permissions: {
      marionette: ofMarionette.data?.[index] as boolean,
      signer: ofSigner.data?.[index] as boolean,
    },
  }));

  false &&
    console.log(
      'useRoles:data',
      data,
      'roleHash',
      roleHash,
      'ofSigner',
      ofSigner,
      'ofMarionette',
      ofMarionette,
      'roleAdmin',
      roleAdmin,
    );

  return {
    isLoading:
      roleHash.isLoading ||
      ofSigner.isLoading ||
      ofMarionette.isLoading ||
      roleAdmin.isLoading,
    isFetching:
      roleHash.isFetching ||
      ofSigner.isFetching ||
      ofMarionette.isFetching ||
      roleAdmin.isFetching,
    data,
  };
}

/**
 * Use API of the block explorer as configured by the chain
 * @param param0
 * @returns
 */
export function useExplorer(
  requests: ExplorerProps[],
  {
    chainId,
    enabled,
  }: {
    enabled?: boolean;
    chainId?: number;
  } = {},
) {
  const { chain: currentChain, chains } = useNetwork();
  const chain = chainId ? chains.find((c) => c.id === chainId) : currentChain;
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
      enabled,
      queryKey: [chain?.id, module, action, args],
      queryFn: () => fetch(url).then((res) => res.json()),
      refetchOnWindowFocus: false,
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
  const { contract, abi } = useSContract({ id: contractId });

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

  return {
    pastEvents,
    streamEvents,
  };
}

export function useChainMetadata({
  networkType,
}: {
  networkType?: NetworkType;
}) {
  const { chain } = useNetwork();
  const query = useQuery({
    enabled: networkType !== undefined && !!chain,
    queryKey: ['offchain', `metadata:${networkType}`] as const,
    queryFn: (): Promise<{ [key: string]: ChainManifestItem }> => {
      return fetch(chainMetadataUrl(networkType))
        .then((res) => res.json())
        .then((data) => {
          console.log('allmeta', data);
          return data[chain?.name] || null;
        });
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    query.refetch();
  }, [chain.id]);

  return query;
}

export function useAbi<T extends ContractIdWithAbi>(id: T) {
  const { data } = useQuery({
    queryKey: ['*', 'abi', id],
    queryFn: () => getAbi(id),
  });
  return data;
}
