import { StandardKey } from '@skalenetwork/feat/network/literals';
import { Address } from 'abitype';
import { createContext, useContext, useMemo } from 'react';
import { UseFormGetFieldState, UseFormReturn } from 'react-hook-form';
import { Chain } from 'wagmi';

export type OriginTokenData = {
  originContractAddress: Address;
};
export type CloneTokenPreData = {
  name: string;
  symbol: string;
  uri: string;
  cloneContractAddress: Address;
};
export type CloneTokenData = {
  cloneContractAddress: Address;
};
export type PermissionData = {
  tokenManagerRoleAddress: Address;
};

type State = {
  standard?: Exclude<StandardKey, 'ETH'>;
  originChain?: Chain;
  targetChain?: Chain;
  forms: {
    originToken: UseFormReturn<OriginTokenData, any>;
    cloneToken: UseFormReturn<CloneTokenData, any>;
    cloneTokenInit: UseFormReturn<CloneTokenPreData, any>;
    permission: UseFormReturn<PermissionData, any>;
  };
  cloneTokenAddress?: Address;
};

export const ImaMapTokenContext = createContext<State>();

export const useImaMapTokenContext = () => {
  return useContext(ImaMapTokenContext);
};

type GetFieldName<Form> = Form extends UseFormReturn<infer R>
  ? Parameters<UseFormGetFieldState<R>>[0]
  : never;

export const useWatchValidField = <
  TForm,
  TFieldName extends GetFieldName<TForm>,
>(
  form: TForm extends UseFormReturn ? TForm : any,
  name: TFieldName,
) => {
  const fieldValue = form.watch(name);
  const isFieldValid = !form.getFieldState(name, form.formState).invalid;
  return useMemo(() => {
    return isFieldValid ? fieldValue : '';
  }, [isFieldValid, fieldValue]);
};
