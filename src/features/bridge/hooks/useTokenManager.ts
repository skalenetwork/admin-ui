import { TokenTypeProps } from '@/features/bridge/types';
import { useSContract, useSContractApi } from '@/features/network/hooks';
import { NETWORK, StandardKey } from '@/features/network/literals';

export function useTokenManager<T extends StandardKey>({
  standard,
  network,
}: TokenTypeProps<T>) {
  const prefix = network === NETWORK.SKALE ? 'TOKEN_MANAGER' : 'DEPOSIT_BOX';
  const id = `${prefix}_${standard}` as const;
  return !standard
    ? {}
    : {
        contract: useSContract({ id }),
        api: useSContractApi({ id }),
      };
}
