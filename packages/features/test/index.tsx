import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderHookOptions } from '@testing-library/react';
import {
  renderHook as defaultRenderHook,
  waitFor,
} from '@testing-library/react';
import * as React from 'react';
import type { Client } from 'wagmi';
import { WagmiConfig } from 'wagmi';
import { setupClient } from './utils';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent Jest from garbage collecting cache
      cacheTime: Infinity,
      // Turn off retries to prevent timeouts
      retry: false,
    },
  },
  logger: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
    log: console.log,
    warn: console.warn,
  },
});

const anotherQueryClient = new QueryClient();

type Props = { client?: Client } & {
  children?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode;
};
export function wrapper({
  client = setupClient({ queryClient }),
  children,
}: Props = {}) {
  return (
    <QueryClientProvider client={anotherQueryClient}>
      <WagmiConfig client={client}>{children}</WagmiConfig>
    </QueryClientProvider>
  );
}

export function renderHook<TResult, TProps>(
  hook: (props: TProps) => TResult,
  {
    wrapper: wrapper_,
    ...options_
  }: RenderHookOptions<TProps & { client?: Client }> | undefined = {},
) {
  const options: RenderHookOptions<TProps & { client?: Client }> = {
    ...(wrapper_
      ? { wrapper: wrapper_ }
      : {
          wrapper: (props) => wrapper({ ...props, ...options_?.initialProps }),
        }),
    ...options_,
  };

  queryClient.clear();

  const utils = defaultRenderHook<TResult, TProps>(hook, options);
  return {
    ...utils,
    waitFor: (utils as { waitFor?: typeof waitFor })?.waitFor ?? waitFor,
  };
}

export { act, cleanup } from '@testing-library/react';
export { getProvider, getSigners } from './core';
export {
  actConnect,
  actDisconnect,
  actSwitchNetwork,
  setupClient,
  useAccount,
  useNetwork,
} from './utils';
