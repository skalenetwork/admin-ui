/**
 * predeployed: MultiSigWallet
 * https://github.com/skalenetwork/multisigwallet-predeployed/blob/develop/contracts/MultiSigWallet.sol
 */

import { addresses } from '@/features/network';
import { MultisigWalletABI } from '@/features/network/abi/abi-multisigwallet';
import { useContractApi, useTypedContract } from '@/features/network/hooks';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Address } from '@wagmi/core';
import { ethers } from 'ethers';
import { useCallback } from 'react';
import { useBalance } from 'wagmi';
import { scope } from './lib';

const multisigContract = {
  address: `${addresses.SCHAIN_MULTISIG_WALLET_ADDRESS}` as `0x${string}`,
  abi: MultisigWalletABI,
};

export function useMultisig({
  address = multisigContract.address,
}: { address?: Address } = {}) {
  const defaultParams = { cacheTime: Infinity };

  const contract = useTypedContract({
    id: 'MULTISIG_WALLET',
  });

  const { connected, api, chainId, signer } = useContractApi({
    id: 'MULTISIG_WALLET',
  });

  const queryKey = useCallback(
    (key: any[]) => {
      return [chainId, scope, ...key];
    },
    [chainId],
  );

  // queries

  const balance = useBalance({ address: address });

  const countsEnabled = !!(api && contract);

  const countsQueries = [
    {
      // ...defaultParams,
      enabled: countsEnabled,
      queryKey: queryKey(['countTotalTrx']),
      queryFn: () =>
        api
          ?.getTransactionCount({
            pending: true,
            executed: true,
          })
          .then((val) => val.toNumber()),
    },
    {
      // ...defaultParams,
      enabled: countsEnabled,
      initialData: 0,
      queryKey: queryKey(['countPendingTrx']),
      queryFn: () =>
        api
          ?.getTransactionCount({
            pending: true,
            executed: false,
          })
          .then((val) => val.toNumber()),
    },
    {
      // ...defaultParams,
      enabled: countsEnabled,
      initialData: 0,
      queryKey: queryKey(['countExecutedTrx']),
      queryFn: () =>
        api
          ?.getTransactionCount({
            pending: false,
            executed: true,
          })
          .then((val) => val.toNumber()),
    },
    {
      // ...defaultParams,
      enabled: countsEnabled,
      initialData: 0,
      queryKey: queryKey(['countReqConfirms']),
      queryFn: () => api?.getRequired(),
    },
  ];

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
    enabled: !!(api && counts['countPendingTrx']?.data),
    queryKey: queryKey(['pendingTrxIds']),
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
    enabled: !!(api && counts.countExecutedTrx.data),
    queryKey: queryKey(['executedTrxIds']),
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

  // const pendingTrxs = useQueries({
  //   queries: !pendingTrxIds.data
  //     ? []
  //     : pendingTrxIds.data.map((trx) => ({
  //       enabled: !!(api && trx),
  //         queryKey: queryKey(['pendingTrxIds', trx]),
  //         initialData: () => [],
  //         queryFn: () =>
  //           api?.getTransaction({
  //             transactionId: ethers.BigNumber.from(trx),
  //           }),
  //       })),
  // });

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
