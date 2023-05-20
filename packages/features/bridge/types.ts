import erc20Standard from '@/features/network/abi/erc20-standard';
import { NETWORK } from '@/features/network/literals';

export type Token = { address: string; name: string };

export type CommonTokenAbi = (typeof erc20Standard)['abi'];

export type TokenTypeProps<S> = {
  standard: S;
  network: typeof NETWORK.ETHEREUM | typeof NETWORK.SKALE;
};
