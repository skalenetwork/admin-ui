import { addresses } from '@/features/network';
import { ABI } from '@/features/network/abi/abi';
import erc20Standard from '@/features/network/abi/erc20-standard';
import { liteEncodeAbiFunctions } from '@/features/network/abi/utils';
import { CONTRACT } from '@/features/network/contract';
import { NETWORK, TOKEN_STANDARD } from '@/features/network/literals';
import { Address } from 'abitype';

export const wildcardAddresses = Object.values(addresses).map((addr) =>
  addr.toLowerCase(),
);

export const wildcardLiteEncodedAbis = Object.entries(CONTRACT)
  .filter(([id, c]) => c.network === NETWORK.SKALE)
  .map(([id, c]) => ABI[id])
  .concat([])
  .map((oneAbi) => {
    return liteEncodeAbiFunctions(oneAbi);
  });

export const supportsInterfaceAbi = [
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const INTERFACE_ID = {
  [TOKEN_STANDARD.ERC20.name]: '0x36372b07',
  [TOKEN_STANDARD.ERC721.name]: '0x80ac58cd',
  [TOKEN_STANDARD.ERC721_WITH_METADATA.name]: '0x5b5e139f',
  [TOKEN_STANDARD.ERC1155.name]: '0xd9b67a26',
};

export const STANDARD_CONTRACT = {
  [TOKEN_STANDARD.ERC20.name]: erc20Standard,
} as const;

export function getStandardTokenInterfaceId(
  standardName: keyof typeof INTERFACE_ID,
) {
  return INTERFACE_ID[standardName] as Address;
}
