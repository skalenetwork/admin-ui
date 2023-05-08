import { Abi } from 'abitype';

export function liteEncodeAbiFunctions(abi: Abi) {
  return abi
    .filter((a) => a.type === 'function')
    .map((i) => `${i.name};${i.inputs?.length};${i.outputs?.length}`);
}
