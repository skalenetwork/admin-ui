import { getContract, Address } from '@wagmi/core';
import { Marionette } from '@skaleproject/marionette/lib/contract';
import { MarionetteABI } from '@/features/network/abi-marionette';

import { SCHAIN_MARIONETTE_ADDRESS } from '@skaleproject/constants/lib/addresses/predeployed';
import { Provider } from '@ethersproject/providers';

export async function getMarionette() {
  // return getContract({
  //   abi: MarionetteABI,
  //   signerOrProvider: provider,
  // });
}
