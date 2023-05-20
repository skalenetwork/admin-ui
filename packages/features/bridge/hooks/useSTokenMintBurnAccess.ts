import { useTokenManager } from '@/features/bridge';
import { STANDARD_CONTRACT } from '@/features/bridge/lib';
import { CommonTokenAbi } from '@/features/bridge/types';
import { StandardKey, StandardName } from '@/features/network/literals';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  Address,
  useContract,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useSigner,
  useWaitForTransaction,
} from 'wagmi';

function getStandardTokenAbi(key: StandardKey) {
  return STANDARD_CONTRACT[key]['abi'];
}

/**
 * Use and modify access control of SChain token mintability and burnability
 * @param param0
 * @returns
 */
export function useSTokenMintBurnAccess({
  chainId,
  originChainId,
  standardName,
  tokenAddress,
}: {
  chainId?: number;
  originChainId?: number;
  standardName: StandardName;
  tokenAddress?: Address;
}) {
  const standard = standardName && (standardName.toUpperCase() as StandardKey);

  const { chain: activeChain, chains } = useNetwork();
  const { data: signer } = useSigner();
  const provider = useProvider({ chainId });
  const originChain = chains.find((chain) => chain.id === originChainId);
  const signerOrProvider = activeChain?.id === chainId ? signer : provider;

  const tokenAbi = useMemo(() => {
    return standardName && getStandardTokenAbi(standard);
  }, [standardName]);

  const targetContract = useContract({
    abi: tokenAbi as CommonTokenAbi,
    address: tokenAddress,
    signerOrProvider,
  });

  // `network` allows selecting either token_manager or deposit_box
  const { contract: originTokenManager } = useTokenManager({
    standard,
    network: originChain?.network,
  });

  const roleHashesQuery = useQueries({
    queries: [
      {
        enabled: !!targetContract?.address,
        queryKey: ['custom', targetContract?.address, 'role', 'MINTER_ROLE'],
        queryFn: async () => {
          if (!targetContract?.MINTER_ROLE) {
            throw Error('Cloned token role check is misconfigured');
          }
          return await targetContract?.MINTER_ROLE();
        },
        refetchOnWindowFocus: false,
      },
      {
        enabled: !!targetContract?.address,
        queryKey: ['custom', targetContract?.address, 'role', 'BURNER_ROLE'],
        queryFn: async () => {
          if (!targetContract?.BURNER_ROLE) {
            throw Error('Cloned token role check is misconfigured');
          }
          return await targetContract?.BURNER_ROLE();
        },
        refetchOnWindowFocus: false,
      },
    ],
  });

  const MINTER_ROLE = roleHashesQuery[0].data;
  const BURNER_ROLE = roleHashesQuery[1].data;

  const tmHasMinterRole = useQuery({
    enabled: !!(MINTER_ROLE && originTokenManager),
    queryFn: async () => {
      return targetContract?.hasRole
        ? targetContract.hasRole(
            MINTER_ROLE as Address,
            originTokenManager?.address as Address,
          )
        : false;
    },
    refetchOnWindowFocus: false,
  });

  const tmHasBurnerRole = useQuery({
    enabled: !!(BURNER_ROLE && originTokenManager),
    queryFn: async () => {
      return targetContract?.hasRole
        ? targetContract.hasRole(
            BURNER_ROLE as Address,
            originTokenManager?.address as Address,
          )
        : false;
    },
    refetchOnWindowFocus: false,
  });

  const { config: grantMinterRoleConfig } = usePrepareContractWrite({
    enabled: !!(tokenAddress && MINTER_ROLE && originTokenManager?.address),
    address: tokenAddress,
    abi: tokenAbi as CommonTokenAbi,
    functionName: 'grantRole',
    args: [MINTER_ROLE as Address, originTokenManager?.address as Address],
  });
  const grantMinterRole = useContractWrite(grantMinterRoleConfig);
  const grantMinterRoleConfirmed = useWaitForTransaction({
    hash: grantMinterRole.data?.hash,
    onSuccess: () => {
      tmHasMinterRole.refetch();
    },
  });

  const { config: grantBurnerRoleConfig } = usePrepareContractWrite({
    enabled: !!(tokenAddress && BURNER_ROLE && originTokenManager?.address),
    address: tokenAddress,
    abi: tokenAbi as CommonTokenAbi,
    functionName: 'grantRole',
    args: [BURNER_ROLE as Address, originTokenManager?.address as Address],
  });
  const grantBurnerRole = useContractWrite(grantBurnerRoleConfig);
  const grantBurnerRoleConfirmed = useWaitForTransaction({
    hash: grantBurnerRole.data?.hash,
    onSuccess: () => {
      tmHasBurnerRole.refetch();
    },
  });

  return {
    minterRole: roleHashesQuery[0],
    burnerRole: roleHashesQuery[1],
    MINTER_ROLE,
    BURNER_ROLE,
    hasAccessControl: MINTER_ROLE && BURNER_ROLE,
    isMinterOriginTM: tmHasMinterRole,
    isBurnerOriginTM: tmHasBurnerRole,
    grantMinterRoleToOriginTM: {
      ...grantMinterRole,
      confirmed: grantMinterRoleConfirmed,
    },
    grantBurnerRoleToOriginTM: {
      ...grantBurnerRole,
      confirmed: grantBurnerRoleConfirmed,
    },
  };
}
