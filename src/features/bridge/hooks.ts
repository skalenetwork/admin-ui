import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useManifestContract } from '../network/hooks';

type TokenTypeProps<T> = {
  standard: T;
};

type TokenStandard = 'ERC20' | 'ERC1155' | 'ERC721' | 'ETH';

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

export function useSomethingExample({ standard }: TokenTypeProps) {
  const { address, abi, api } = useTokenManager({
    standard: 'ERC20',
  });

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'addERC20TokenByOwner',
  });

  const { data } = useContractWrite(config);
}

export function useConnectChain() {
  const { address, abi, api } = useTokenManagerLinker();

  const { config } = usePrepareContractWrite({
    address,
    abi,
    functionName: 'connectSchain',
  });

  const { data } = useContractWrite(config);
}
