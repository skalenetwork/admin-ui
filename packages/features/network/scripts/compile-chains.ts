/**
 * @module GenerateSChains
 * @description Depends on format of files/chains.json from proxy-ui
 */

import { ethers } from 'ethers';
import * as fs from 'fs';
import * as util from 'util';
import { Chain } from 'wagmi';
import { buildBlockExplorers, buildRpcUrls } from '../chains/lib';
import { CURRENCY, NETWORK } from '../literals';

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

  const rpcSubdomain = networkType === 'staging' ? 'staging-v3' : 'mainnet';

  // let metadata: ChainManifestItem[] = await fetch(
  //   build.chainMetadataUrl(networkType),
  // ).then((res) => res.json());
  const data = await fetch(
    `https://${rpcSubdomain}.${HOST}/${JSON_FILE_PATH}`,
  ).then((res) => res.json());

  const chains = {};

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
        networkType === 'mainnet'
          ? `${name}.explorer.mainnet`
          : `${name}.explorer.staging-v3`,
    });

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        getRpcUrl(name, networkType),
      );
      const { chainId: id } = await provider.getNetwork();
      chains[name] = {
        id,
        name,
        network: NETWORK.SKALE,
        nativeCurrency: CURRENCY.SKALE,
        rpcUrls,
        blockExplorers,
        testnet: networkType === 'staging',
      } satisfies Chain;
      console.log(`[${networkType}]`, 'Compiled', [name, id]);
    } catch (e) {
      console.error(
        `[${networkType}]`,
        'failed to fetch chainId for ',
        name,
        '.. skipping',
      );
    }

    await new Promise((resolve, reject) => setTimeout(() => resolve(0), 100));
  }

  const output = `/**
* @module SChain${networkType[0].toUpperCase() + networkType.slice(1)}
* @description This file is entirely automatically generated by SChain TypeScript compiler
**/
  
import { Chain } from '@wagmi/core';

export const ${networkType} = ${util.inspect(
    chains,
    undefined,
    Infinity,
  )} satisfies { [key: string]: Chain }
  `;

  fs.writeFileSync(path, output, { flag: 'w' });
  console.log(
    `[${networkType}]`,
    `Successfully compiled ${
      Object.keys(chains).length
    } ${networkType} chains to: ${path}`,
  );
}

(async () => {
  try {
    await Promise.all([
      compileChains('staging', './network/chains/chains-staging3.ts'),
      compileChains('mainnet', './network/chains/chains-mainnet.ts'),
    ]);
  } catch (e) {
    console.error(e);
  }
})();
