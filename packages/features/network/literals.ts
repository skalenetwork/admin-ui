/**
 * literals are constants that map to pan-chain strings
 * if a mapping starts growing from { key, label }, then it is a candidate for manifest
 * */

export const ACRONYMS = ['IMA', 'ETH', 'MTM', 'FCD', 'ERC'];

/**
 * EVM-based networks
 */
export const NETWORK = {
  ETHEREUM: 'homestead',
  RINKEBY: 'rinkeby',
  GOERLI: 'goerli',
  SKALE: 'skale',
} as const;

export const CURRENCY = {
  SKALE: {
    decimals: 18,
    name: 'SFuel',
    symbol: 'sFUEL',
  },
} as const;

/**
 * Token standard "name" is heavily used as a convention
 * if and when that convention breaks, custom mapping to token managers will be needed
 * ex: ETH: {..., manager: 'TOKEN_MANAGER_ETH'}
 * ETH too is ERC20 but as WETH, DApp-wide bone of contention, here we call it its own standard
 */
export const TOKEN_STANDARD = {
  ETH: {
    name: 'eth',
    label: 'ETH',
  },
  ERC20: {
    name: 'erc20',
    label: 'ERC-20',
  },
  ERC721: {
    name: 'erc721',
    label: 'ERC-721',
  },
  ERC721_WITH_METADATA: {
    name: 'erc721_with_metadata',
    label: 'ERC-721 with Metadata',
  },
  ERC1155: {
    name: 'erc1155',
    label: 'ERC-1155',
  },
} as const;

export type StandardKey = keyof typeof TOKEN_STANDARD;
export type StandardName = (typeof TOKEN_STANDARD)[StandardKey]['name'];
