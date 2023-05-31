// organize-imports-ignore
import '@/app/polyfills';
import { MotionConfig } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setup as tailwindSetup } from 'twind';

import '@/app/styles/base.css';
import '@/app/styles/colors.css';
import '@/app/styles/components.css';
import '@/app/styles/main.css';
import '@/app/styles/utils.css';

tailwindSetup({
  preflight: false, // do not include base style reset (default: use tailwind preflight)
  mode: 'silent', // throw errors for invalid rules (default: warn)
  hash: false, // hash all generated class names (default: false)
  theme: {}, // define custom theme values (default: tailwind theme)
  darkMode: 'class', // use a different dark mode strategy (default: 'media')
});

import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { createClient, CreateClientConfig, WagmiConfig } from 'wagmi';
import { createClient as coreCreateClient } from '@wagmi/core';
import { provider, chains } from './provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const clientConfig: CreateClientConfig = {
  ...getDefaultClient({
    appName: 'SKALE Admin UI',
    provider,
    chains,
    walletConnectProjectId: '',
  }),
  logger: { warn: null },
};
const wagmiClient = createClient(clientConfig);

// initialize @wagmi/core client
coreCreateClient(clientConfig);

// beware: context hell beyond level-6 nesting

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </WagmiConfig>
    </QueryClientProvider>
  </React.StrictMode>,
);
