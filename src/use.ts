import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

/**
 * Useful useQueries modifier in shape of {[lastOf(queryKey)]: value}
 * @todo implement correctly, currently not reactive
 * @param param0
 * @returns
 */

export function useQueriesMap<T>({ queries }: { queries: T }) {
  const tuple = useQueries({
    queries,
  });
  const data: { [key: string]: (typeof tuple)[0] } = useMemo(() => {
    let obj = {};
    if (queries.length > 0) {
      queries.forEach((query, i) => {
        obj[query.queryKey[query.queryKey.length - 1]] = tuple[i];
      });
    }
    return obj;
  }, [tuple]);

  return { data };
}
