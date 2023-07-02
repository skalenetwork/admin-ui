import { ABI } from '@/features/network/abi/abi';
import { ContractId } from '@/features/network/contract';
import { useSContract } from '@/features/network/hooks';
import {
  AbiParametersToPrimitiveTypes,
  AbiTypeToPrimitiveType,
  ExtractAbiFunction,
} from 'abitype';
import { Address, useContractReads } from 'wagmi';

/**
 * Read multiple values from a network contract
 * @param id ContractId
 * @param param1
 * @returns
 */
export function useSContractReads<
  TContractId extends ContractId,
  TAbi extends typeof ABI[TContractId],
  TBaseParams extends Parameters<typeof useContractReads>[0],
  TFunctionName extends Extract<
    TAbi[number],
    | { type: 'function'; stateMutability: 'view' }
    | { type: 'function'; constant: true }
  >['name'],
  TReturnData extends AbiTypeToPrimitiveType<
    Extract<
      TAbi[number],
      { type: 'function'; name: TFunctionName }
    >['outputs'][number]['type']
  >,
  TSelect extends (data: (TReturnData | undefined | null)[]) => any,
>(
  id: TContractId,
  {
    reads,
    address,
    ...params
  }: {
    [K in keyof TBaseParams as Exclude<
      K,
      'contracts' | 'select'
    >]: TBaseParams[K];
  } & {
    select?: TSelect;
    address?: Address;
    reads: Array<{
      name: TFunctionName;
      args?: AbiParametersToPrimitiveTypes<
        ExtractAbiFunction<TAbi, TFunctionName>['inputs']
      >;
      chainId?: number;
    }>;
  },
) {
  const { abi, address: defaultAddress } = useSContract({ id: id });

  const contracts = reads.map(({ name, ...oneRead }) => {
    const params = {
      abi,
      address: address || defaultAddress,
      functionName: name,
      ...oneRead,
    };
    return params;
  });
  const response = useContractReads({
    ...params,
    contracts,
    onError: (err) => {
      console.error(
        '[reads]',
        `${id}`,
        err?.data ? `\n${err.data.code} : ${err.data.reason}` : '',
      );
      params.onError?.(err);
    },
  });
  return {
    ...response,
    data: response.data !== undefined ? response.data : Array(reads.length),
  } as {
    [K in keyof typeof response as Exclude<K, 'data'>]: typeof response[K];
  } & {
    data?: TSelect extends undefined
      ? (TReturnData | undefined)[]
      : ReturnType<TSelect>;
  };
}
