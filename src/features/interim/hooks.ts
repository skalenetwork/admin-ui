import { ConfigControllerABI } from '@/features/network/abi/abi-configcontroller';
import { ConfigController } from '@skaleproject/config-controller/lib/contract';

import { SCHAIN_CONFIG_CONTROLLER_ADDRESS } from '@skaleproject/constants/lib/addresses/predeployed';

import {
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSigner,
} from 'wagmi';

import { NETWORK } from '@/features/network/manifest';
import { useEffect, useMemo } from 'react';

const configControllerContract = {
  address: `${SCHAIN_CONFIG_CONTROLLER_ADDRESS}` as `0x${string}`,
  abi: ConfigControllerABI,
} as const;

export function useConfigController() {
  const { chain } = useNetwork();

  const {
    data: signer,
    isError: signerIsError,
    isLoading: signerIsLoading,
  } = useSigner();

  const connected = useMemo(
    () => chain?.network === NETWORK.SKALE,
    [chain?.id],
  );

  const controller = useMemo(
    () =>
      (connected || undefined) &&
      chain &&
      new ConfigController({
        ...configControllerContract,
        rpcUrl: chain.rpcUrls.default.http[0],
      }),
    [connected, chain?.id],
  );

  useEffect(() => {
    signer && controller?.setSigner({ signer: signer });
  }, [signer, controller]);

  const { data, status } = useContractReads({
    contracts: connected
      ? [
          {
            ...configControllerContract,
            functionName: 'isMTMEnabled',
          },
          {
            ...configControllerContract,
            functionName: 'isFCDEnabled',
          },
        ]
      : [],
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
  const { flags, controller } = useConfigController();

  const { config } = usePrepareContractWrite({
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
  const { flags, controller } = useConfigController();

  const { config } = usePrepareContractWrite({
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
