import { useTokenManager } from '@/features/bridge/hooks/useTokenManager';
import {
  getStandardTokenInterfaceId,
  supportsInterfaceAbi,
  wildcardAddresses,
  wildcardLiteEncodedAbis,
} from '@/features/bridge/lib';
import { liteEncodeAbiFunctions } from '@/features/network/abi/utils';
import { useExplorer } from '@/features/network/hooks';
import {
  NETWORK,
  StandardKey,
  StandardName,
} from '@/features/network/literals';
import { useQueries } from '@tanstack/react-query';
import { getContract } from '@wagmi/core';
import { useNetwork, useProvider } from 'wagmi';

/**
 * Extract SChain deployed tokens with network metadata
 * @param param0
 * @returns
 */
export function useSchainTokens({
  chainId,
  standardName,
}: {
  chainId?: number;
  standardName: Exclude<StandardName, 'eth'>;
}) {
  const { chains } = useNetwork();
  const chain = chainId
    ? chains.find(
        (chain) => chain.id === chainId && chain.network === NETWORK.SKALE,
      )
    : undefined;
  const provider = useProvider({
    chainId: chain?.id,
  });

  const standardInterfaceId = getStandardTokenInterfaceId(standardName);

  const page = 1;
  const offset = 100;

  const [contractList] = useExplorer(
    [
      {
        module: 'contract',
        action: 'listcontracts',
        args: {
          page: String(page),
          offset: String(offset),
          filter: 'verified',
        },
      },
    ],
    {
      enabled: !!chain,
      chainId: chain?.id,
    },
  );

  const standard = standardName && (standardName.toUpperCase() as StandardKey);

  const { contract: tokenManager } = useTokenManager({
    standard,
    network: chain?.network,
  });

  const enabled = !!(chain?.id && standard && tokenManager?.contract);

  const tokens = useQueries({
    queries: (contractList?.data?.result || []).map((c) => ({
      enabled,
      queryKey: ['custom', chain?.id, 'contractlistItemExt', c.Address],
      queryFn: async () => {
        const abi = JSON.parse(c['ABI']);
        const matchable = liteEncodeAbiFunctions(abi);
        const abiMatches = wildcardLiteEncodedAbis.some((wildcard) => {
          const foundInWildcard = matchable.filter((func) =>
            wildcard.includes(func),
          ).length;
          const ratio = foundInWildcard / wildcard.length;
          return ratio > 0.9;
        });
        const isPredeployed =
          abiMatches ||
          wildcardAddresses.some(
            (a) => a.toLowerCase() === c.Address.toLowerCase(),
          );

        const fetchIsClone = tokenManager?.contract?.addedClones(c.Address) as
          | undefined
          | Promise<boolean | undefined>;
        const contract = getContract({
          address: c.Address,
          abi: supportsInterfaceAbi,
          signerOrProvider: provider,
        });
        const fetchIsStandard = !standardInterfaceId
          ? true
          : isPredeployed
          ? false
          : standard === 'ERC721' || standard === 'ERC721_WITH_METADATA'
          ? Promise.all([
              contract.supportsInterface(getStandardTokenInterfaceId('erc721')),
              contract.supportsInterface(
                getStandardTokenInterfaceId('erc721_with_metadata'),
              ),
            ]).then((res) => res[0] === true || res[1] === true)
          : contract.supportsInterface(standardInterfaceId);
        const fetchName = contract.name();
        return Promise.allSettled([
          fetchIsClone,
          fetchIsStandard,
          fetchName,
        ]).then(([isClone, isStandard, name]) => {
          return {
            address: c.Address,
            name: name.status === 'fulfilled' ? name.value : c.ContractName,
            supportsInterface:
              isStandard.status === 'fulfilled'
                ? isStandard.value
                : standard === 'ERC20',
            isClone: isClone.status === 'fulfilled' && isClone.value,
            isPredeployed,
          };
        });
      },
    })),
  });

  return {
    isLoading: enabled && tokens.some((ot) => ot.isLoading),
    data: tokens,
  };
}
