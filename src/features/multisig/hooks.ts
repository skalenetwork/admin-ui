import {
  useExplorer,
  useSContractRead,
  useSContractReads,
} from '@/features/network/hooks';
import { NETWORK } from './../network/literals';
/**
 * @namespace Multisig
 * @module MultisigHooks
 * https://github.com/skalenetwork/multisigwallet-predeployed/blob/develop/contracts/MultiSigWallet.sol
 */

import { getAbi } from '@/features/network/abi/abi';
import { CONTRACT, getSContractProp } from '@/features/network/contract';
import {
  useEvents,
  useSContract,
  useSContractApi,
} from '@/features/network/hooks';
import { Address } from '@wagmi/core';
import { ethers } from 'ethers';
import { useCallback } from 'react';
import { useLocalStorage } from 'react-use';
import { useBalance, useNetwork } from 'wagmi';
import { scope } from './core';

const multisigContract = {
  address: getSContractProp('MULTISIG_WALLET', 'address'),
  abi: getAbi('MULTISIG_WALLET'),
};

function liteEncodeAbiFunctions(abi) {
  return abi
    .filter((a) => a.type === 'function')
    .map((i) => `${i.name};${i.inputs?.length};${i.outputs?.length}`);
}

type NamedAddressStorage = {
  [key: string]: {
    address: string;
    name: string;
  };
};

export function useCacheWallet() {
  const defaultAddress = getSContractProp('MULTISIG_WALLET', 'address');
  const [value, setValue] = useLocalStorage<NamedAddressStorage>(
    `SKL_MULTISIG_LIST`,
    {},
  );
  const add = useCallback(
    (payload: NamedAddressStorage[number]) => {
      setValue({
        ...value,
        [payload.address]: {
          address: payload.address,
          name: payload.name,
        },
      });
    },
    [value],
  );
  const remove = useCallback(
    (payload: NamedAddressStorage[number]['address']) => {
      const copy: NamedAddressStorage = JSON.parse(JSON.stringify(value));
      delete copy[payload];
      setValue(copy);
    },
    [value],
  );
  const update = useCallback(
    (payload: NamedAddressStorage[number]['address']) => {
      const copy: NamedAddressStorage = JSON.parse(JSON.stringify(value));
      delete copy[payload];
      setValue(copy);
    },
    [value],
  );
  return {
    value: {
      ...value,
      [defaultAddress]: {
        name: `Default MultiSig ${defaultAddress.slice(0, 5)}`,
        address: defaultAddress,
      },
    },
    add,
    remove,
  };
}

export function useCacheWalletOwners({ address }: { address: Address }) {
  const [value, setValue] = useLocalStorage<NamedAddressStorage>(
    `SKL_MULTISIG_OWNERS:${address}`,
    {},
  );
  const add = useCallback(
    (payload: NamedAddressStorage[number]) => {
      setValue({
        ...value,
        [payload.address]: {
          address: payload.address,
          name: payload.name,
        },
      });
    },
    [value],
  );
  const remove = useCallback(
    (payload: NamedAddressStorage[number]['address']) => {
      const copy: NamedAddressStorage = JSON.parse(JSON.stringify(value));
      delete copy[payload];
      setValue(copy);
    },
    [value],
  );
  return {
    value: {
      ...value,
    },
    add,
    remove,
  };
}

export function useFetchMultisigs(): {
  data: { name: string; address: Address }[];
} {
  const { chain } = useNetwork();

  if (chain?.network !== NETWORK.SKALE) {
    return { data: [] };
  }

  const [deployedContracts] = useExplorer(
    [
      {
        module: 'contract',
        action: 'listcontracts',
        args: {
          page: '1',
          offset: '200',
          filter: 'verified',
        },
      },
    ],
    {
      enabled: Boolean(chain),
      chainId: chain?.id,
    },
  );

  const multisigContracts =
    deployedContracts.isSuccess && deployedContracts?.data?.result
      ? deployedContracts.data.result
          .filter((c) => {
            const matchable = liteEncodeAbiFunctions(JSON.parse(c['ABI']));
            const wildcard = liteEncodeAbiFunctions(getAbi('MULTISIG_WALLET'));
            const abiOverlap = matchable.filter((func) =>
              wildcard.includes(func),
            ).length;
            const ratio = abiOverlap / wildcard.length;
            return (
              ratio === 1 ||
              multisigContract.address.toLowerCase() === c.Address.toLowerCase()
            );
          })
          .map((c: { Address: string; ContractName: string }) => ({
            address: ethers.utils.getAddress(c.Address),
            name: c.ContractName,
          }))
      : [];

  return {
    data: multisigContracts,
  };
}

export function useMultisig({
  address = multisigContract.address,
}: { address?: Address } = {}) {
  const defaultParams = { staleTime: 60 * 5 };

  const contract = useSContract({
    id: 'MULTISIG_WALLET',
  });

  const { api, chainId } = useSContractApi({
    id: 'MULTISIG_WALLET',
  });

  const queryKey = useCallback(
    (key: any[]) => {
      return [chainId, scope, ...key];
    },
    [chainId],
  );

  // queries

  const balance = useBalance({ address: address });

  const countReads = useSContractReads('MULTISIG_WALLET', {
    select: (data) => {
      return data.map((value) => value?.toNumber()) as number[];
    },
    reads: [
      {
        name: 'getTransactionCount',
        args: [true, true],
      },
      {
        name: 'getTransactionCount',
        args: [true, false],
      },
      {
        name: 'getTransactionCount',
        args: [false, true],
      },
      {
        name: 'required',
      },
    ],
  });
  const [countTotalTrx, countPendingTrx, countExecutedTrx, countReqdConfirms] =
    countReads.data;
  const counts = {
    ...countReads,
    data: {
      countTotalTrx,
      countPendingTrx,
      countExecutedTrx,
      countReqdConfirms,
    },
  };

  const owners = useSContractRead('MULTISIG_WALLET', {
    name: 'getOwners',
  });

  const pendingTrxIds = useSContractRead('MULTISIG_WALLET', {
    enabled: !!counts.data.countPendingTrx,
    name: 'getTransactionIds',
    args: [
      ethers.BigNumber.from(0),
      ethers.BigNumber.from(counts.data.countPendingTrx || 0),
      true,
      false,
    ],
    select: (data) => {
      return data.map((trxId) => trxId.toNumber()).reverse() as number[];
    },
  });

  const executedTrxIds = useSContractRead('MULTISIG_WALLET', {
    enabled: !!counts.data.countExecutedTrx,
    name: 'getTransactionIds',
    args: [
      ethers.BigNumber.from(0),
      ethers.BigNumber.from(counts.data.countExecutedTrx || 0),
      false,
      true,
    ],
    select: (data) => {
      return data.map((trxId) => trxId.toNumber()).reverse() as number[];
    },
  });

  const allEvents = useEvents({
    address: CONTRACT['MULTISIG_WALLET'].address,
    fromBlock: 0,
    toBlock: 'latest',
    eventNames: ['Submission', 'Execution', 'ExecutionFailure', 'Confirmation'],
  });

  const combinedEvents = {
    ...allEvents,
    data: allEvents.events
      .map((event) => event.data)
      .reduce((prevEvents, currEvents) => {
        return (prevEvents || []).concat(currEvents || []);
      }),
  };

  return {
    queryKey,
    contract,
    api,
    counts,
    balance,
    owners,
    pendingTrxIds,
    executedTrxIds,
    events: combinedEvents.data,
  };
}
