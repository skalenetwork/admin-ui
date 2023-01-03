import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/';
import { store } from '@/app/store'; // order this early
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { setup, strict, voidSheet } from 'twind';

import '@/styles/colors.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/utils.css';
import '@/styles/main.css';

setup({
  preflight: false, // do not include base style reset (default: use tailwind preflight)
  mode: strict, // throw errors for invalid rules (default: warn)
  hash: false, // hash all generated class names (default: false)
  theme: {}, // define custom theme values (default: tailwind theme)
  darkMode: 'class', // use a different dark mode strategy (default: 'media')
});

import { chains as skaleChains } from '@/features/network/chains';
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { publicProvider } from '@wagmi/core/providers/public';

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { InjectedConnector } from '@wagmi/core/connectors/injected';

const chains = [mainnet, ...Object.values(skaleChains.staging)];

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

const connects = [new InjectedConnector({ chains })];

const alchemyId = 'wee';

const wagmiClient = createClient(
  getDefaultClient({
    appName: 'SKALE Admin UI',
    alchemyId, // for wallet-connect
    provider,
    chains,
  }),
);

// beware: context hell beyond level-6 nesting

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <BrowserRouter>
          <ConnectKitProvider>
            <App />
          </ConnectKitProvider>
        </BrowserRouter>
      </WagmiConfig>
    </Provider>
  </React.StrictMode>,
);
