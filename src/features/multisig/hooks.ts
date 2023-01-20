import { QueryClient, UseQueryOptions } from '@tanstack/react-query';
/**
 * predeployed: MultiSigWallet
 * https://github.com/skalenetwork/multisigwallet-predeployed/blob/develop/contracts/MultiSigWallet.sol
 */

import { useMemo } from 'react';
import { ethers } from 'ethers';
import { addresses } from '../network';
import { MultisigWallet } from '@skaleproject/multisig-wallet/lib';
import { MultisigWalletABI } from '../network/abi-multisigwallet';

import { useBalance, useContract } from 'wagmi';
import { useQueries, useQuery } from '@tanstack/react-query';

import { Address } from '@wagmi/core';

import { usePredeployedWrapper } from '../interim/hooks';

const multisigContract = {
  address: `${addresses.SCHAIN_MULTISIG_WALLET_ADDRESS}` as `0x${string}`,
  abi: MultisigWalletABI,
};

export function useQueriesMap<T>({ queries }: { queries: T }) {
  const tuple = useQueries({
    queries,
  });
  const data: { [key: string]: (typeof tuple)[0] } = useMemo(() => {
    let obj = {};
    if (queries.length > 0) {
      queries.forEach((query, i) => {
        obj[query.queryKey[1]] = tuple[i];
      });
    }
    return obj;
  }, [tuple]);

  return { data };
}

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

  // queries

  const balance = useBalance({ address: address });

  const countsQueries =
    api && contract
      ? [
          {
            // ...defaultParams,
            initialData: 0,
            queryKey: ['multisig', 'countTotalTrx', chainId],
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
            queryKey: ['multisig', 'countPendingTrx', chainId],
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
            queryKey: ['multisig', 'countExecutedTrx', chainId],
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
            queryKey: ['multisig', 'countReqConfirms', chainId],
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
    queryKey: ['multisig', 'pendingTrxIds', chainId],
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
    queryKey: ['multisig', 'executedTrxIds', chainId],
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
          queryKey: ['multisig', 'pendingTrxs', chainId],
          enabled: !!(api && trx),
          initialData: () => [],
          queryFn: () =>
            api?.getTransaction({
              transactionId: ethers.BigNumber.from(trx),
            }),
        })),
  });

  console.log('pendingTrxs', pendingTrxs);

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
