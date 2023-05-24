/**
 * Client-agnostic context for use across features
 * with provider / signer
 * and with an optional global redux store
 */

import type { Store } from '@reduxjs/toolkit';

import { configureChains, createClient } from '@wagmi/core';
import type { Client } from 'wagmi';

type InitPayload<S> = {
  store: Store<S>;
  chains: ReturnType<typeof configureChains>['chains'];
  providers: any[];
};

interface Context<S = any> {
  store: Store<S>;
  core: Client;
}

let context: Context;

export function init<S>({ store, chains, providers }: InitPayload<S>) {
  const { provider, webSocketProvider } = configureChains(
    [...chains],
    [...providers],
  );

  context = {
    store,
    core: createClient({
      autoConnect: true,
      provider,
      webSocketProvider,
    }),
  };
}

export function getContext(): Context {
  if (!context)
    throw {
      message:
        'Context is not initiated. Make sure that init has been called before using features.',
    };
  return context;
}
