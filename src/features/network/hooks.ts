import { useMultisig } from '@/features/multisig/hooks';
/**
 * @namespace Network
 * @module NetworkHooks
 * @description Low-level hooks for using network contracts, roles, explorers etc.
 */

import { ABI, ContractIdWithAbi, getAbi } from '@/features/network/abi/abi';
import { API, getApi } from '@/features/network/api';
import {
  CONTRACT,
  ContractDetailList,
  ContractId,
  ContractIdByAddress,
  getSContractDetails,
  getSContractProp,
} from '@/features/network/contract';
import { getSContractProvider } from '@/features/network/core';
import { NETWORK } from '@/features/network/literals';
import { build } from '@/features/network/manifest';
import { ChainManifestItem, NetworkType } from '@/features/network/types';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getContract, getProvider } from '@wagmi/core';
import {
  Abi,
  AbiParametersToPrimitiveTypes,
  AbiTypeToPrimitiveType,
  ExtractAbiEventNames,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useAsyncFn } from 'react-use';
import {
  Address,
  useAccount,
  useContract,
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useSigner,
  useWaitForTransaction,
} from 'wagmi';

const { chainMetadataUrl } = build;

export type RoleFragment = {
  type: 'function';
  name: `${string}_ROLE`;
} & (
  | {
      stateMutability: 'view';
    }
  | { constant: true }
);

const MODULES = [
  'account',
  'stats',
  'transaction',
  'logs',
  'block',
  'token',
  'contract',
] as const;

type ExplorerProps = {
  module: (typeof MODULES)[number];
  action: 'listaccounts' | 'getLogs' | string;
  args?: {
    [key: string]: string;
  };
};

/**
 * Retrieve provider and signer for the network contract
 * @param param0
 * @returns
 */
export function useSContractProvider<T extends ContractId>({ id }: { id: T }) {
  const { chain, chains } = useNetwork();
  const provider = getSContractProvider(id, {
    chain,
    chains,
  });
  const network = useAsyncFn(async () => {
    return provider?.getNetwork();
  });
  const { data: signer } = useSigner({
    chainId: network[0].value?.chainId,
  });
  return {
    provider,
    signer,
  };
}

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @param param0
 * @returns
 */
export function useSContract<
  TContractId extends ContractIdWithAbi,
  TAbi extends (typeof ABI)[TContractId] = (typeof ABI)[TContractId],
>({
  id,
}: {
  id: TContractId;
}): {
  address?: (typeof CONTRACT)[TContractId]['address'];
  abi?: TAbi;
  contract?: ReturnType<typeof useContract<TAbi>>;
} {
  let isError = false;
  let address, abi;
  try {
    address = getSContractDetails(id).address;
    abi = getAbi(id);
  } catch (e) {
    isError = true;
  }
  const { provider, signer } = useSContractProvider({ id });
  const contract = useContract({
    address,
    abi,
    signerOrProvider: signer || provider,
  });
  return {
    isError,
    address,
    abi,
    contract,
  };
}

/**
 * Use network contract SDK wrapper instance
 * @todo make consistent with useTypedContract signature
 * @todo after wrapper registration in manifest: refactor to remove injection
 * @todo consider consuming useTypedContract within
 * @param param0
 * @returns
 */
export function useSContractApi<T extends keyof typeof API>({
  id,
  chainId,
  enabled = true,
}: {
  id: T;
  chainId?: number;
  enabled?: boolean;
}) {
  const { chain, chains } = useNetwork();
  const { provider, signer } = useSContractProvider({ id });
  const connected = chain ? chain.network === NETWORK.SKALE : false;

  const customChain = chains.find((c) => c.id === chainId);
  const customProvider = getProvider({
    chainId,
  });
  const { data: customSigner } = useSigner({
    chainId,
  });

  const params =
    chainId !== undefined && customProvider && customChain && customSigner
      ? {
          chain: customChain,
          provider: customProvider,
          signer: customSigner,
        }
      : chainId === undefined && chain && signer && provider
      ? {
          chain,
          provider,
          signer,
        }
      : undefined;

  const api = useMemo(() => {
    return id && enabled && params ? getApi(id, params) : undefined;
  }, [id, params?.chain, params?.provider, params?.signer, enabled]);

  return {
    connected,
    chainId: chainId || chain?.id,
    signer: params?.signer,
    api,
  };
}

/**
 * Read a single variable from a network contract
 * @param id
 * @param param1
 * @returns
 */

// these types are created because abitype doesn't support ABIs without stateMutability

export type SContractFunctionName<TAbi extends (typeof ABI)[keyof typeof ABI]> =
  Extract<
    TAbi[number],
    | { type: 'function'; stateMutability: 'view' }
    | { type: 'function'; constant: true }
  >['name'];

export type SContractReadParams<
  TAbi extends (typeof ABI)[keyof typeof ABI],
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

export function useSContractRead<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
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
    [K in keyof typeof query as Exclude<K, 'data'>]: (typeof query)[K];
  } & {
    data?: TSelect extends undefined ? TReturnData : ReturnType<TSelect>;
  };
}

/**
 * Read multiple values from a network contract
 * @param id ContractId
 * @param param1
 * @returns
 */
export function useSContractReads<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
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
    [K in keyof typeof response as Exclude<K, 'data'>]: (typeof response)[K];
  } & {
    data?: TSelect extends undefined
      ? (TReturnData | undefined)[]
      : ReturnType<TSelect>;
  };
}

const m = build.addressAbiPair('MARIONETTE');
const marionette = {
  ...m,
  interface: new ethers.utils.Interface(m.abi),
};

// constants

const EOA_TO_MULTISIG_MIN_GAS_LIMIT = 375000;
const MNM_MIN_GAS_LIMIT = 3000000;
const MULTISIG_ONLY_WALLET_FUNCTIONS = [
  'removeOwner',
  'addOwner',
  'replaceOwner',
  'changeRequirement',
] satisfies ExtractAbiFunctionNames<(typeof ABI)['MULTISIG_WALLET']>[];
const MULTISIG_LOG_EXECUTION_FAILURE =
  '0x526441bb6c1aba3c9a4a6ca1d6545da9c2333c8c48343ef398eb858d72b79236';
const MNM_GAS_BY_TYPE = {
  'ima:bridge': 8000000,
};

const wrapWriteAsync = <
  TContractId extends ContractId,
  TWriteAsync extends NonNullable<
    ReturnType<typeof useContractWrite>['writeAsync']
  >,
  TReceipt = Awaited<ReturnType<Awaited<ReturnType<TWriteAsync>>['wait']>>,
>(
  contractId: ContractId,
  writeAsync?: TWriteAsync,
) => {
  if (!writeAsync) return;
  return async (
    confirmations: boolean | number = false,
    overrideConfig?: Parameters<TWriteAsync>[0],
  ) => {
    if (confirmations === false) {
      return writeAsync?.(overrideConfig);
    } else {
      let submitted;
      try {
        submitted = await (writeAsync as TWriteAsync)?.(overrideConfig);
      } catch (err) {
        // log('writeAsync:on-signing', err);
        throw {
          message: 'Failed to send transaction',
          error: err,
        };
      }

      let receipt;
      const { wait, hash } = submitted;
      try {
        receipt = await wait(confirmations === true ? 1 : confirmations);
      } catch (err) {
        // log('writeAsync:on-confirmation', err);
        throw {
          message: 'Transaction sent but failed to confirm',
          error: err,
        };
      }

      if (
        contractId === 'MULTISIG_WALLET' &&
        receipt.logs?.length &&
        receipt.logs.some(
          (log) =>
            log.topics[0]?.toLowerCase() === MULTISIG_LOG_EXECUTION_FAILURE,
        )
      ) {
        throw {
          message: 'Transaction confirmed but failed to execute',
          error: {
            message: 'ExecutionFailure',
          },
        };
      }

      return {
        hash,
        receipt,
      };
    }
  };
};

/**
 * Write to a network contract
 * @param id ContractId
 * @param param1
 * @returns
 */
export function useSContractWrite<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TFunctionName extends Extract<
    TAbi[number],
    | { type: 'function'; stateMutability: 'payable' | 'nonpayable' }
    | { type: 'function'; constant: false }
  >['name'],
  TBaseParams = Parameters<
    typeof usePrepareContractWrite<TAbi, TFunctionName>
  >[0],
>(
  id: TContractId,
  {
    name,
    multisigAddress,
    ...params
  }: Exclude<TBaseParams, 'abi' | 'address' | 'functionName'> & {
    name: TFunctionName;
    multisigAddress?: Address;
  },
) {
  const account = useAccount();

  const destContract = build.addressAbiPair(id) || {};
  const multisig = build.addressAbiPair('MULTISIG_WALLET');

  // overrides for multisig selection
  if (id === 'MULTISIG_WALLET' && multisigAddress) {
    multisig.address = multisigAddress;
    destContract.address = multisigAddress;
  }

  const { address, abi } = destContract;

  const { pendingTrxIds, counts, owners } = useMultisig({
    address: multisig.address,
  });
  const isAccountMultisigOwner = owners.data?.includes(account.address);
  const requiredConfirmations = counts.data.countReqdConfirms;

  const isMultisigOnlyWalletWrite =
    id === 'MULTISIG_WALLET' && MULTISIG_ONLY_WALLET_FUNCTIONS.includes(name);

  const destMethodEncoded = useMemo(() => {
    if (
      !(abi && name) &&
      (id === 'MULTISIG_WALLET' ?? !isMultisigOnlyWalletWrite)
    )
      return;
    let destMethodEncoded;
    try {
      const iface = new ethers.utils.Interface(abi);
      destMethodEncoded = iface.encodeFunctionData(
        name,
        params.args,
      ) as `0x${string}`;
    } catch (e) {}
    return destMethodEncoded;
  }, [abi, params.args, name, isMultisigOnlyWalletWrite]);

  const marionetteExecEncoded = useMemo(() => {
    if (!(address && destMethodEncoded) || id === 'MULTISIG_WALLET') return;
    let marionetteExecEncoded;
    try {
      const args = [address, 0, destMethodEncoded] as const;
      marionetteExecEncoded = marionette.interface.encodeFunctionData(
        'execute',
        args,
      ) as `0x${string}`;
    } catch (e) {}
    return marionetteExecEncoded;
  }, [destMethodEncoded, address]);

  // transaction from EOA directly to destination contract

  const modifyOnlyForMultisig = isMultisigOnlyWalletWrite
    ? {
        functionName: 'submitTransaction',
        args: [address, params.value || 0, destMethodEncoded],
      }
    : {};

  const { config: eoaConfig } = usePrepareContractWrite({
    ...params,
    enabled: !!(address && abi && name) && params.enabled !== false,
    address: address as Address,
    abi,
    functionName: name,
    ...modifyOnlyForMultisig,
    overrides: {
      ...params.overrides,
      gasLimit:
        id === 'MULTISIG_WALLET'
          ? Math.max(
              EOA_TO_MULTISIG_MIN_GAS_LIMIT,
              Number(params?.overrides?.gasLimit || 0),
            )
          : params.overrides?.gasLimit,
    },
    onError: (err) => {
      // log(
      //   'check-write:eoa',
      //   `${id}.${name}`,
      //   err?.data ? `\n${err.data.code} : ${err.data.message}` : '',
      // );
    },
  });

  // transaction initiated by EOA on multisig to marionette through to destination contract

  const contractType = getSContractProp(id, 'type');
  const mnmDefaultGasLimit = MNM_GAS_BY_TYPE[contractType] || MNM_MIN_GAS_LIMIT;

  const { config: mnmConfig } = usePrepareContractWrite({
    ...params,
    enabled:
      !!(marionetteExecEncoded && isAccountMultisigOwner) &&
      params.enabled !== false,
    address: multisig.address,
    abi: multisig.abi,
    functionName: 'submitTransaction',
    args: marionetteExecEncoded
      ? [marionette.address, 0, marionetteExecEncoded]
      : undefined,
    overrides: {
      ...params.overrides,
      gasLimit: Math.max(
        mnmDefaultGasLimit,
        Number(params?.overrides?.gasLimit || 0),
      ),
    },
    onError: (err) => {
      // log(
      //   'check-write:mnm-submit',
      //   `${id}.${name}`,
      //   err?.data ? `\n${err.data.code} : ${err.data.message}` : '',
      // );
      params.onError?.(err);
    },
  });

  // from args: evaluate if transaction is duplicate of unconfirmed transaction

  const pendingTrxs = useSContractReads('MULTISIG_WALLET', {
    address: multisig.address,
    enabled: pendingTrxIds.isSuccess,
    reads: (pendingTrxIds.data || []).map((trxId) => ({
      name: 'transactions',
      args: [ethers.BigNumber.from(trxId)] as const,
    })),
  });
  const existingTrxIndex: undefined | number = !pendingTrxs.data
    ? undefined
    : (
        pendingTrxs.data as {
          data: `0x${string}`;
          destination: `0x${string}`;
          executed: boolean;
          value: BigNumber;
        }[]
      ).findIndex((trx) => {
        return (
          !!trx &&
          !!marionetteExecEncoded &&
          trx.destination.toLowerCase() === marionette.address.toLowerCase() &&
          trx.data.toLowerCase() === marionetteExecEncoded.toLowerCase()
        );
      });
  const existingTrxId: undefined | number =
    !pendingTrxIds.data || existingTrxIndex === undefined
      ? undefined
      : existingTrxIndex < 0
      ? existingTrxIndex
      : (pendingTrxIds.data[existingTrxIndex as number] as number);

  const existingTrxConfirmCount = useSContractRead('MULTISIG_WALLET', {
    enabled: !!(existingTrxId && existingTrxId >= 0),
    address: multisig.address,
    name: 'getConfirmationCount',
    args:
      existingTrxId && existingTrxId >= 0
        ? [BigNumber.from(existingTrxId)]
        : undefined,
    select: (data) => {
      return data?.toNumber();
    },
  });

  // create a confirm writer if transaction is duplicate

  const { config: confirmConfig } = usePrepareContractWrite({
    enabled: !!(existingTrxId && existingTrxId >= 0),
    address: multisig.address,
    abi: multisig.abi,
    functionName: 'confirmTransaction',
    args:
      existingTrxId && existingTrxId >= 0
        ? [BigNumber.from(existingTrxId)]
        : undefined,
    overrides: {
      ...params.overrides,
      gasLimit: Math.max(
        MNM_MIN_GAS_LIMIT,
        Number(params?.overrides?.gasLimit || 0),
      ),
    },
    onError: (err) => {
      // log(
      //   'check-write:mnm-confirm',
      //   `${id}.${name}`,
      //   err?.data ? `\n${err.data.code} : ${err.data.message}` : '',
      // );
      params.onError?.(err);
    },
  });
  const mnmConfirmTx = useContractWrite(confirmConfig);
  const mnmConfirmTxWait = useWaitForTransaction({
    hash: mnmConfirmTx.data?.hash,
    onSuccess: () => {
      existingTrxConfirmCount.refetch();
      window.setTimeout(() => {
        mnmConfirmTx.reset();
      }, 1000);
    },
  });

  const _eoa = useContractWrite(eoaConfig);
  const _eoaWait = useWaitForTransaction({
    hash: _eoa.data?.hash,
    onSettled: (data, err) => {
      window.setTimeout(() => {
        _eoa.reset();
      }, 1000);
    },
  });
  const _mnm = useContractWrite(mnmConfig);
  const _mnmWait = useWaitForTransaction({
    hash: _mnm.data?.hash,
    onSettled: (data, err) => {
      window.setTimeout(() => {
        _mnm.reset();
      }, 1000);
    },
  });

  // expose redundant interface with sufficient states and finality data

  const mnmAction = mnmConfirmTx.write ? 'confirm' : 'submit';
  const mnmConfirms = {
    required: requiredConfirmations,
    confirmed: existingTrxConfirmCount.data,
  };

  // @later if needed include executed state
  const mnmIsFinalized =
    !!(mnmConfirms.confirmed && mnmConfirms.required) &&
    mnmConfirms.confirmed >= mnmConfirms.required;

  const returnData = {
    eoa: {
      isConfirmed: _eoaWait.isSuccess,
      isFailed: _eoaWait.isError,
      receipt: _eoaWait.data,
      isFinalized: !!_eoaWait.data,
      ..._eoa,
      writeAsync: wrapWriteAsync(id, _eoa.writeAsync),
    },
    mnm:
      id === 'MULTISIG_WALLET'
        ? undefined
        : mnmAction === 'confirm'
        ? {
            mnmAction: 'confirm',
            mnmConfirms,
            isConfirmed: mnmConfirmTxWait.isSuccess,
            isFailed: mnmConfirmTxWait.isError,
            receipt: mnmConfirmTxWait.data,
            isFinalized: mnmIsFinalized,
            ...mnmConfirmTx,
            writeAsync: wrapWriteAsync(id, mnmConfirmTx.writeAsync),
          }
        : {
            mnmAction: 'submit',
            mnmConfirms,
            isConfirmed: _mnmWait.isSuccess,
            isFailed: _mnmWait.isError,
            receipt: _mnmWait.data,
            isFinalized: mnmIsFinalized,
            ..._mnm,
            writeAsync: wrapWriteAsync(id, _mnm.writeAsync),
          },
  };

  const defaultWrite =
    returnData.eoa.write || id === 'MULTISIG_WALLET'
      ? returnData.eoa
      : returnData.mnm;

  return {
    ...defaultWrite,
    ...returnData,
  };
}

/**
 * Use wagmi:useContractWrites compatible typed interfaces for any network supported contract by preset ID
 * @description Fetches a list of contracts, for a single, prefer useTypedContract
 * @todo refactor to getSContractProvider() when it's stable
 * @param param0
 * @returns
 */
export function useSContracts<T extends ContractIdWithAbi>({
  id,
}: {
  id: T[];
}): {
  contractId: T;
  address?: (typeof CONTRACT)[T]['address'];
  abi?: (typeof ABI)[T];
  contract?: ReturnType<typeof useContract<(typeof ABI)[T]>>;
}[] {
  const connectedProvider = useProvider();
  const mainnetProvider = getProvider({ chainId: 1 });

  return useMemo(
    () =>
      id
        ? id.map((contractId, index) => {
            const { address, network } = CONTRACT[contractId];

            let abi, contract;

            try {
              abi = getAbi(contractId);
            } catch (e) {
              console.error(e);
            }

            const provider =
              network === NETWORK.SKALE ? connectedProvider : mainnetProvider;

            contract =
              abi &&
              getContract({
                address,
                abi,
                signerOrProvider: provider,
              });

            return {
              contractId,
              address,
              abi,
              contract,
            };
          })
        : [],
    [connectedProvider],
  );
}

export function useRoleAccess<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, role: TRoleName) {
  const { data, ...rest } = useRolesAccess(id, [role]);
  return {
    data: data[0],
    ...rest,
  };
}

export function useRolesAccess<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, roleList?: TRoleName[]) {
  const account = useAccount();

  const accountRole = useSContractRoles(id, roleList);
  const puppeteerRoleHash = useSContractRead('MARIONETTE', {
    name: 'PUPPETEER_ROLE',
  });
  const isMultisigPuppeteer = useSContractRead('MARIONETTE', {
    enabled: puppeteerRoleHash.isSuccess,
    name: 'hasRole',
    args: [puppeteerRoleHash.data as Address, CONTRACT.MULTISIG_WALLET.address],
  });
  const isSignerMultisigOwner = useSContractRead('MULTISIG_WALLET', {
    enabled: !!account.address,
    name: 'isOwner',
    args: [account.address as Address],
  });

  const allReads = [accountRole, isSignerMultisigOwner, isMultisigPuppeteer];

  const data = accountRole.data.map((datum) => {
    const { permissions } = datum;
    const mnmRequirements = [
      permissions.marionette,
      isSignerMultisigOwner.data,
      isMultisigPuppeteer.data,
    ];
    const hasMnm = mnmRequirements.some((v) => v === undefined)
      ? undefined
      : mnmRequirements.reduce((acc, curr) => acc && curr, 1);
    return {
      name: datum.name,
      hash: datum.hash,
      adminAddress: datum.adminAddress,
      isOwnerOfMultisig: isSignerMultisigOwner.data,
      isMultisigPuppeteer: isMultisigPuppeteer.data,
      allow: {
        eoa: permissions.signer,
        mnm: hasMnm,
      },
    };
  });

  return {
    isLoading: allReads.reduce((acc, curr) => ({
      isLoading: acc.isLoading || curr.isLoading,
    }))?.isLoading,
    isFetching: allReads.reduce((acc, curr) => ({
      isFetching: acc.isFetching || curr.isFetching,
    }))?.isFetching,
    data,
  };
}

export function useSContractRole<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, role: TRoleName) {
  const { data, ...rest } = useSContractRoles(id, [role]);
  return {
    data: data[0],
    ...rest,
  };
}

export function useSContractRoles<
  TContractId extends ContractId,
  TAbi extends (typeof ABI)[TContractId],
  TRoleName extends Extract<TAbi[number], RoleFragment>['name'],
>(id: TContractId, roleList?: TRoleName[]) {
  const { address } = useAccount();
  const abi = getAbi(id) || [];

  const rolesOfContract = abi
    .filter(({ type, name }) => type === 'function' && name.includes('_ROLE'))
    .map((fragment) => fragment.name) as TRoleName[];

  const roles = roleList
    ? roleList.filter((role) => rolesOfContract.includes(role))
    : rolesOfContract;

  const roleHash = useSContractReads(id, {
    reads: roles.map((role: TRoleName) => ({
      name: role,
    })),
  });
  const ofSigner = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'hasRole',
          args: [role, address],
        }))
      : [],
  });
  const ofMarionette = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'hasRole',
          args: [role, CONTRACT.MARIONETTE.address],
        }))
      : [],
  });
  const roleAdmin = useSContractReads(id, {
    enabled: roleHash.isSuccess && Boolean(roleHash.data),
    reads: roleHash.data
      ? roleHash.data.map((role) => ({
          name: 'getRoleAdmin',
          args: [role],
        }))
      : [],
  });

  const data: {
    name: string;
    hash?: Address;
    adminAddress?: Address;
    permissions: {
      marionette?: boolean;
      signer?: boolean;
    };
  }[] = roles.map((role, index) => ({
    name: role,
    hash: roleHash.data?.[index] as Address,
    adminAddress: roleAdmin.data?.[index] as Address,
    permissions: {
      marionette: ofMarionette.data?.[index] as boolean,
      signer: ofSigner.data?.[index] as boolean,
    },
  }));

  return {
    isLoading:
      roleHash.isLoading ||
      ofSigner.isLoading ||
      ofMarionette.isLoading ||
      roleAdmin.isLoading,
    isFetching:
      roleHash.isFetching ||
      ofSigner.isFetching ||
      ofMarionette.isFetching ||
      roleAdmin.isFetching,
    data,
  };
}

/**
 * Use API of the block explorer as configured by the chain
 * @param param0
 * @returns
 */
export function useExplorer(
  requests: ExplorerProps[],
  {
    chainId,
    enabled,
  }: {
    enabled?: boolean;
    chainId?: number;
  } = {},
) {
  const { chain: currentChain, chains } = useNetwork();
  const chain = chainId ? chains.find((c) => c.id === chainId) : currentChain;
  const baseUrl = chain?.blockExplorers?.default.url;

  const queries = requests.map((request: ExplorerProps) => {
    const { module, action, args } = request;
    const queryString = new URLSearchParams(args).toString();
    const url =
      baseUrl +
      `api?module=${module}&action=${action}${
        queryString ? '&' + queryString : ''
      }`;
    return {
      enabled,
      queryKey: [chain?.id, module, action, args],
      queryFn: () => fetch(url).then((res) => res.json()),
      refetchOnWindowFocus: false,
    };
  });
  return useQueries({
    queries,
  });
}

export function useEvents<
  TAddress extends ContractDetailList['address'],
  TContractId extends ContractIdByAddress<TAddress>,
  TAbi extends (typeof ABI)[TContractId],
>({
  address,
  fromBlock,
  toBlock,
  blockHash,
  eventNames,
}: {
  address: TAddress;
  fromBlock?: number | string;
  toBlock?: number | string;
  blockHash?: string;
  eventNames: TAddress extends ContractDetailList['address']
    ? TAbi extends Abi
      ? ExtractAbiEventNames<TAbi>[]
      : string[]
    : string[];
}) {
  const contractId = build.contractIdFromAddress(address);
  const { contract, abi } = useSContract({ id: contractId });

  const [streamEvents, setStreamEvents] = useState(
    new Array(eventNames.length),
  );

  const [streeamEvents, setStreeamEvents] = useState([]);

  const pastEvents = useQueries({
    queries: eventNames.map((eventName) => {
      return {
        enabled: Boolean(contract && contract.provider),
        queryKey: ['logs', address, eventName],
        queryFn: () => {
          if (!contract) return [];
          const filter = contract.filters[eventName]();
          return contract?.queryFilter(filter, fromBlock, toBlock);
        },
      };
    }),
  });

  return {
    isLoading: pastEvents.every((event) => event.isLoading),
    events: pastEvents.map((event, index) => {
      return { eventName: eventNames[index], ...event };
    }),
  };
}

export function useChainMetadata({
  networkType = 'staging',
}: {
  networkType?: NetworkType;
}) {
  const { chain } = useNetwork();
  const query = useQuery({
    enabled: networkType !== undefined && !!chain,
    queryKey: ['offchain', `metadata:${networkType}`] as const,
    queryFn: (): Promise<{ [key: string]: ChainManifestItem }> | undefined => {
      return !chain
        ? undefined
        : fetch(chainMetadataUrl(networkType))
            .then((res) => res.json())
            .then((data) => {
              return data[chain.name] || null;
            });
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    chain?.network === NETWORK.SKALE && query.refetch();
  }, [chain?.id]);

  return query;
}

export function useAbi<T extends ContractIdWithAbi>(id: T) {
  const { data } = useQuery({
    queryKey: ['*', 'abi', id],
    queryFn: () => getAbi(id),
  });
  return data;
}
