import { getStandardTokenInterfaceId } from '@skalenetwork/feat/bridge/lib';
import { StandardKey, StandardName } from '@skalenetwork/feat/network/literals';
import { useNetwork } from 'wagmi';

export function useMapTokenContext<S extends StandardName>({
  targetChainId,
  originChainId,
  standardName,
}: {
  targetChainId?: number;
  originChainId?: number;
  standardName: S;
}) {
  const { chains } = useNetwork();
  const originChain = originChainId
    ? chains.find((chain) => chain.id === originChainId)
    : undefined;
  const targetChain = targetChainId
    ? chains.find((chain) => chain.id === targetChainId)
    : undefined;

  if (!(originChain && targetChain && standardName)) {
    return {};
  }

  const standard = standardName && (standardName.toUpperCase() as StandardKey);
  const standardInterfaceId = getStandardTokenInterfaceId(standardName);

  return {
    standard,
    standardInterfaceId,
    originChain,
    targetChain,
  };
}
