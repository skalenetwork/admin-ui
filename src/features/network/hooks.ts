import { API, getApi } from '@/features/network/api';
import { NETWORK } from '@/features/network/constants';
import { ChainManifestItem, NetworkType } from '@/features/network/types';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getContract } from '@wagmi/core';
import { Wallet } from 'ethers';
import { useEffect } from 'react';
import {
  Address,
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from 'wagmi';
import { ABI, ContractManifestIdAbi, getAbi, GetAbiProps } from './abi/abi';
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

export function useAbi<T extends ContractManifestIdAbi>({
  id,
}: GetAbiProps<T>) {
  const { data } = useQuery({
    queryKey: ['*', 'abi', id],
    queryFn: () => getAbi({ id }),
  });
  return data;
}

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @param param0
 * @returns
 */
export function useTypedContract<T extends ContractManifestIdAbi>({
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

  const contract = useContract({
    address,
    abi,
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
export function useTypedContracts<T extends ContractManifestIdAbi>({
  id,
}: {
  id: T[];
}): {
  contractId: T;
  address?: (typeof CONTRACT)[T]['address'];
  abi?: (typeof ABI)[T];
  contract?: ReturnType<typeof useContract<(typeof ABI)[T]>>;
}[] {
  const { data: signer } = useSigner();

  return id
    ? id.map((contractId, index) => {
        const { address } = CONTRACT[contractId];

        let abi, contract;

        try {
          abi = getAbi({
            id: contractId,
          });
        } catch (e) {
          console.error(e);
        }

        contract =
          abi &&
          getContract({
            address,
            abi,
            signer: signer as Wallet,
          });

        return {
          contractId,
          address,
          abi,
          contract,
        };
      })
    : [];
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
  const provider = useProvider();
  const { address } = useAccount();

  const connected = chain ? chain.network === NETWORK.SKALE : false;

  const api =
    connected && chain && signer && provider && id
      ? getApi(id, {
          chain,
          provider,
          signer,
        })
      : undefined;

  useEffect(() => {
    address && api?.setSigner?.({ signer });
  }, [address, api]);

  return { connected, chainId: chain?.id, signer, api };
}

/**
 * useContract with methods API i.e. functionName({...}: { [arg_name]: [arg_type] })
 */
function useContractWithApi() {}
