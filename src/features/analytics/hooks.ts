
import { useEffect } from 'react';

import {
  useSliceDispatch,
  useSliceSelector,
  addMetricGroup,
} from './analytics-slice';

export function useAnalytics() {
  const dispatch = useSliceDispatch();
  const metrics = useSliceSelector((state) => state.metrics);

  let isFetching = true;

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

export function useBlockHistory() {}

export function useTransactionHistory() {}

export function useWalletHistory() {}
