/**
 * @namespace Config
 * @module ConfigHooks
 */

import { ConfigControllerABI } from '@/features/network/abi/abi-configcontroller';
import { useContractApi } from '@/features/network/hooks';
import { SCHAIN_CONFIG_CONTROLLER_ADDRESS } from '@skaleproject/constants/lib/addresses/predeployed';
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

const configControllerContract = {
  address: `${SCHAIN_CONFIG_CONTROLLER_ADDRESS}` as `0x${string}`,
  abi: ConfigControllerABI,
} as const;

export function useConfigController() {
  const {
    connected,
    api: controller,
    signer,
  } = useContractApi({
    id: 'CONFIG_CONTROLLER',
  });

  const { data, status, refetch } = useContractReads({
    enabled: !!connected,
    contracts: [
      {
        ...configControllerContract,
        functionName: 'isMTMEnabled',
      },
      {
        ...configControllerContract,
        functionName: 'isFCDEnabled',
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
