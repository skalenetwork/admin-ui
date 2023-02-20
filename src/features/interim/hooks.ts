/**
 * @namespace Config
 * @module ConfigHooks
 */

import { getAbi } from '@/features/network/abi/abi';
import { useSContractApi, useSContractReads } from '@/features/network/hooks';
import { SCHAIN_CONFIG_CONTROLLER_ADDRESS } from '@skaleproject/constants/lib/addresses/predeployed';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

const configControllerContract = {
  address: `${SCHAIN_CONFIG_CONTROLLER_ADDRESS}` as `0x${string}`,
  abi: getAbi('CONFIG_CONTROLLER'),
} as const;

export function useConfigController() {
  const {
    connected,
    api: controller,
    signer,
  } = useSContractApi({
    id: 'CONFIG_CONTROLLER',
  });

  const { data, status, refetch } = useSContractReads('CONFIG_CONTROLLER', {
    enabled: !!connected,
    reads: [
      {
        name: 'isMTMEnabled',
      },
      {
        name: 'isFCDEnabled',
      },
    ],
  });

  const flags = (status === 'success' || undefined) &&
    data && {
      mtmEnabled: data[0],
      fcdEnabled: data[1],
    };

  return {
    connected,
    flags,
    controller: (signer || undefined) && controller,
  };
}

/**
 * Use multi-transaction mode status and toggling
 * @returns
 */
export function useMtm() {
  const { flags, controller, connected } = useConfigController();

  const { config } = usePrepareContractWrite({
    enabled: !!connected,
    ...configControllerContract,
    functionName: flags?.mtmEnabled ? 'disableMTM' : 'enableMTM',
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
    isEnabled: flags?.mtmEnabled,
    toggle,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}

/**
 * Use free contract deployment status and toggling
 * @returns
 */
export function useFcd() {
  const { flags, controller, connected } = useConfigController();

  const { config } = usePrepareContractWrite({
    enabled: !!connected,
    ...configControllerContract,
    functionName: flags?.fcdEnabled
      ? 'disableFreeContractDeployment'
      : 'enableFreeContractDeployment',
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
    isEnabled: flags?.fcdEnabled,
    toggle,
    data,
    isLoading,
    isSuccess,
    isError,
  };
}
