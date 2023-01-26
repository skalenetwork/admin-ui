import * as predeployedAddresses from './addresses-predeployed';
import * as otherAddresses from '@skaleproject/constants/lib/addresses/constants';

export const addresses = {
  ...predeployedAddresses,
  ...otherAddresses,
};
