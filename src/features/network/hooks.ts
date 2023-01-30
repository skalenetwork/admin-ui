import { useQuery } from '@tanstack/react-query';
import { usePromise } from 'react-use';
import { Address, useContract, useNetwork } from 'wagmi';
import {
  ContractManifestId,
  getAbi,
  GetAbiProps,
  ContractManifestIdAbi,
} from './abi/abi';
import { CONTRACT, getChainMetadataUrl, NetworkType } from './manifest';
import { ChainManifestItem } from './types';

type ExplorerProps = {
  module:
    | 'account'
    | 'stats'
    | 'transaction'
    | 'logs'
    | 'block'
    | 'token'
    | 'contract';
  action: 'listaccounts';
  args?: {
    [key: string]: string;
  };
};

/**
 * Use API of the block explorer as configured by the chain
 * @param param0
 * @returns
 */
export function useExplorer({ module, action, args }: ExplorerProps) {
  const { chain } = useNetwork();
  const baseUrl = chain?.blockExplorers?.default.url;
  const queryString = new URLSearchParams(args).toString();
  const url =
    baseUrl +
    `api?module=${module}&action=${action}${
      queryString ? '&' + queryString : ''
    }`;
  return useQuery({
    queryKey: [chain?.id, module, action, args],
    queryFn: () => fetch(url).then((res) => res.json()),
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
      return fetch(getChainMetadataUrl(networkType)).then((res) => res.json());
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
 * Use interfaces for any network supported contract by preset ID
 * @param param0
 * @returns
 */
export function useManifestContract<T extends ContractManifestIdAbi>({
  id,
}: {
  id: T;
}) {
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
    api: contract?.callStatic,
  };
}
