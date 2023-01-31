import { TOKEN_STANDARD } from '@/features/network/manifest';
import { useManifestContract } from '@/features/network/hooks';
import { ethers } from 'ethers';
import {
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
} from 'wagmi';

type TokenTypeProps<S> = {
  standard: S;
};

const standards = Object.values(TOKEN_STANDARD);

type TokenStandard = Uppercase<(typeof standards)[number]['name']>;

export function useTokenManager<T extends TokenStandard>({
  standard,
}: TokenTypeProps<T>) {
  const id = `TOKEN_MANAGER_${standard}` as const;

  return useManifestContract({ id });
}

export function useTokenManagerLinker() {
  return useManifestContract({
    id: 'TOKEN_MANAGER_LINKER',
  });
}

export function useToggleAutodeploy<T extends TokenStandard>({
  standard,
}: TokenTypeProps<T>) {
  const { address, abi, api, contract } = useTokenManager({
    standard: 'ERC20',
  });

  const { data: isEnabled } = useContractRead({
    address,
    abi,
    functionName: 'automaticDeploy',
  });

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: isEnabled
      ? 'disableAutomaticDeploy'
      : 'enableAutomaticDeploy',
    enabled: isEnabled !== undefined,
  });

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    write: toggle,
  } = useContractWrite(config);

  return {
    isEnabled,
    toggle,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}

/**
 * Manage chain connectivity and statuses
 * @param param0
 */
export function useConnectChain({ chainName }: { chainName: string }) {
  const { address, abi, api } = useTokenManagerLinker();

  const overrides = {
    gasPrice: 100000000000,
    gasLimit: ethers.BigNumber.from(8000000),
  };

  const { config: connectConfig } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'connectSchain',
    args: [chainName],
    overrides,
  });

  const { write: connect } = useContractWrite(connectConfig);
}
