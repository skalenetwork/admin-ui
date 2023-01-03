import { Chain } from '@wagmi/core';

// @later reduce to '@skaleproject/constants/lib/chains'

export const EXPLORER_NAME = 'SKALE Explorer';

export const nativeCurrency = {
  decimals: 18,
  name: 'SKALE',
  symbol: 'SKL',
};

export const staging = {
  'staging-perfect-parallel-gacrux': {
    id: parseInt('0x51b0923d'),
    name: 'Dog Chain',
    network: 'skale',
    nativeCurrency,
    rpcUrls: {
      default: {
        http: [
          'https://staging-v3.skalenodes.com/v1/staging-perfect-parallel-gacrux',
        ],
        webSocket: [
          'wss://staging-v3.skalenodes.com/v1/ws/staging-perfect-parallel-gacrux',
        ],
      },
      filestorage: {
        http: [
          'https://staging-v3.skalenodes.com/fs/staging-perfect-parallel-gacrux',
        ],
      },
    },
    blockExplorers: {
      default: {
        name: EXPLORER_NAME,
        url: 'https://staging-perfect-parallel-gacrux.explorer.staging-v3.skalenodes.com/',
      },
    },
  },
} satisfies { [key: string]: Chain };
