import { useSContractWrite } from '@/features/network/hooks';
import {
  NETWORK,
  StandardKey,
  StandardName,
  TOKEN_STANDARD,
} from '@/features/network/literals';
import { Address } from 'abitype';
import { useNetwork } from 'wagmi';

/**
 * Use final registration of cloned tokens with token manager and deposit box
 * @param param0
 * @returns
 */
export function useSTokenRegistration({
  chainId,
  originChainId,
  standardName,
  tokenAddress,
  originTokenAddress,
  enabled,
}: {
  chainId?: number;
  originChainId?: number;
  standardName: StandardName;
  tokenAddress?: Address;
  originTokenAddress?: Address;
  enabled?: boolean;
}) {
  const _enabled = enabled === undefined ? true : !!enabled;
  const standard = standardName && (standardName.toUpperCase() as StandardKey);

  const { chains } = useNetwork();
  const targetChain = chains.find((chain) => chain.id === chainId);
  const originChain = chains.find((chain) => chain.id === originChainId);

  const mode =
    originChain === undefined
      ? undefined
      : originChain.network === NETWORK.SKALE
      ? 's2s'
      : 'f2s';

  const registerOnForeignChain = useSContractWrite(`DEPOSIT_BOX_${standard}`, {
    enabled:
      _enabled && !!(targetChain && originTokenAddress && mode === 'f2s'),
    name: TOKEN_STANDARD[standard]?.registerFunction,
    args: [targetChain?.name, originTokenAddress],
  });

  const registerOnSchain = useSContractWrite(
    `TOKEN_MANAGER_${standard as StandardKey}`,
    {
      enabled:
        _enabled && !!(originChain && originTokenAddress && tokenAddress),
      name: TOKEN_STANDARD[standard]?.registerFunction,
      args: [
        originChain?.network === NETWORK.ETHEREUM
          ? 'Mainnet'
          : originChain?.name,
        originTokenAddress,
        tokenAddress,
      ],
    },
  );

  return {
    mode,
    registerOnForeignChain,
    registerOnSchain,
  };
}
