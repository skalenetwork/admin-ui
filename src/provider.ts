import { chains as skaleChains } from '@/features/network/chains/chains';
import { configureChains, mainnet as ethereumMainnet } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const chains = [
  ethereumMainnet,
  ...Object.values(skaleChains.staging),
  ...Object.values(skaleChains.mainnet),
];

const { provider } = configureChains(chains, [
  jsonRpcProvider({
    rpc: (chain) => {
      return chain?.rpcUrls
        ? {
            http: chain.rpcUrls.default.http[0],
          }
        : null;
    },
  }),
]);

export { provider, chains };
