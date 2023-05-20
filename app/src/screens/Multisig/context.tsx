import { createContext, useContext } from 'react';

import { getSContractProp } from '@skalenetwork/feat/network/contract';
import { Address } from 'abitype';

const defaultMultisigAddress = getSContractProp('MULTISIG_WALLET', 'address');

export const MultisigContext = createContext({
  walletAddress: defaultMultisigAddress as Address,
});

export const useMultisigContext = () => {
  return useContext(MultisigContext);
};
