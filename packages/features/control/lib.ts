import erc1155Standard from '@/features/network/abi/erc1155-standard';
import erc20Standard from '@/features/network/abi/erc20-standard';
import erc721Standard from '@/features/network/abi/erc721-standard';
import erc721WithMetadataStandard from '@/features/network/abi/erc721-with-metadata-standard';

import { StandardKey } from '@/features/network/literals';

export const STANDARD_CONTRACT: {
  [key in Exclude<StandardKey, 'ETH'>]: { abi: any; bytecode: string };
} = {
  ERC20: {
    abi: erc20Standard['abi'],
    bytecode: erc20Standard['bytecode'],
  },
  ERC721: {
    abi: erc721Standard['abi'],
    bytecode: erc721Standard['bytecode'],
  },
  ERC721_WITH_METADATA: {
    abi: erc721WithMetadataStandard['abi'],
    bytecode: erc721Standard['bytecode'],
  },
  ERC1155: {
    abi: erc1155Standard['abi'],
    bytecode: erc1155Standard['bytecode'],
  },
};
