import { providers, Wallet } from 'ethers';

import type { Chain } from '@wagmi/core';

import { staging } from '../network/chains/chains-staging3';
import config from './config';

export function getNetwork(chain: Chain) {
  return {
    chainId: chain.id,
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    name: chain.name,
  };
}

const testChain = staging[config.chainName];

class EthersProviderWrapper extends providers.StaticJsonRpcProvider {
  toJSON() {
    return `<Provider network={${this.network.chainId}} />`;
  }
}

export function getProvider({
  chains = [testChain],
  chainId,
}: { chains?: Chain[]; chainId?: number } = {}) {
  const chain = chains.find((x) => x.id === chainId) ?? testChain;
  const url = chain.rpcUrls.default.http[0];
  const provider = new EthersProviderWrapper(url, getNetwork(chain));
  provider.pollingInterval = 1_000;
  return Object.assign(provider, { chains });
}

export class WalletSigner extends Wallet {
  connectUnchecked(): providers.JsonRpcSigner {
    const uncheckedSigner = (
      this.provider as EthersProviderWrapper
    ).getUncheckedSigner(this.address);
    return uncheckedSigner;
  }
}

export function getSigners() {
  const provider = getProvider();
  return config.accounts.map((x) => new WalletSigner(x.privateKey, provider));
}
