import { useSContractWrite } from '@/features/network/hooks';
/**
 * @namespace Config
 * @module ConfigHooks
 */

import { getAbi } from '@/features/network/abi/abi';
import { useSContractApi, useSContractReads } from '@/features/network/hooks';
import { SCHAIN_CONFIG_CONTROLLER_ADDRESS } from '@skaleproject/constants/lib/addresses/predeployed';

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
    refetch,
  };
}

/**
 * Use multi-transaction mode status and toggling
 * @returns
 */
export function useMtm() {
  const { flags, connected, refetch } = useConfigController();

  const writer = useSContractWrite('CONFIG_CONTROLLER', {
    enabled: !!connected,
    name: flags?.mtmEnabled ? 'disableMTM' : 'enableMTM',
    onSuccess: () => refetch(),
  });

  return {
    ...writer,
    toggle: writer.write,
    toggleAsync: writer.writeAsync,
    isEnabled: flags?.mtmEnabled,
    refetch,
  };
}

/**
 * Use free contract deployment status and toggling
 * @returns
 */
export function useFcd() {
  const { flags, connected, refetch } = useConfigController();

  const writer = useSContractWrite('CONFIG_CONTROLLER', {
    enabled: !!connected,
    name: flags?.fcdEnabled
      ? 'disableFreeContractDeployment'
      : 'enableFreeContractDeployment',
  });

  return {
    ...writer,
    isEnabled: flags?.fcdEnabled,
    toggle: writer.write,
    toggleAsync: writer.writeAsync,
    refetch,
  };
}
