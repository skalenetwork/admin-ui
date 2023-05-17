import { configureChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import skaleConfig from '../skale.config';

const { chains } = skaleConfig;

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
