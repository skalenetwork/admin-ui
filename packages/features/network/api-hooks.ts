import { API, getApi } from '@/features/network/api';
import { useSContractProvider } from '@/features/network/hooks';
import { NETWORK } from '@/features/network/literals';
import { getProvider } from '@wagmi/core';
import { useMemo } from 'react';
import { useNetwork, useSigner } from 'wagmi';

/**
 * Use external library wrapper for predeployed contract
 * @param param0
 * @returns
 */
export function useSContractApi<T extends keyof typeof API>({
  id,
  chainId,
  enabled = true,
}: {
  id: T;
  chainId?: number;
  enabled?: boolean;
}) {
  const { chain, chains } = useNetwork();
  const { provider, signer } = useSContractProvider({ id });
  const connected = chain ? chain.network === NETWORK.SKALE : false;

  const customChain = chains.find((c) => c.id === chainId);
  const customProvider = getProvider({
    chainId,
  });
  const { data: customSigner } = useSigner({
    chainId,
  });

  const params =
    chainId !== undefined && customProvider && customChain && customSigner
      ? {
          chain: customChain,
          provider: customProvider,
          signer: customSigner,
        }
      : chainId === undefined && chain && signer && provider
      ? {
          chain,
          provider,
          signer,
        }
      : undefined;

  const api = useMemo(() => {
    return id && enabled && params ? getApi(id, params) : undefined;
  }, [id, params?.chain, params?.provider, params?.signer, enabled]);

  return {
    connected,
    chainId: chainId || chain?.id,
    signer: params?.signer,
    api,
  };
}
