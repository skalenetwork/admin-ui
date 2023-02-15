import { Chain } from '@wagmi/core';
import { NETWORK } from '../literals';
import { nativeCurrency } from '../manifest';

export const EXPLORER_NAME = 'SKALE Explorer';

function makeDefaultRpcUrls<T extends string>(key: T): Chain['rpcUrls'] {
  return {
    default: {
      http: [`https://mainnet.skalenodes.com/v1/${key}`],
      webSocket: [`wss://staging-v3.skalenodes.com/v1/ws/${key}`],
    },
    filestorage: {
      http: [`https://mainnet.skalenodes.com/fs/${key}`],
    },
  };
}

function makeDefaultBlockExplorers<T extends string>(
  key: T,
): Chain['blockExplorers'] {
  return {
    default: {
      name: EXPLORER_NAME,
      url: `https://${key}.mainnet.skalenodes.com/`,
    },
  };
}

export const MULTICALL_ADDRESS = '0x' as const;

const contracts = {
  multicall3: {
    address: MULTICALL_ADDRESS,
    blockCreated: 1,
  },
};

// outdated chainIDs
// @todo compile static from rpc calls
export const mainnet = {
  'round-hasty-alsafi': {
    id: parseInt('0x414f72a4d550c'),
    name: 'round-hasty-alsafi',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('round-hasty-alsafi'),
    blockExplorers: makeDefaultBlockExplorers('round-hasty-alsafi'),
  },
  'affectionate-immediate-pollux': {
    id: parseInt('0x3ac225168df54'),
    name: 'affectionate-immediate-pollux',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('affectionate-immediate-pollux'),
    blockExplorers: makeDefaultBlockExplorers('affectionate-immediate-pollux'),
  },
  'gargantuan-wealthy-zosma': {
    id: parseInt('0x14bcc435f49d1'),
    name: 'gargantuan-wealthy-zosma',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('gargantuan-wealthy-zosma'),
    blockExplorers: makeDefaultBlockExplorers('gargantuan-wealthy-zosma'),
  },
  'portly-passionate-sirius': {
    id: parseInt('0x2304e88f144ae'),
    name: 'portly-passionate-sirius',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('portly-passionate-sirius'),
    blockExplorers: makeDefaultBlockExplorers('portly-passionate-sirius'),
  },
  'harsh-alsuhail': {
    id: parseInt('0xa766932420cc6'),
    name: 'harsh-alsuhail',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('harsh-alsuhail'),
    blockExplorers: makeDefaultBlockExplorers('harsh-alsuhail'),
  },
  'haunting-devoted-deneb': {
    id: parseInt('0xa766932420cc6'),
    name: 'haunting-devoted-deneb',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('haunting-devoted-deneb'),
    blockExplorers: makeDefaultBlockExplorers('haunting-devoted-deneb'),
  },
  'plain-rotanev': {
    id: parseInt('0x2304e88f144ae'),
    name: 'plain-rotanev',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('plain-rotanev'),
    blockExplorers: makeDefaultBlockExplorers('plain-rotanev'),
  },
  'parallel-stormy-spica': {
    id: parseInt('0x2304e88f144ae'),
    name: 'parallel-stormy-spica',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('parallel-stormy-spica'),
    blockExplorers: makeDefaultBlockExplorers('parallel-stormy-spica'),
  },
  'fit-betelgeuse': {
    id: parseInt('0xd1e8aeb795004'),
    name: 'fit-betelgeuse',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('fit-betelgeuse'),
    blockExplorers: makeDefaultBlockExplorers('fit-betelgeuse'),
  },
  'wan-red-ain': {
    id: parseInt('0x01544badb249b'),
    name: 'wan-red-ain',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('wan-red-ain'),
    blockExplorers: makeDefaultBlockExplorers('wan-red-ain'),
  },
  'turbulent-unique-scheat': {
    id: parseInt('0xcac1bb71f0a97'),
    name: 'turbulent-unique-scheat',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('turbulent-unique-scheat'),
    blockExplorers: makeDefaultBlockExplorers('turbulent-unique-scheat'),
  },
  'adorable-quaint-bellatrix': {
    id: parseInt('0x3ac225168df54'),
    name: 'adorable-quaint-bellatrix',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('adorable-quaint-bellatrix'),
    blockExplorers: makeDefaultBlockExplorers('adorable-quaint-bellatrix'),
  },
  'wary-teeming-mizar': {
    id: parseInt('0x01544badb249b'),
    name: 'wary-teeming-mizar',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('wary-teeming-mizar'),
    blockExplorers: makeDefaultBlockExplorers('wary-teeming-mizar'),
  },
  'light-vast-diphda': {
    id: parseInt('0x6a0d259bd4fb9'),
    name: 'light-vast-diphda',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('light-vast-diphda'),
    blockExplorers: makeDefaultBlockExplorers('light-vast-diphda'),
  },
  'green-giddy-denebola': {
    id: parseInt('0x14bcc435f49d1'),
    name: 'green-giddy-denebola',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('green-giddy-denebola'),
    blockExplorers: makeDefaultBlockExplorers('green-giddy-denebola'),
  },
  'elated-tan-skat': {
    id: parseInt('0xa8982c89d8098'),
    name: 'elated-tan-skat',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('elated-tan-skat'),
    blockExplorers: makeDefaultBlockExplorers('elated-tan-skat'),
  },
  'honorable-steel-rasalhague': {
    id: parseInt('0xa766932420cc6'),
    name: 'honorable-steel-rasalhague',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('honorable-steel-rasalhague'),
    blockExplorers: makeDefaultBlockExplorers('honorable-steel-rasalhague'),
  },
  'frayed-decent-antares': {
    id: parseInt('0xd1e8aeb795004'),
    name: 'frayed-decent-antares',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('frayed-decent-antares'),
    blockExplorers: makeDefaultBlockExplorers('frayed-decent-antares'),
  },
  'curly-red-alterf': {
    id: parseInt('0x0b42b6393c1f5'),
    name: 'curly-red-alterf',
    network: NETWORK.SKALE,
    nativeCurrency,
    rpcUrls: makeDefaultRpcUrls('curly-red-alterf'),
    blockExplorers: makeDefaultBlockExplorers('curly-red-alterf'),
  },
} satisfies { [key: string]: Chain };
