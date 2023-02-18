/**
 * @namespace Analytics
 * @module AnalyticsHooks
 */

import { useTypedContract } from '@/features/network/hooks';
import { useIsFetching, useQueries } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import {
  useAccount,
  useBlockNumber,
  useContractReads,
  useNetwork,
  useProvider,
} from 'wagmi';
import { TimedBlocks } from './core/block';

export function usePoolStats() {
  const { contract, abi, address } = useTypedContract({
    id: 'COMMUNITY_POOL',
  });

  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();

  const { data } = useContractReads({
    enabled: Boolean(walletAddress && chain),
    contracts: [
      {
        address,
        abi,
        functionName: 'getBalance',
        args: [walletAddress, chain?.name],
      },
    ],
  });

  console.log('kia chal ra ai', data?.[0]);

  return {
    walletBalance: data?.[0],
  };
}

/**
 * Get measures for block history over defined period
 * @param param0
 * @returns
 */
export function useBlockHistory({
  time,
  includeLatest,
}: {
  time: number;
  includeLatest: boolean;
}) {
  const { chain } = useNetwork();
  const provider = useProvider({ chainId: chain?.id });

  const timedBlocks = useMemo(
    () => provider && new TimedBlocks(provider),
    [provider],
  );

  const { data: blockNumber } = useBlockNumber();

  const dayStartTime = time - (time % 86400000);

  const chainId = chain ? chain.id : 1;

  const fetchPastBlock = useCallback(
    async (delta: number) => {
      return timedBlocks.getDate(
        String(((dayStartTime as number) - delta) / 1000),
        true,
      );
    },
    [dayStartTime, timedBlocks],
  );

  const isFetching = useIsFetching({ queryKey: ['block_moment'] });

  const initialData = { block: 0, timestamp: 0 };

  const [dayZero, week, month] = useQueries({
    queries: [
      {
        initialData,
        queryKey: ['block_moment', chainId, time, 0],
        cacheTime: Infinity,
        queryFn: () => fetchPastBlock(0),
      },
      {
        initialData,
        queryKey: ['block_moment', chainId, time, 7],
        cacheTime: Infinity,
        queryFn: () => fetchPastBlock(7 * 24 * 60 * 60 * 1000),
      },
      {
        initialData,
        queryKey: ['block_moment', chainId, time, 30],
        cacheTime: Infinity,
        queryFn: () => fetchPastBlock(30 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  const blocksToNow =
    dayZero.data && blockNumber ? blockNumber - dayZero.data.block : 0;
  const increment = includeLatest ? blocksToNow : 0;

  const blocksTotal = dayZero.data ? dayZero.data.block + increment : 0;
  const blocksLatestWeek =
    blocksTotal && week.data?.block ? blocksTotal - week.data.block : 0;
  const blocksLatestMonth =
    blocksTotal && month.data?.block ? blocksTotal - month.data.block : 0;

  return {
    isFetching,
    data: {
      blocksToNow,
      blocksTotal,
      blocksLatestWeek,
      blocksLatestMonth,
    },
  };
}

/**
 *
 */

export function useTransactionHistory() {}

/**
 *
 */

export function useWalletHistory() {}
