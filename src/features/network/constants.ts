/**
 * constants are meant to be pan-chain literals
 * if a mapping starts growing from { key, label }
 * it has implicit foreign context, then it is a candidate for manifest
 * */

/**
 * EVM-based networks
 */
export const NETWORK = {
  ETHEREUM: 'ethereum',
  SKALE: 'skale',
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
  ERC1155: {
    name: 'erc1155',
    label: 'ERC-1155',
  },
} as const;
