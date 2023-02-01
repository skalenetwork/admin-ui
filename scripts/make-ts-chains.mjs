import { ethers } from 'ethers';
import * as fs from 'fs';

let data = await fetch('https://staging-v3.skalenodes.com/files/chains.json');
data = await data.json();

let output = 'export const staging = {\n';

for await (let chain of data) {
  const name = chain.chain_info.schain_name;
  try {
    const provider = new ethers.providers.JsonRpcProvider(`https://staging-v3.skalenodes.com/v1/${name}`);
    const { chainId: id } = await provider.getNetwork();
    output += `'${name}': {
      id: ${id},
      name: '${name}',
      network: NETWORK.SKALE,
      nativeCurrency,
      rpcUrls: makeDefaultRpcUrls('${name}'),
      blockExplorers: makeDefaultBlockExplorers('${name}'),
    },\n`;
    console.log('Loaded', name, id);
  } catch (e) {
    console.error("failed to fetch chainId for ", name);
  }

  await new Promise((resolve, reject) => setTimeout(() => resolve(), 200));
}

output += '}';

fs.writeFileSync('chains-staging.ts', output);