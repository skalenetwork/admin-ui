import { STANDARD_CONTRACT } from '@skalenetwork/feat/control/lib';
import { StandardKey } from '@skalenetwork/feat/network/literals';

export type { Token } from '@skalenetwork/feat/bridge/types';

export const OZ_ROLE_FRAGMENT = {
  inputs: [],
  outputs: [
    {
      internalType: 'bytes32',
      name: '',
      type: 'bytes32',
    },
  ],
  stateMutability: 'view',
  type: 'function',
};

export function getStandardTokenAbi(key: StandardKey) {
  return STANDARD_CONTRACT[key]['abi'];
}
