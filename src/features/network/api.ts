/**
 * Pending ima-js node decoupling
 * OR
 * Pending skale.js/ima implementations
 */

import { ABI } from '@/features/network/abi/abi';
import { CONTRACT } from '@/features/network/contract';
import { Provider } from '@ethersproject/providers';
import { TokenManagerERC20 } from '@skalenetwork/ima-js/build/contracts/schain/TokenManagerERC20';
import { TokenManagerERC1155 } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerERC1155';
import { TokenManagerERC721 } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerERC721';
import { TokenManagerEth } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerEth';
import { TokenManagerLinker } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerLinker';
import { ConfigController } from '@skaleproject/config-controller/lib/contract';
import { MultisigWallet } from '@skaleproject/multisig-wallet/lib';
import { Signer, Wallet } from 'ethers';
import { Address, Chain } from 'wagmi';

/**
 * Somewhat leaky abstraction
 * necessary for seamless contextual hooks
 */

type Class<T, U> = new (...args: U[]) => T;

type ArgProps = {
  provider: Provider;
  signer?: Signer;
  chain: Chain;
  address: Address;
  abi: any;
};

function buildApi<R, U>(
  ApiClass: Class<R, U>,
  args: (params: ArgProps) => ConstructorParameters<Class<R, U>>,
) {
  return (props: ArgProps): R => {
    const passable = args(props);
    return new ApiClass(...passable);
  };
}

export const API = {
  CONFIG_CONTROLLER: buildApi(
    ConfigController,
    ({ address, abi, chain, signer }) => [
      {
        address,
        abi,
        rpcUrl: chain.rpcUrls[0]?.default?.http[0],
        signer: signer as Wallet,
      },
    ],
  ),
  MULTISIG_WALLET: buildApi(
    MultisigWallet,
    ({ address, abi, chain, signer }) => [
      {
        address,
        abi,
        rpcUrl: chain.rpcUrls[0]?.default?.http[0],
        signer: signer as Wallet,
      },
    ],
  ),
  TOKEN_MANAGER_ERC20: buildApi(
    TokenManagerERC20,
    ({ address, abi, chain }) => [{ eth: {} }, address, abi],
  ),
  TOKEN_MANAGER_ERC721: buildApi(
    TokenManagerERC721,
    ({ address, abi, chain }) => [{ eth: {} }, address, abi],
  ),
  TOKEN_MANAGER_ERC1155: buildApi(
    TokenManagerERC1155,
    ({ address, abi, chain }) => [{ eth: {} }, address, abi],
  ),
  TOKEN_MANAGER_ETH: buildApi(TokenManagerEth, ({ address, abi, chain }) => [
    { eth: {} },
    address,
    abi,
  ]),
  TOKEN_MANAGER_LINKER: buildApi(
    TokenManagerLinker,
    ({ address, abi, chain }) => [{ eth: {} }, address, abi],
  ),
} as const;

export function getApi<I extends keyof typeof API>(
  contractId: I,
  { chain, provider, signer }: Pick<ArgProps, 'chain' | 'provider' | 'signer'>,
) {
  const abi = contractId ? ABI[contractId] : undefined;
  const contract = contractId ? CONTRACT[contractId] : undefined;
  if (!(contract ?? abi)) {
    throw `getApi: id=${contractId} is invalid`;
  }
  try {
    const { address } = contract;
    const props = {
      abi,
      address,
      chain,
      provider,
      signer,
    };
    return API[contractId](props) as ReturnType<(typeof API)[I]>;
  } catch (e) {
    throw 'getApi: ' + e;
  }
}
