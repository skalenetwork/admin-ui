import { Chain } from 'wagmi';

// useful later
export const MULTICALL_ADDRESS = '0x' as const;
export const DEFAULT_CONTRACTS = {
  multicall3: {
    address: MULTICALL_ADDRESS,
    blockCreated: 1,
  },
};

// some literals that are almost metadata
export const SKALE_DEFAULT = {
  EXPLORER_NAME: 'SKALE Explorer',
  NODES_HOST: 'skalenodes.com',
};
// stagin: makeDefaultRpcUrls([{subdomain: "staging-v3", path: `v1/${chainName}` OR `v1/ws/${chainName}` OR `fs/${chainName}` }])

// stagin: makeDefaultBlockExplorers({ subdomain: `${chainName}.explorer.staging-v3` })

// mainnet: makeDefaultBlockExplorers({ subdomain: `${chainName}.mainnet` })

// ideally these should moved to own metadata, which can be constructed from these
function urlFrom(
  protocol: 'https' | 'wss',
  host: string,
  subdomain: string,
  path: string,
) {
  return `https://${subdomain ? subdomain + '.' : ''}${host}/${path}`;
}

const dhost = SKALE_DEFAULT.NODES_HOST;

export function buildRpcUrls(
  params: {
    host?: string;
    subdomain: string;
    path: string;
    wsPath: string;
    fsPath: string;
  }[],
): Chain['rpcUrls'] {
  return {
    default: {
      http: params.map(({ host = dhost, subdomain, path }) =>
        urlFrom('https', host, subdomain, path),
      ),
      webSocket: params.map(({ host = dhost, subdomain, wsPath }) =>
        urlFrom('wss', host, subdomain, wsPath),
      ),
    },
    public: {
      http: params.map(({ host = dhost, subdomain, path }) =>
        urlFrom('https', host, subdomain, path),
      ),
      webSocket: params.map(({ host = dhost, subdomain, wsPath }) =>
        urlFrom('wss', host, subdomain, wsPath),
      ),
    },
    filestorage: {
      http: params.map(({ host = dhost, subdomain, fsPath }) =>
        urlFrom('https', host, subdomain, fsPath),
      ),
    },
  };
}

export function buildBlockExplorers({
  host = dhost,
  subdomain,
  path = '',
}: {
  host?: string;
  subdomain: string;
  path?: string;
}): Chain['blockExplorers'] {
  return {
    default: {
      name: SKALE_DEFAULT.EXPLORER_NAME,
      url: `https://${subdomain}.${host}/${path}`,
    },
  };
}
