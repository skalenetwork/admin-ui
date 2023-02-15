import { Chain } from '@wagmi/core';

export const staging = {
  'staging-legal-crazy-castor': {
    id: 476158412,
    name: 'staging-legal-crazy-castor',
    network: 'skale',
    nativeCurrency: { decimals: 18, name: 'SKALE', symbol: 'SKL' },
    rpcUrls: {
      default: {
        http: [
          'https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor'
        ],
        webSocket: [
          'https://staging-v3.skalenodes.com/v1/ws/staging-legal-crazy-castor'
        ]
      },
      filestorage: {
        http: [
          'https://staging-v3.skalenodes.com/fs/staging-legal-crazy-castor'
        ]
      }
    },
    blockExplorers: {
      default: {
        name: 'SKALE Explorer',
        url: 'https://staging-legal-crazy-castor.explorer.staging-v3.skalenodes.com/'
      }
    }
  }
} satisfies { [key: string]: Chain }
  