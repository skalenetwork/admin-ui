import { QueryClient, UseQueryOptions } from '@tanstack/react-query';
/**
 * predeployed: MultiSigWallet
 * https://github.com/skalenetwork/multisigwallet-predeployed/blob/develop/contracts/MultiSigWallet.sol
 */

import { useCallback, useMemo } from 'react';
import { ethers } from 'ethers';
import { addresses } from '../network';
import { MultisigWallet } from '@skaleproject/multisig-wallet/lib';
import { MultisigWalletABI } from '../network/abi/abi-multisigwallet';

import { useBalance, useContract } from 'wagmi';
import { useQueries, useQuery } from '@tanstack/react-query';

import { Address } from '@wagmi/core';

import { usePredeployedWrapper } from '../interim/hooks';
import { scope } from './lib';

const multisigContract = {
  address: `${addresses.SCHAIN_MULTISIG_WALLET_ADDRESS}` as `0x${string}`,
  abi: MultisigWalletABI,
};

export function useMultisig({
  address = multisigContract.address,
}: { address?: Address } = {}) {
  const defaultParams = { cacheTime: Infinity };

  const contract = useContract({
    address: addresses.SCHAIN_MULTISIG_WALLET_ADDRESS,
    abi: MultisigWalletABI,
  });

  const { connected, api, chainId, signer } = usePredeployedWrapper(
    (params) => {
      return new MultisigWallet({
        ...params,
        address,
      });
    },
  );

  const queryKey = useCallback(
    (key: any[]) => {
      return [chainId, scope, ...key];
    },
    [chainId],
  );

  // queries

  const balance = useBalance({ address: address });

  const countsQueries =
    api && contract
      ? [
          {
            // ...defaultParams,
            initialData: 0,
            queryKey: queryKey(['countTotalTrx']),
            queryFn: () =>
              api
                .getTransactionCount({
                  pending: true,
                  executed: true,
                })
                .then((val) => val.toNumber()),
          },
          {
            // ...defaultParams,
            initialData: 0,
            queryKey: queryKey(['countPendingTrx']),
            queryFn: () =>
              api
                .getTransactionCount({
                  pending: true,
                  executed: false,
                })
                .then((val) => val.toNumber()),
          },
          {
            // ...defaultParams,
            initialData: 0,
            queryKey: queryKey(['countExecutedTrx']),
            queryFn: () =>
              api
                .getTransactionCount({
                  pending: false,
                  executed: true,
                })
                .then((val) => val.toNumber()),
          },
          {
            // ...defaultParams,
            initialData: 0,
            queryKey: queryKey(['countReqConfirms']),
            queryFn: () => api.getRequired(),
          },
        ]
      : [];

  const [countTotalTrx, countPendingTrx, countExecutedTrx, countReqConfirms] =
    useQueries({
      queries: countsQueries,
    });

  const counts = {
    countTotalTrx,
    countPendingTrx,
    countExecutedTrx,
    countReqConfirms,
  };

  // Derviatives

  const owners = useQuery({
    enabled: !!api,
    initialData: () => [],
    queryFn: () => (api ? api.getOwners() : []),
    refetchOnMount: true,
  });

  const pendingTrxIds = useQuery({
    queryKey: queryKey(['pendingTrxIds']),
    enabled: !!(api && counts['countPendingTrx']?.data),
    initialData: () => [],
    queryFn: () =>
      api
        ? api
            .getTransactionIds({
              from: ethers.BigNumber.from(0),
              to: ethers.BigNumber.from(counts['countPendingTrx'].data),
              pending: true,
              executed: false,
            })
            .then((val) => val.map((v) => v.toNumber()))
        : [],
  });

  const executedTrxIds = useQuery({
    queryKey: queryKey(['executedTrxIds']),
    enabled: !!(api && counts.countExecutedTrx.data),
    initialData: () => [],
    queryFn: () =>
      api
        ? api
            .getTransactionIds({
              from: ethers.BigNumber.from(0),
              to: ethers.BigNumber.from(counts.countExecutedTrx.data),
              pending: false,
              executed: true,
            })
            .then((val) => val.map((v) => v.toNumber()))
        : [],
  });

  const pendingTrxs = useQueries({
    queries: !pendingTrxIds.data
      ? []
      : pendingTrxIds.data.map((trx) => ({
          queryKey: queryKey(['pendingTrxIds', trx]),
          enabled: !!(api && trx),
          initialData: () => [],
          queryFn: () =>
            api?.getTransaction({
              transactionId: ethers.BigNumber.from(trx),
            }),
        })),
  });

  return {
    api,
    connected,
    chainId,
    contract,
    data: {
      ...counts,
      balance,
      owners,
      pendingTrxIds,
      executedTrxIds,
    },
  };
}
