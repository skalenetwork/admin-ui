import { CommonTokenAbi } from '@/features/bridge/types';
import { STANDARD_CONTRACT } from '@/features/control/lib';
import { StandardKey, StandardName } from '@/features/network/literals';
import { build } from '@/features/network/manifest';
import { useMemo } from 'react';
import {
  Address,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useSigner,
  useWaitForTransaction,
} from 'wagmi';

function getStandardTokenAbi(key: Exclude<StandardKey, 'ETH'>) {
  return STANDARD_CONTRACT[key]?.['abi'];
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
    return standardName && (getStandardTokenAbi(standard) as CommonTokenAbi);
  }, [standardName]);

  const { address: targetTokenManagerAddress } = build.addressAbiPair(
    `TOKEN_MANAGER_${standard}`,
  );

  const targetContractConfig = {
    address: tokenAddress,
    abi: tokenAbi,
  };

  const minterRoleHash = useContractRead({
    ...targetContractConfig,
    functionName: 'MINTER_ROLE',
  });
  const burnerRoleHash = useContractRead({
    ...targetContractConfig,
    functionName: 'BURNER_ROLE',
  });

  const MINTER_ROLE = minterRoleHash.data;
  const BURNER_ROLE = burnerRoleHash.data;

  const tmHasMinterRole = useContractRead({
    enabled: !!(tokenAddress && MINTER_ROLE),
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'hasRole',
    args: MINTER_ROLE && [MINTER_ROLE, targetTokenManagerAddress],
  });

  const tmHasBurnerRole = useContractRead({
    enabled: !!(tokenAddress && BURNER_ROLE),
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'hasRole',
    args: BURNER_ROLE && [BURNER_ROLE, targetTokenManagerAddress],
  });

  const { config: grantMinterRoleConfig } = usePrepareContractWrite({
    enabled: !!(tokenAddress && MINTER_ROLE),
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'grantRole',
    args: MINTER_ROLE && [MINTER_ROLE, targetTokenManagerAddress],
  });
  const grantMinterRole = useContractWrite(grantMinterRoleConfig);
  const grantMinterRoleConfirmed = useWaitForTransaction({
    hash: grantMinterRole.data?.hash,
    onSuccess: () => {
      tmHasMinterRole.refetch();
    },
  });

  const { config: grantBurnerRoleConfig } = usePrepareContractWrite({
    enabled: !!(tokenAddress && BURNER_ROLE),
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'grantRole',
    args: BURNER_ROLE && [BURNER_ROLE, targetTokenManagerAddress],
  });
  const grantBurnerRole = useContractWrite(grantBurnerRoleConfig);
  const grantBurnerRoleConfirmed = useWaitForTransaction({
    hash: grantBurnerRole.data?.hash,
    onSuccess: () => {
      tmHasBurnerRole.refetch();
    },
  });

  const returnData = {
    minterRole: minterRoleHash,
    burnerRole: burnerRoleHash,
    MINTER_ROLE,
    BURNER_ROLE,
    hasAccessControl: !!(MINTER_ROLE && BURNER_ROLE),
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

  return returnData;
}
