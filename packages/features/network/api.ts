/**
 * @module ContractAPI
 */

import { ABI } from '@/features/network/abi/abi';
import { CONTRACT } from '@/features/network/contract';
import { Provider } from '@ethersproject/providers';
import { DepositBoxERC1155 } from '@skalenetwork/ima-js/src/contracts/mainnet/DepositBoxERC1155';
import { DepositBoxERC20 } from '@skalenetwork/ima-js/src/contracts/mainnet/DepositBoxERC20';
import { DepositBoxERC721 } from '@skalenetwork/ima-js/src/contracts/mainnet/DepositBoxERC721';
import { DepositBoxEth } from '@skalenetwork/ima-js/src/contracts/mainnet/DepositBoxEth';
import { TokenManagerERC1155 } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerERC1155';
import { TokenManagerERC20 } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerERC20';
import { TokenManagerERC721 } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerERC721';
import { TokenManagerEth } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerEth';
import { TokenManagerLinker } from '@skalenetwork/ima-js/src/contracts/schain/TokenManagerLinker';
import { ConfigController } from '@skaleproject/config-controller';
import { Context } from '@skaleproject/context';
import { InjectedMultisigWallet } from '@skaleproject/multisig-wallet';
import { Signer, Wallet } from 'ethers';
import { Address, Chain } from 'wagmi';

type Class<T, U> = new (...args: U[]) => T;

type ArgProps = {
  provider: Provider;
  signer?: Signer;
  chain: Chain;
  address: Address;
  abi: any;
  name: string;
};

/**
 * Utility class instantiator
 * @description Allows type forwarding of class and mapping of general chain context
 * @param ApiClass
 * @param args
 * @returns
 */
function buildApi<R, U>(
  ApiClass: Class<R, U>,
  args: (params: ArgProps) => ConstructorParameters<Class<R, U>>,
) {
  return (props: ArgProps): R => {
    const passable = args(props);
    return new ApiClass(...passable);
  };
}

/**
 * Maps ContractId to their API's argument-less "instantiators", NOT "instances"
 */
export const API = {
  CONTEXT: buildApi(Context, ({ address, abi, chain, signer }) => [
    {
      address,
      abi,
      rpcUrl: chain.rpcUrls?.default?.http[0],
      signer: signer as Wallet,
    },
  ]),
  CONFIG_CONTROLLER: buildApi(
    ConfigController,
    ({ address, abi, chain, signer }) => [
      {
        address,
        abi,
        rpcUrl: chain.rpcUrls?.default?.http[0],
        signer: signer as Wallet,
      },
    ],
  ),
  MULTISIG_WALLET: buildApi(
    InjectedMultisigWallet,
    ({ address, abi, signer }) => [
      {
        address,
        abi,
        signer: signer as Wallet,
      },
    ],
  ),
  TOKEN_MANAGER_ERC20: buildApi(
    TokenManagerERC20,
    ({ address, abi, signer, name, provider }) => [
      provider,
      address,
      abi,
      name,
    ],
  ),
  TOKEN_MANAGER_ERC721: buildApi(
    TokenManagerERC721,
    ({ address, abi, signer, name, provider }) => [
      provider,
      address,
      abi,
      name,
    ],
  ),
  TOKEN_MANAGER_ERC721_WITH_METADATA: buildApi(
    TokenManagerERC721,
    ({ address, abi, signer, name, provider }) => [
      provider,
      address,
      abi,
      name,
    ],
  ),
  TOKEN_MANAGER_ERC1155: buildApi(
    TokenManagerERC1155,
    ({ address, abi, signer, name, provider }) => [
      provider,
      address,
      abi,
      name,
    ],
  ),
  TOKEN_MANAGER_ETH: buildApi(
    TokenManagerEth,
    ({ address, abi, signer, name }) => [signer?.provider, address, abi, name],
  ),
  TOKEN_MANAGER_LINKER: buildApi(
    TokenManagerLinker,
    ({ address, abi, signer, name }) => [signer?.provider, address, abi, name],
  ),
  DEPOSIT_BOX_ETH: buildApi(DepositBoxEth, ({ address, abi, signer, name }) => [
    signer?.provider,
    address,
    abi,
    name,
  ]),
  DEPOSIT_BOX_ERC20: buildApi(
    DepositBoxERC20,
    ({ address, abi, signer, name }) => [signer?.provider, address, abi, name],
  ),
  DEPOSIT_BOX_ERC721: buildApi(
    DepositBoxERC721,
    ({ address, abi, signer, name }) => [signer?.provider, address, abi, name],
  ),
  DEPOSIT_BOX_ERC721_WITH_METADATA: buildApi(
    DepositBoxERC721,
    ({ address, abi, signer, name }) => [signer?.provider, address, abi, name],
  ),
  DEPOSIT_BOX_ERC1155: buildApi(
    DepositBoxERC1155,
    ({ address, abi, signer, name }) => [signer?.provider, address, abi, name],
  ),
} satisfies {
  [key in keyof typeof CONTRACT & keyof typeof ABI]?: ReturnType<
    typeof buildApi
  >;
};

/**
 * By Contract ID, gracefully get API instance
 * @param contractId Unique Contract ID
 * @param context chain, provider, signer
 * @returns
 */
export function getApi<I extends keyof typeof API>(
  contractId: I,
  { chain, provider, signer }: Pick<ArgProps, 'chain' | 'provider' | 'signer'>,
) {
  const abi = contractId ? ABI[contractId] : undefined;
  const contract = contractId ? CONTRACT[contractId] : undefined;
  if (!(contract ?? abi)) {
    console.warn(`getApi: id=${contractId} is invalid`);
    return;
  }
  try {
    // @ts-ignore
    const { address, name } = contract;
    const props = {
      abi,
      address,
      chain,
      provider,
      signer,
      name,
    };
    return API[contractId](props) as ReturnType<typeof API[I]>;
  } catch (e) {
    console.error('getApi', e);
    return;
  }
}
