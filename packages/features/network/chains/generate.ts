/**
 * @module GenerateSChains
 * @description Depends on format of files/chains.json from proxy-ui
 */

import { ethers } from 'ethers';
import * as fs from 'fs';
import { CURRENCY, NETWORK } from '../literals';
import { buildBlockExplorers, buildRpcUrls } from './lib';

const HOST = 'skalenodes.com';
const JSON_FILE_PATH = 'files/chains.json';

function getRpcUrl(chainName, networkType) {
  if (networkType === 'mainnet') {
    return `https://mainnet.${HOST}/v1/${chainName}`;
  }
  if (networkType === 'staging') {
    return `https://staging-v3.${HOST}/v1/${chainName}`;
  }
}

async function compileChains(networkType, path) {
  if (!['mainnet', 'staging'].includes(networkType)) return;

  let output = `import { Chain } from '@wagmi/core';

export const staging = {\n`;

  const rpcSubdomain = networkType === 'staging' ? 'staging-v3' : 'mainnet';

  let data = await fetch(`https://${rpcSubdomain}.${HOST}/${JSON_FILE_PATH}`);
  data = await data.json();

  for await (const chain of Object.create(data)) {
    const name = chain.chain_info.schain_name;
    const rpcUrls = buildRpcUrls([
      {
        subdomain: rpcSubdomain,
        path: `v1/${name}`,
        wsPath: `v1/ws/${name}`,
        fsPath: `fs/${name}`,
      },
    ]);
    const blockExplorers = buildBlockExplorers({
      host: HOST,
      subdomain:
        networkType === 'mainnet' ? `${name}.explorer.mainnet` : 'staging',
    });

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        getRpcUrl(name, 'staging'),
      );
      const { chainId: id } = await provider.getNetwork();
      output += `'${name}': {
      id: ${id},
      name: '${name}',
      network: '${NETWORK.SKALE}',
      nativeCurrency: '${CURRENCY.SKALE}',
      rpcUrls: ${JSON.stringify(rpcUrls, undefined, 2)},
      blockExplorers: ${JSON.stringify(blockExplorers, undefined, 2)},
    },\n`;
      console.log('Loaded', name, id);
    } catch (e) {
      console.error('failed to fetch chainId for ', name);
    }

    await new Promise((resolve, reject) => setTimeout(() => resolve(0), 100));
  }

  output += '}';

  fs.writeFileSync(path, output);
}

await compileChains('staging', 'chains-staging3.ts');
// await compileChains('mainnet', 'chains-mainnet.ts');
