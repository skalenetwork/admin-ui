import imaAbi from '@/features/network/abi/abi-ima.union';
import { StandardKey } from '@/features/network/literals';

export type { Token } from '@/features/bridge/types';

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

export function getStandardTokenAbi(name: StandardKey) {
  const key = `${name}OnChain_abi` as const;
  let abi = imaAbi[key];
  if (!abi.some((f) => f.name === 'MINTER_ROLE')) {
    abi.push({
      name: 'MINTER_ROLE',
      ...OZ_ROLE_FRAGMENT,
    });
  }
  if (!abi.some((f) => f.name === 'BURNER_ROLE')) {
    abi.push({
      name: 'BURNER_ROLE',
      ...OZ_ROLE_FRAGMENT,
    });
  }
  return abi;
}
