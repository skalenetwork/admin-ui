import { StandardKey } from '@/features/network/literals';
import { Address } from 'abitype';
import { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Chain } from 'wagmi';

export type OriginTokenData = {
  originContractAddress: Address;
};
export type CloneTokenPreData = {
  name: string;
  symbol: string;
  decimals: number;
};
export type CloneTokenData = {
  cloneContractAddress: Address;
};
export type PermissionData = {
  tokenManagerRoleAddress: Address;
};

type State = {
  standard?: StandardKey;
  originChain?: Chain;
  targetChain?: Chain;
  forms: [
    UseFormReturn<OriginTokenData, any>,
    UseFormReturn<CloneTokenData, any>,
    UseFormReturn<CloneTokenPreData, any>,
    UseFormReturn<PermissionData, any>,
  ];
  tokenAddress?: Address;
};

export const ImaMapTokenContext = createContext<State>();

export const useImaMapTokenContext = () => {
  return useContext(ImaMapTokenContext);
};
