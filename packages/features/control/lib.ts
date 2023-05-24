import erc20Standard from '@/features/network/abi/erc20-standard';
import { StandardKey } from '@/features/network/literals';

export const STANDARD_CONTRACT: {
  [key in StandardKey]: { abi: any; bytecode: string };
} = {
  ERC20: {
    abi: erc20Standard['abi'],
    bytecode: erc20Standard['bytecode'],
  },
};
