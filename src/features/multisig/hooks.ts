/**
 * predeployed: MultiSigWallet
 * https://github.com/skalenetwork/multisigwallet-predeployed/blob/develop/contracts/MultiSigWallet.sol
 */

import { MultisigWallet } from '@skaleproject/multisig-wallet/lib';
import { addresses } from '../network';

import { MultisigWalletABI } from '../network/abi-multisigwallet';
import { Address } from '@wagmi/core';
import { useBalance, useContract, useContractReads } from 'wagmi';
import { usePredeployedWrapper } from '../interim/hooks';
import { ethers } from 'ethers';
import { useQueries } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

const multisigContract = {
  address: `${addresses.SCHAIN_MULTISIG_WALLET_ADDRESS}` as `0x${string}`,
  abi: MultisigWalletABI,
};

export function useMultisig({
  address = multisigContract.address,
}: { address?: Address } = {}) {
  const contract = useContract({
    address: addresses.SCHAIN_MULTISIG_WALLET_ADDRESS,
    abi: MultisigWalletABI,
  });
  const { connected, api, chainId, signer } = usePredeployedWrapper(
    (params) => {
      return new MultisigWallet({
        ...params,
        address,
      });
    },
  );

  const defaultParams = { cacheTime: Infinity };

  const queries =
    api && contract
      ? [
          {
            ...defaultParams,
            initialData: [],
            queryKey: ['multisig', 'owners', chainId],
            queryFn: () => api.getOwners(),
          },
          {
            ...defaultParams,
            initialData: 0,
            queryKey: ['multisig', 'countTotalTrx', chainId],
            queryFn: () =>
              api
                .getTransactionCount({
                  pending: true,
                  executed: true,
                })
                .then((val) => val.toNumber()),
          },
          {
            ...defaultParams,
            initialData: 0,
            queryKey: ['multisig', 'countPendingTrx', chainId],
            queryFn: () =>
              api
                .getTransactionCount({
                  pending: true,
                  executed: false,
                })
                .then((val) => val.toNumber()),
          },
          {
            ...defaultParams,
            initialData: 0,
            queryKey: ['multisig', 'countExecutedTrx', chainId],
            queryFn: () =>
              api
                .getTransactionCount({
                  pending: false,
                  executed: true,
                })
                .then((val) => val.toNumber()),
          },
          {
            ...defaultParams,
            initialData: 0,
            queryKey: ['multisig', 'countReqConfirms', chainId],
            queryFn: () => api.getRequired(),
          },
          {
            initialData: [],
            queryKey: ['multisig', 'pendingTrxIds', chainId],
            queryFn: () =>
              api.getTransactionIds({
                from: ethers.BigNumber.from(0),
                to: ethers.BigNumber.from(1),
                pending: true,
                executed: false,
              }),
          },
          {
            initialData: [],
            queryKey: ['multisig', 'executedTrxIds', chainId],
            queryFn: () =>
              api.getTransactionIds({
                from: ethers.BigNumber.from(0),
                to: ethers.BigNumber.from(1),
                pending: false,
                executed: true,
              }),
          },
        ]
      : [];

  const balance = useBalance({ address: address });

  const result = useQueries({
    queries,
  });

  const data = useMemo(() => {
    let data: { [key: string]: object } = {
      balance,
    };
    if (queries.length > 0) {
      queries.forEach((query, i) => {
        data[query.queryKey[1]] = result[i];
      });
    }
    return data;
  }, [result]);

  console.log('data', data);

  return { api, connected, chainId, contract, data };
}
