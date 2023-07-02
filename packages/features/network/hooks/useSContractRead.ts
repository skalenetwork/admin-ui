import { ABI, getAbi } from '@/features/network/abi/abi';
import { ContractId, getSContractProp } from '@/features/network/contract';
import { AbiParametersToPrimitiveTypes, AbiTypeToPrimitiveType } from 'abitype';
import { Address, useContractRead } from 'wagmi';

// these types are created because abitype doesn't support ABIs without stateMutability

export type SContractFunctionName<TAbi extends typeof ABI[keyof typeof ABI]> =
  Extract<
    TAbi[number],
    | { type: 'function'; stateMutability: 'view' }
    | { type: 'function'; constant: true }
  >['name'];

export type SContractReadParams<
  TAbi extends typeof ABI[keyof typeof ABI],
  TFunctionName extends SContractFunctionName<TAbi>,
  TBaseParams = Parameters<typeof useContractRead>[0],
  TArgs = AbiParametersToPrimitiveTypes<
    Extract<TAbi[number], { name: TFunctionName }>['inputs']
  >,
> = {
  [K in keyof TBaseParams as Exclude<
    K,
    'args' | 'functionName' | 'abi' | 'select'
  >]: TBaseParams[K];
} & {
  name: TFunctionName;
  args?: TArgs;
};

/**
 * Read a single variable from a network contract
 * @param id
 * @param param1
 * @returns
 */
export function useSContractRead<
  TContractId extends ContractId,
  TAbi extends typeof ABI[TContractId],
  TBaseParams extends Parameters<typeof useContractRead>[0],
  TFunctionName extends SContractFunctionName<TAbi>,
  TReturnData extends AbiTypeToPrimitiveType<
    Extract<
      TAbi[number],
      { type: 'function'; name: TFunctionName }
    >['outputs'][number]['type']
  >,
  TSelect extends (data: TReturnData) => any,
>(
  id: TContractId,
  {
    name,
    address,
    ...params
  }: SContractReadParams<TAbi, TFunctionName> & { select?: TSelect },
) {
  // implementation
  const defaultAddress = getSContractProp(id, 'address') as Address;
  const abi = getAbi(id);
  const query = useContractRead<TAbi, TFunctionName, TReturnData>({
    ...params,
    address: address || defaultAddress,
    abi,
    functionName: name,
    onError: (err) => {
      console.error(
        '[read]',
        `${id}.${name}`,
        err?.data ? `\n${err.data.code} : ${err.data.reason}` : '',
      );
      params.onError?.(err);
    },
  });
  return {
    ...query,
  } as {
    [K in keyof typeof query as Exclude<K, 'data'>]: typeof query[K];
  } & {
    data?: TSelect extends undefined ? TReturnData : ReturnType<TSelect>;
  };
}
