/**
 * @namespace Multisig
 * @module MultisigHooks
 * https://github.com/skalenetwork/multisigwallet-predeployed/blob/develop/contracts/MultiSigWallet.sol
 */

import { getAbi } from '@/features/network/abi/abi';
import { CONTRACT, getSContractProp } from '@/features/network/contract';
import {
  useEvents,
  useSContract,
  useSContractApi,
} from '@/features/network/hooks';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Address } from '@wagmi/core';
import { ethers } from 'ethers';
import { useCallback } from 'react';
import { useBalance, useContractRead } from 'wagmi';
import { scope } from './core';

const multisigContract = {
  address: getSContractProp('MULTISIG_WALLET', 'address'),
  abi: getAbi('MULTISIG_WALLET'),
};

export function useMultisig({
  address = multisigContract.address,
}: { address?: Address } = {}) {
  const defaultParams = { staleTime: 60 * 5 };

  const contract = useSContract({
    id: 'MULTISIG_WALLET',
  });

  const { connected, api, chainId, signer } = useSContractApi({
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

  const countsEnabled = Boolean(api && contract);

  const countsQueries = [
    {
      ...defaultParams,
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
      ...defaultParams,
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
      ...defaultParams,
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
      ...defaultParams,
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

  const owners = useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName: 'getOwners',
  });

  // useQuery({
  //   ...defaultParams,
  //   enabled: Boolean(api),
  //   queryKey: queryKey(['getOwners']),
  //   initialData: () => [],
  //   queryFn: () => {
  //     return api?.getOwners();
  //   },
  // });

  const pendingTrxIds = useQuery({
    ...defaultParams,
    enabled: Boolean(api && counts['countPendingTrx']?.data),
    queryKey: queryKey(['pendingTrxIds']),
    initialData: () => [],
    queryFn: () => {
      return api
        ?.getTransactionIds({
          from: ethers.BigNumber.from(0),
          to: ethers.BigNumber.from(counts['countPendingTrx'].data),
          pending: true,
          executed: false,
        })
        .then((trxIds) => trxIds.map((trxId) => trxId.toNumber()));
    },
  });

  const executedTrxIds = useQuery({
    ...defaultParams,
    enabled: Boolean(api && counts.countExecutedTrx.data),
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

  const { pastEvents } = useEvents({
    address: CONTRACT['MULTISIG_WALLET'].address,
    fromBlock: 0,
    toBlock: 'latest',
    eventNames: ['Submission', 'Execution', 'ExecutionFailure', 'Confirmation'],
  });

  const events = pastEvents
    .map((x) => x.data)
    .reduce((prevEvents, currEvents) => {
      return (prevEvents || []).concat(currEvents || []);
    });

  // const pendingTrxs = useQueries({
  //   queries: !pendingTrxIds.data
  //     ? []
  //     : pendingTrxIds.data.map((trx) => ({
  //         enabled: Boolean(api && trx),
  //         queryKey: queryKey(['pendingTrxIds', trx]),
  //         initialData: () => [],
  //         queryFn: () =>
  //           api?.getTransaction({
  //             transactionId: ethers.BigNumber.from(trx),
  //           }),
  //       })),
  // });

  return {
    queryKey,
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
      events,
    },
  };
}
