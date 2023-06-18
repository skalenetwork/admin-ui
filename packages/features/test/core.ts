import type { Chain, ClientConfig } from '@wagmi/core';
import { createClient } from '@wagmi/core';
import { MockConnector } from '@wagmi/core/connectors/mock';
import { getProvider, getSigners } from './core-utils';

type Config = Partial<ClientConfig> & { chains?: Chain[] };

export function setupClient(config: Config = {}) {
  return createClient({
    connectors: [
      new MockConnector({
        options: {
          signer: getSigners()[0]!,
        },
      }),
    ],
    provider: ({ chainId }) => getProvider({ chainId, chains: config.chains }),
    ...config,
  });
}

export { getProvider, getSigners } from './core-utils';
