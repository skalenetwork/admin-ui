import { Chain } from '@wagmi/core';

export const staging = {
  'round-hasty-alsafi': {
    id: 32429474,
    name: 'round-hasty-alsafi',
    network: 'skale',
    nativeCurrency: { decimals: 18, name: 'SKALE', symbol: 'SKL' },
    rpcUrls: {
      default: {
        http: [ 'https://mainnet.skalenodes.com/v1/round-hasty-alsafi' ],
        webSocket: [ 'https://mainnet.skalenodes.com/v1/ws/round-hasty-alsafi' ]
      },
      filestorage: {
        http: [ 'https://mainnet.skalenodes.com/fs/round-hasty-alsafi' ]
      }
    },
    blockExplorers: {
      default: {
        name: 'SKALE Explorer',
        url: 'https://round-hasty-alsafi.explorer.mainnet.skalenodes.com/'
      }
    }
  }
} satisfies { [key: string]: Chain }
  