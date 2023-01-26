import { Chain } from '@wagmi/core';

// @later reduce to '@skaleproject/constants/lib/chains'

export const EXPLORER_NAME = 'SKALE Explorer';

export const nativeCurrency = {
  decimals: 18,
  name: 'SKALE',
  symbol: 'SKL',
};

const NETWORK = {
  ETHEREUM: 'ethereum',
  SKALE: 'skale',
} as const;

function makeDefaultRpcUrls<T extends string>(key: T): Chain['rpcUrls'] {
  return {
    default: {
      http: [`https://staging-v3.skalenodes.com/v1/${key}`],
      webSocket: [`wss://staging-v3.skalenodes.com/v1/ws/${key}`],
    },
    filestorage: {
      http: [`https://staging-v3.skalenodes.com/fs/${key}`],
    },
  };
}

function makeDefaultBlockExplorers<T extends string>(
  key: T,
): Chain['blockExplorers'] {
  return {
    default: {
      name: EXPLORER_NAME,
      url: `https://${key}.staging-v3.skalenodes.com/`,
    },
  };
}

export const staging = {
  'staging-perfect-parallel-gacrux': {
    id: parseInt('0x51b0923d'),
    name: 'Dog Chain',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-perfect-parallel-gacrux'),
    blockExplorers: makeDefaultBlockExplorers(
      'staging-perfect-parallel-gacrux',
    ),
  },
  'staging-legal-crazy-castor': {
    id: parseInt('0x1c6199cc'),
    name: 'staging-legal-crazy-castor',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-legal-crazy-castor'),
    blockExplorers: makeDefaultBlockExplorers('staging-legal-crazy-castor'),
  },
} satisfies { [key: string]: Chain };
