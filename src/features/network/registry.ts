import { NETWORK } from '@/features/network/literals';

export const OFFCHAIN = {
  chainlist: {},
  [NETWORK.SKALE]: {
    baseUrl: 'https://raw.githubusercontent.com',
    path: 'skalenetwork/skale-network/master',
  },
};
