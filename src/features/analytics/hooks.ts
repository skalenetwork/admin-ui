import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBlockNumber, useProvider, useNetwork } from 'wagmi';
import { BlockMoment } from './core/block';
import { useIsFetching, useQueries, useQuery } from '@tanstack/react-query';

import {
  useSliceDispatch,
  useSliceSelector,
  addMetricGroup,
} from './analytics-slice';

export function useAnalytics() {
  const dispatch = useSliceDispatch();
  const metrics = useSliceSelector((state) => state.metrics);

  let isFetching = false;

  const data = {
    kpis: [
      {
        key: 'count',
        label: 'Count',
        value: 20,
      },
    ],
    period: '30d',
  };

  useEffect(() => {
    data && dispatch(addMetricGroup(data));
  }, []);

  return [isFetching, data];
}

/**
 *
 * @returns
 */

// getBlockTransactionCountByNumber

export function useBlockHistory({
  time,
  includeToday,
}: {
  time: number;
  includeToday: boolean;
}) {
  const { chain } = useNetwork();
  const provider = useProvider({ chainId: chain?.id });

  const blockMoment = useMemo(
    () => provider && new BlockMoment(provider),
    [provider],
  );

  const { data: blockNumber } = useBlockNumber();

  const dayStartTime = time - (time % 86400000);

  const chainId = chain ? chain.id : 1;

  const fetchPeriodBlockCount = useCallback(
    async (delta: number) => {
      return blockMoment.getDate((dayStartTime as number) - delta, true, false);
    },
    [dayStartTime],
  );

  const isFetching = useIsFetching({ queryKey: ['block_moment'] });

  const [total, week, month] = useQueries({
    queries: [
      {
        queryKey: ['block_moment', chainId, time, 0],
        cacheTime: Infinity,
        queryFn: () => fetchPeriodBlockCount(0),
      },
      {
        queryKey: ['block_moment', chainId, time, 7],
        cacheTime: Infinity,
        queryFn: () => fetchPeriodBlockCount(7 * 24 * 60 * 60 * 1000),
      },
      {
        queryKey: ['block_moment', chainId, time, 30],
        cacheTime: Infinity,
        queryFn: () => fetchPeriodBlockCount(30 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  const blocksToday =
    total.data && blockNumber ? blockNumber - total.data.block : 0;

  const increment = includeToday ? blocksToday : 0;

  return {
    isFetching,
    data: {
      blocksToday,
      blocksTotal: total.data ? total.data.block + increment : 0,
      blocksLatestWeek:
        total.data && week.data
          ? total.data.block - week.data.block + increment
          : 0,
      blocksLatestMonth:
        total.data && month.data
          ? total.data.block - month.data.block + increment
          : 0,
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
