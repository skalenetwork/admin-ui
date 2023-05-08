import imaAbi from '@/features/network/abi/abi-ima.union';
import { NETWORK } from '@/features/network/literals';

export type Token = { address: string; name: string };

export type CommonTokenAbi = (typeof imaAbi)['ERC20OnChain_abi'];

export type TokenTypeProps<S> = {
  standard: S;
  network: typeof NETWORK.ETHEREUM | typeof NETWORK.SKALE;
};
