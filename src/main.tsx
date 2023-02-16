// organize-imports-ignore

import { store } from '@/app/store'; // order this early

import './polyfills';
import { MotionConfig } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/';
import App from './App';
import { setup as tailwindSetup } from 'twind';

import '@/styles/base.css';
import '@/styles/colors.css';
import '@/styles/components.css';
import '@/styles/main.css';
import '@/styles/utils.css';

tailwindSetup({
  preflight: false, // do not include base style reset (default: use tailwind preflight)
  mode: 'warn', // throw errors for invalid rules (default: warn)
  hash: false, // hash all generated class names (default: false)
  theme: {}, // define custom theme values (default: tailwind theme)
  darkMode: 'class', // use a different dark mode strategy (default: 'media')
});

import { chains as skaleChains } from '@/features/network/chains/chains';

import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import {
  configureChains,
  createClient,
  mainnet as ethereumMainnet,
  WagmiConfig,
} from 'wagmi';

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// update this when @features/../chains.mainnet is updated
const chains = [ethereumMainnet, ...Object.values(skaleChains.staging)];

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

const alchemyId = 'wee';
const wagmiClient = createClient(
  getDefaultClient({
    appName: 'SKALE Admin UI',
    alchemyId, // for wallet-connect
    provider,
    chains,
  }),
);

const queryClient = new QueryClient();

// beware: context hell beyond level-6 nesting

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider
            theme="nouns"
            options={{
              initialChainId: 0,
            }}
          >
            <MotionConfig transition={{ duration: 0.3, ease: 'easeIn' }}>
              <App />
            </MotionConfig>
          </ConnectKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
