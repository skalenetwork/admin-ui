// organize-imports-ignore
import './polyfills';
import { MotionConfig } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
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

import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import { createClient, WagmiConfig } from 'wagmi';
import { provider, chains } from './provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const alchemyId = 'alchemy_id';
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
