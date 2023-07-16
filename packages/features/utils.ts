import { utils } from 'ethers';

export function snakeToSentenceCase(
  snakeCase: string,
  excludes: string[] = [],
) {
  return snakeCase
    .split('_')
    .map((r) => (excludes.includes(r) ? r : r[0] + r.slice(1).toLowerCase()))
    .join(' ');
}

export function toSentenceCase(anyCamelCase: string) {
  if (anyCamelCase) {
    const result = anyCamelCase
      .replace(/([A-Z]+)/g, '$1')
      .replace(/([A-Z][a-z])/g, ' $1');
    return (result.charAt(0).toUpperCase() + result.slice(1)).trim();
  }
  return '';
}

export function sanitizeAddress(
  addressLike = '',
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
