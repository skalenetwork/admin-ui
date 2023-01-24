import { utils } from 'ethers';

export function toSentenceCase(camelCase: string) {
  if (camelCase) {
    const result = camelCase.replace(/([A-Z])/g, ' $1');
    return result[0].toUpperCase() + result.substring(1).toLowerCase();
  }
  return '';
}

export function sanitizeAddress(
  addressLike: string = '',
  {
    prefix = true,
    checksum = true,
  }: { prefix?: boolean; checksum?: boolean } = {},
) {
  const isAddress = utils.isAddress(addressLike);
  if (!isAddress) {
    return '';
  }

  let address = addressLike;
  const length = addressLike.length;

  if (checksum) {
    address = utils.getAddress(address);
  } else {
    address = address.toLowerCase();
  }

  // prefix transform after checksum is important since we want intuitive results vs web3ily-correct

  if (prefix) {
    address = '0x' + address.replace(/^0x/i, '');
  } else {
    address = address.replace(/^0x/i, '');
  }

  return address;
}
