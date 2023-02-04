import * as otherAddresses from '@skaleproject/constants/lib/addresses/constants';
import * as predeployedAddresses from './addresses-predeployed';

export const addresses = {
  ...predeployedAddresses,
  ...otherAddresses,
};
