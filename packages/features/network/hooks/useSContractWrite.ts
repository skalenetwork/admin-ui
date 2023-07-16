import { useMultisig } from '@/features/multisig/hooks';
import { ABI } from '@/features/network/abi/abi';
import { ContractId, getSContractProp } from '@/features/network/contract';
import { useSContractRead, useSContractReads } from '@/features/network/hooks';
import { build } from '@/features/network/manifest';
import { ExtractAbiFunctionNames } from 'abitype';
import { BigNumber, ethers } from 'ethers';
import { useMemo } from 'react';
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useWaitForTransaction,
} from 'wagmi';

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
] satisfies ExtractAbiFunctionNames<typeof ABI['MULTISIG_WALLET']>[];
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

const createErrorOnPrepare = (
  error,
  {
    contractId,
    functionName,
  }: { contractId?: ContractId; functionName?: string } = {},
) => {
  const _error = error && JSON.parse(JSON.stringify(error));
  const type = _error && (_error.code < 0 ? 'rpc' : 'ethers');
  const code =
    _error && (_error.data?.code !== undefined ? _error.data.code : error.code);
  const message = _error && (_error.data?.message || _error.reason);
  return error
    ? {
        type,
        kind: message?.toLowerCase().includes('accesscontrol') ? 'auth' : '*',
        code,
        message,
        contractId,
        functionName,
        rawError: _error,
      }
    : null;
};

/**
 * Write to a network contract, including pre-deployed multisig
 * @param id ContractId
 * @param param1
 * @returns
 */
export function useSContractWrite<
  TContractId extends ContractId,
  TAbi extends typeof ABI[TContractId],
  TFunctionName extends Extract<
    TAbi[number],
    | { type: 'function'; stateMutability: 'payable' | 'nonpayable' }
    | { type: 'function'; constant: false }
  >['name'],
  TBaseParams extends UsePrepareContractWriteConfig<TAbi, TFunctionName>,
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
  ////
  // prepare addresses and presets

  const account = useAccount();
  const destContract = build.addressAbiPair(id) || {};
  const multisig = build.addressAbiPair('MULTISIG_WALLET');
  if (id === 'MULTISIG_WALLET' && multisigAddress) {
    multisig.address = multisigAddress;
    destContract.address = multisigAddress;
  }
  const { address, abi } = destContract;

  const contractType = getSContractProp(id, 'type');
  const mnmDefaultGasLimit = MNM_GAS_BY_TYPE[contractType] || MNM_MIN_GAS_LIMIT;

  const isAccountChainOwnerRead = useSContractRead('CONTEXT', {
    name: 'getSchainOwnerAddress',
    select: (address) => {
      return address?.toLowerCase() === account.address;
    },
  });

  const { data: isAccountChainOwner } = isAccountChainOwnerRead;

  ////
  // selectively encode data for correct destination contract

  const { pendingTrxIds, counts, owners } = useMultisig({
    address: multisig.address,
  });

  const isAccountMultisigOwner = owners.data?.some(
    (addr) => addr.toLowerCase() === account.address?.toLowerCase(),
  );

  const depsOfAuthorization = [isAccountChainOwnerRead, owners];

  const requiredConfirmations = counts.data.countReqdConfirms;

  const isMultisigAndSubmitOnly =
    id === 'MULTISIG_WALLET' && MULTISIG_ONLY_WALLET_FUNCTIONS.includes(name);

  ////
  // encode transaction data for eoa route

  const destMethodEncoded = useMemo(() => {
    if (
      !(abi && name) ||
      (id === 'MULTISIG_WALLET' ? !isMultisigAndSubmitOnly : false)
    )
      return;
    let destMethodEncoded;
    pendingTrxIds;
    try {
      const iface = new ethers.utils.Interface(abi);
      destMethodEncoded = iface.encodeFunctionData(
        name,
        params.args,
      ) as `0x${string}`;
    } catch (e) {}
    return destMethodEncoded;
  }, [abi, params.args, name, isMultisigAndSubmitOnly]);

  ////
  // encode transaction data for mnm route

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

  ////
  // find if duplicate of existing transaction that is not yet executed
  // (using tx arguments)

  const pendingTrxs = useSContractReads('MULTISIG_WALLET', {
    address: multisig.address,
    enabled: pendingTrxIds.isSuccess,
    reads: (pendingTrxIds.data || []).map((trxId: number) => ({
      name: 'transactions',
      args: [ethers.BigNumber.from(trxId)] as const,
    })),
  });
  const existingTrxIndex: number | undefined | null =
    pendingTrxs.data === undefined
      ? undefined
      : !pendingTrxs.data?.length
      ? null
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
            (id === 'MULTISIG_WALLET'
              ? !!destMethodEncoded &&
                trx.destination.toLowerCase() ===
                  multisig.address.toLowerCase() &&
                trx.data.toLowerCase() === destMethodEncoded.toLowerCase()
              : !!marionetteExecEncoded &&
                trx.destination.toLowerCase() ===
                  marionette.address.toLowerCase() &&
                trx.data.toLowerCase() === marionetteExecEncoded.toLowerCase())
          );
        });

  const existingTrxId: undefined | number =
    existingTrxIndex === undefined
      ? undefined
      : existingTrxIndex < 0
      ? existingTrxIndex
      : (pendingTrxIds.data[existingTrxIndex as number] as number);

  const existingTrxConfirmers = useSContractRead('MULTISIG_WALLET', {
    enabled: !!(existingTrxId && existingTrxId >= 0),
    address: multisig.address,
    name: 'getConfirmations',
    args:
      existingTrxId && existingTrxId >= 0
        ? [BigNumber.from(existingTrxId)]
        : undefined,
  });

  const ownerHasConfirmed: undefined | boolean =
    existingTrxConfirmers.data &&
    account.address &&
    existingTrxConfirmers.data.some((addr: string) => {
      return addr.toLowerCase() === account.address?.toLowerCase();
    });

  const existingTrxConfirmCount: undefined | number =
    existingTrxConfirmers.data && existingTrxConfirmers.data.length;

  const existingTrxIsConfirmed =
    existingTrxConfirmCount &&
    requiredConfirmations &&
    existingTrxConfirmCount >= requiredConfirmations;

  const depsOfAction = [pendingTrxs, existingTrxConfirmers];

  ///
  // prepare correct action on multisig
  // undefined = loading
  // null = not authorized / not available

  let mnmAction = depsOfAuthorization.some((d) => d.isLoading)
    ? 'wait-auth'
    : depsOfAuthorization.some((d) => d.isError)
    ? 'valerr-auth'
    : depsOfAction.some((d) => d.isLoading)
    ? 'wait-action'
    : depsOfAction.some((d) => d.isError)
    ? 'valerr-action'
    : !isAccountMultisigOwner
    ? 'no-owner'
    : existingTrxId === undefined
    ? 'no-submit-validate'
    : existingTrxId === null || existingTrxId < 0
    ? 'submit'
    : ownerHasConfirmed === undefined || existingTrxIsConfirmed === undefined
    ? 'no-existing-validate'
    : ownerHasConfirmed === false
    ? 'confirm'
    : existingTrxIsConfirmed === true
    ? 'execute'
    : 'no-anything';

  ////
  // transaction initiated by EOA on multisig to marionette through to destination contract
  // or on multisig contract directly in case of multisig self management

  const mnmSubmitPrepare = usePrepareContractWrite({
    ...params,
    enabled:
      mnmAction === 'submit' &&
      (!isMultisigAndSubmitOnly
        ? !!marionetteExecEncoded
        : !!destMethodEncoded) &&
      params.enabled !== false,
    address: multisig.address,
    abi: multisig.abi,
    functionName: 'submitTransaction',
    args: marionetteExecEncoded
      ? [marionette.address, 0, marionetteExecEncoded]
      : isMultisigAndSubmitOnly
      ? [address, params.value || 0, destMethodEncoded]
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

  ////
  // create a confirm-or-execute writer if transaction is duplicate

  const confirmFunction =
    mnmAction === 'execute'
      ? 'executeTransaction'
      : mnmAction === 'confirm'
      ? 'confirmTransaction'
      : undefined;

  const mnmConfirmPrepare = usePrepareContractWrite({
    enabled: !!confirmFunction,
    address: multisig.address,
    abi: multisig.abi,
    functionName: confirmFunction,
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

  const eoaPrepare = usePrepareContractWrite({
    ...params,
    enabled:
      !!(address && abi && name) &&
      (id === 'MULTISIG_WALLET' ? !isMultisigAndSubmitOnly : true) &&
      params.enabled !== false,
    address: address as Address,
    abi,
    functionName: name,
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
      params.onError?.(err);
      // console.log(
      //   'check-write:eoa',
      //   `${id}.${name}`,
      //   err?.data ? `\n${err.data.code} : ${err.data.message}` : '',
      // );
    },
  });

  ////
  // setup writers to be exposed and handle resets

  const _mnm = useContractWrite(mnmSubmitPrepare.config);
  const _mnmWait = useWaitForTransaction({
    hash: _mnm.data?.hash,
    onSettled: (data, err) => {
      window.setTimeout(() => {
        _mnm.reset();
      }, 1000);
    },
    onSuccess: () => {
      pendingTrxIds.refetch();
      existingTrxConfirmers.refetch();
    },
  });

  const mnmConfirmTx = useContractWrite(mnmConfirmPrepare.config);
  const mnmConfirmTxWait = useWaitForTransaction({
    hash: mnmConfirmTx.data?.hash,
    onSettled: (data, err) => {
      window.setTimeout(() => {
        mnmConfirmTx.reset();
      }, 1000);
    },
    onSuccess: () => {
      pendingTrxIds.refetch();
      existingTrxConfirmers.refetch();
    },
  });

  const _eoa = useContractWrite(eoaPrepare.config);
  const _eoaWait = useWaitForTransaction({
    hash: _eoa.data?.hash,
    onSettled: (data, err) => {
      window.setTimeout(() => {
        _eoa.reset();
      }, 1000);
    },
  });

  const countRemaining =
    requiredConfirmations === undefined || existingTrxConfirmCount === undefined
      ? undefined
      : Math.max(
          0,
          (requiredConfirmations as number) - existingTrxConfirmCount,
        );

  // extra metadata in case of mnm
  const multisigData = {
    trxId: existingTrxId && existingTrxId >= 0 ? existingTrxId : undefined,
    countRequired: requiredConfirmations as number,
    countConfirmed: existingTrxConfirmCount,
    countRemaining,
    signerHasConfirmed: ownerHasConfirmed,
  };

  const returnData = {
    eoa: {
      action: 'eoa',
      isConfirmed: _eoaWait.isSuccess,
      isFailed: _eoaWait.isError,
      isFinalized: !!_eoaWait.data,
      receipt: _eoaWait.data,
      isErrorOnPrepare: eoaPrepare.isError,
      errorOnPrepare: createErrorOnPrepare(eoaPrepare.error, {
        contractId: id,
        functionName: name,
      }),
      ..._eoa,
      writeAsync: wrapWriteAsync(id, _eoa.writeAsync),
    },
    mnm: !['confirm', 'execute', 'submit'].some((v) => v === mnmAction)
      ? {
          action: mnmAction,
        }
      : mnmAction === 'confirm' || mnmAction === 'execute'
      ? {
          action: mnmAction,
          multisigData,
          isConfirmed: mnmConfirmTxWait.isSuccess,
          isFailed: mnmConfirmTxWait.isError,
          receipt: mnmConfirmTxWait.data,
          isErrorOnPrepare: mnmConfirmPrepare.isError,
          errorOnPrepare: createErrorOnPrepare(mnmConfirmPrepare.error, {
            contractId: id,
            functionName: name,
          }),
          ...mnmConfirmTx,
          writeAsync: wrapWriteAsync(id, mnmConfirmTx.writeAsync),
        }
      : mnmAction === 'submit'
      ? {
          action: mnmAction,
          multisigData,
          isConfirmed: _mnmWait.isSuccess,
          isFailed: _mnmWait.isError,
          receipt: _mnmWait.data,
          isErrorOnPrepare: mnmSubmitPrepare.isError,
          errorOnPrepare: createErrorOnPrepare(mnmSubmitPrepare.error, {
            contractId: id,
            functionName: name,
          }),
          ..._mnm,
          writeAsync: wrapWriteAsync(id, _mnm.writeAsync),
        }
      : {
          action:
            mnmConfirmPrepare.isLoading || mnmSubmitPrepare.isLoading
              ? 'wait'
              : 'none',
          multisigData,
        },
  };

  const defaultWrite = returnData.eoa.write
    ? returnData.eoa
    : isAccountMultisigOwner === true || isAccountChainOwner === true
    ? returnData.mnm
    : returnData.eoa;

  const finalReturnData = {
    ...returnData,
    ...defaultWrite,
  };

  return finalReturnData as typeof returnData &
    typeof returnData['eoa'] &
    typeof returnData['mnm'] & {
      writeAsync: ReturnType<typeof wrapWriteAsync> | undefined;
    };
}
