import { chains as skaleChains } from '@/features/network/chains/chains';
import { goerli, mainnet as ethereumMainnet } from 'wagmi';

export default {
  chains: [
    ethereumMainnet,
    goerli,
    ...Object.values(skaleChains.staging),
    ...Object.values(skaleChains.mainnet),
  ],
};
