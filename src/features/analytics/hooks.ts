/**
 * @namespace Analytics
 * @module AnalyticsHooks
 */

import { useExplorer, useSContractReads } from '@/features/network/hooks';
import { useMemo } from 'react';
import { useAccount, useBlockNumber, useNetwork, useProvider } from 'wagmi';
import { TimedBlocks } from './core/block';

type NoUndefined<T> = T extends undefined ? never : T;

export function usePoolStats() {
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();

  const { data } = useSContractReads('COMMUNITY_POOL', {
    enabled: Boolean(walletAddress && chain),
    reads: [
      {
        name: 'getBalance',
        args: [walletAddress, chain?.name],
      },
    ],
  });

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

  const dayStartTime = (time - (time % 86400000)) / 1000; // seconds

  // ?module=block&action=getblocknobytime×tamp={blockTimestamp}&closest={before/after}

  const [dayZero, week, month] = useExplorer([
    {
      module: 'block',
      action: 'getblocknobytime',
      args: {
        timestamp: dayStartTime,
        closest: 'before',
      },
    },
    {
      module: 'block',
      action: 'getblocknobytime',
      args: {
        timestamp: dayStartTime - 7 * 86400,
        closest: 'before',
      },
    },
    {
      module: 'block',
      action: 'getblocknobytime',
      args: {
        timestamp: dayStartTime - 30 * 86400,
        closest: 'before',
      },
    },
  ]);

  const isFetching = dayZero.isLoading && week.isLoading && month.isLoading;

  const blocksToNow =
    dayZero.data?.result && blockNumber
      ? blockNumber - Number(dayZero.data.result.blockNumber)
      : 0;
  const increment = includeLatest ? blocksToNow : 0;

  const blocksTotal = dayZero.data?.result
    ? Number(dayZero.data.result.blockNumber) + increment
    : 0;
  const blocksLatestWeek =
    blocksTotal && week.data?.result
      ? blocksTotal - Number(week.data.result.blockNumber)
      : 0;
  const blocksLatestMonth =
    blocksTotal && month.data?.result
      ? blocksTotal - Number(month.data.result.blockNumber)
      : 0;

  console.log('blockwhaat', blocksLatestWeek);

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
