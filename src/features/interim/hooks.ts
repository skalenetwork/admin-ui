import {
  BaseContract,
  IContractParams,
} from '@skaleproject/utils/lib/contracts/base_contract';
import { ConfigController } from '@skaleproject/config-controller/lib/contract';
import { ConfigControllerABI } from '@/features/network/abi/abi-configcontroller';

import { SCHAIN_CONFIG_CONTROLLER_ADDRESS } from '@skaleproject/constants/lib/addresses/predeployed';

import {
  useNetwork,
  useContractWrite,
  useSigner,
  useContractRead,
  useContractReads,
  usePrepareContractWrite,
  useAccount,
  Address,
} from 'wagmi';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useInterval, useTimeout } from 'react-use';
import { Wallet } from 'ethers';

const configControllerContract = {
  address: `${SCHAIN_CONFIG_CONTROLLER_ADDRESS}` as `0x${string}`,
  abi: ConfigControllerABI,
} as const;

/**
 * with chain state: return predeployed contract SDK wrapper instance
 * @param creator
 * @returns
 */
export function usePredeployedWrapper<T extends BaseContract>(
  creator: (params: IContractParams) => T,
) {
  const { chain } = useNetwork();

  const {
    data: signer,
    isError: signerIsError,
    isLoading: signerIsLoading,
  } = useSigner();

  const { address } = useAccount();

  const connected = useMemo(
    () => (chain ? chain.network === 'skale' : false),
    [chain],
  );

  const api = useMemo(
    () =>
      connected && chain && signer
        ? creator({
            rpcUrl: chain.rpcUrls.default.http[0],
            signer,
          })
        : undefined,
    [connected, chain],
  );

  useEffect(() => {
    address && api?.setSigner({ signer });
  }, [address, api]);

  return { connected, chainId: chain?.id, signer, api };
}

export function useConfigController() {
  const { chain } = useNetwork();

  const {
    data: signer,
    isError: signerIsError,
    isLoading: signerIsLoading,
  } = useSigner();

  const connected = useMemo(() => (chain?.id || 0) > 1, [chain]);

  const controller = useMemo(
    () =>
      (connected || undefined) &&
      chain &&
      new ConfigController({
        ...configControllerContract,
        rpcUrl: chain.rpcUrls.default.http[0],
      }),
    [connected, chain],
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
