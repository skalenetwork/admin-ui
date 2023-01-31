import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Address,
  useContract,
  useNetwork,
  useSigner,
  useAccount,
  useProvider,
} from 'wagmi';
import { getContract } from '@wagmi/core';
import {
  ContractManifestId,
  getAbi,
  GetAbiProps,
  ContractManifestIdAbi,
} from './abi/abi';
import { CONTRACT, getChainMetadataUrl, NetworkType } from './manifest';
import { ChainManifestItem } from './types';

import {
  BaseContract,
  IContractParams,
} from '@skaleproject/utils/lib/contracts/base_contract';
import { Abi, AbiFunction, ExtractAbiFunctions } from 'abitype';
import { ethers } from 'ethers';

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
    contract,
    api: contract?.callStatic,
  };
}

/**
 * with chain state: return predeployed contract SDK wrapper instance
 * @param creator
 * @returns
 */
export function useSdkContract<T extends BaseContract>(
  creator: (params: IContractParams) => T,
) {
  const { chain } = useNetwork();

  const {
    data: signer,
    isError: signerIsError,
    isLoading: signerIsLoading,
  } = useSigner();

  const { address } = useAccount();

  const connected = useMemo(
    () => (chain ? chain.network === 'skale' : false),
    [chain],
  );

  const api = useMemo(
    () =>
      connected && chain && signer
        ? creator({
            rpcUrl: chain.rpcUrls.default.http[0],
            signer,
          })
        : undefined,
    [connected, chain],
  );

  useEffect(() => {
    address && api?.setSigner({ signer });
  }, [address, api]);

  return { connected, chainId: chain?.id, signer, api };
}

/**
 * useContract with methods API i.e. functionName({...}: { [arg_name]: [arg_type] })
 */
function useContractWithApi() {}
