import { CONTRACT } from '@/features/network/manifest';

export const scope = 'multisig';

const queryKey = (key: any[]) => {
  return [CONTRACT.MULTISIG_WALLET.key, ...key];
};
