import { TokenTypeProps } from '@/features/bridge/types';
import { useSContractRead, useSContractWrite } from '@/features/network/hooks';
import { StandardKey } from '@/features/network/literals';

export function useToggleAutodeploy<T extends StandardKey>({
  standard,
}: TokenTypeProps<T>) {
  const contractId = `TOKEN_MANAGER_${standard}` as 'TOKEN_MANAGER_ERC20';

  const autoDeployRead = useSContractRead(contractId, {
    name: 'automaticDeploy',
  });

  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    write: toggle,
  } = useSContractWrite(contractId, {
    enabled: autoDeployRead.isSuccess,
    name: autoDeployRead.data
      ? 'disableAutomaticDeploy'
      : 'enableAutomaticDeploy',
    onSuccess: () => autoDeployRead.refetch(),
  });

  return {
    isEnabled: autoDeployRead.data,
    toggle,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
