import { Chain } from '@wagmi/core';

// @later reduce to '@skaleproject/constants/lib/chains'

export const EXPLORER_NAME = 'SKALE Explorer';

import { NETWORK, nativeCurrency } from './manifest';

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
  'staging-legal-crazy-castor': {
    id: 476158412,
    name: 'staging-legal-crazy-castor',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-legal-crazy-castor'),
    blockExplorers: makeDefaultBlockExplorers('staging-legal-crazy-castor'),
  },
  'staging-purple-arctic-talitha': {
    id: 465227634,
    name: 'staging-purple-arctic-talitha',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-purple-arctic-talitha'),
    blockExplorers: makeDefaultBlockExplorers('staging-purple-arctic-talitha'),
  },
  'staging-generous-flowery-elnath': {
    id: 1801222967,
    name: 'staging-generous-flowery-elnath',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-generous-flowery-elnath'),
    blockExplorers: makeDefaultBlockExplorers(
      'staging-generous-flowery-elnath',
    ),
  },
  'staging-faint-slimy-achird': {
    id: 503129905,
    name: 'staging-faint-slimy-achird',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-faint-slimy-achird'),
    blockExplorers: makeDefaultBlockExplorers('staging-faint-slimy-achird'),
  },
  'staging-perfect-parallel-gacrux': {
    id: 1370526269,
    name: 'staging-perfect-parallel-gacrux',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-perfect-parallel-gacrux'),
    blockExplorers: makeDefaultBlockExplorers(
      'staging-perfect-parallel-gacrux',
    ),
  },
  'staging-severe-violet-wezen': {
    id: 1287568050,
    name: 'staging-severe-violet-wezen',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-severe-violet-wezen'),
    blockExplorers: makeDefaultBlockExplorers('staging-severe-violet-wezen'),
  },
  'staging-utter-unripe-menkar': {
    id: 344106930,
    name: 'staging-utter-unripe-menkar',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-utter-unripe-menkar'),
    blockExplorers: makeDefaultBlockExplorers('staging-utter-unripe-menkar'),
  },
  'staging-aware-chief-gianfar': {
    id: 1517929550,
    name: 'staging-aware-chief-gianfar',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-aware-chief-gianfar'),
    blockExplorers: makeDefaultBlockExplorers('staging-aware-chief-gianfar'),
  },
  'staging-awesome-grave-subra': {
    id: 271642831,
    name: 'staging-awesome-grave-subra',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-awesome-grave-subra'),
    blockExplorers: makeDefaultBlockExplorers('staging-awesome-grave-subra'),
  },
  'staging-famous-winding-tyl': {
    id: 1594672658,
    name: 'staging-famous-winding-tyl',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-famous-winding-tyl'),
    blockExplorers: makeDefaultBlockExplorers('staging-famous-winding-tyl'),
  },
  'staging-lost-likely-aludra': {
    id: 876757986,
    name: 'staging-lost-likely-aludra',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-lost-likely-aludra'),
    blockExplorers: makeDefaultBlockExplorers('staging-lost-likely-aludra'),
  },
  'staging-woozy-frizzy-merga': {
    id: 206279074,
    name: 'staging-woozy-frizzy-merga',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-woozy-frizzy-merga'),
    blockExplorers: makeDefaultBlockExplorers('staging-woozy-frizzy-merga'),
  },
  'staging-weepy-fitting-caph': {
    id: 1019122823,
    name: 'staging-weepy-fitting-caph',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-weepy-fitting-caph'),
    blockExplorers: makeDefaultBlockExplorers('staging-weepy-fitting-caph'),
  },
  'staging-costly-stale-albali': {
    id: 1277340369,
    name: 'staging-costly-stale-albali',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('staging-costly-stale-albali'),
    blockExplorers: makeDefaultBlockExplorers('staging-costly-stale-albali'),
  },
} satisfies { [key: string]: Chain };
