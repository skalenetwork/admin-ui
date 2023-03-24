/**
 * @namespace Analytics
 * @module AnalyticsHooks
 */

import {
  useExplorer,
  useSContractRead,
  useSContractReads,
} from '@/features/network/hooks';
import { NETWORK } from '@/features/network/literals';
import { ethers } from 'ethers';
import { useAccount, useBlockNumber, useNetwork, useProvider } from 'wagmi';

type NoUndefined<T> = T extends undefined ? never : T;

export function usePoolStats() {
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();

  const { data } = useSContractRead('COMMUNITY_POOL', {
    enabled: !!(walletAddress && chain),
    name: 'getBalance',
    args: [walletAddress, chain?.name],
  });

  return {
    walletBalance: data,
  };
}

const ETHEREUM_MAINNET_HASH = ethers.utils
  .id('Mainnet')
  .toString() as `0x${string}`;

export function useSkaleManagerStats() {
  const { chain: originChain, chains } = useNetwork();

  const originChainHash =
    originChain && (ethers.utils.id(originChain.name) as `0x${string}`);

  const sChains = chains.filter((c) => c.network === NETWORK.SKALE);

  const schainWalletBalance = useSContractRead('MANAGER_WALLETS_ON_MAINNET', {
    enabled: !!originChainHash,
    name: 'getSchainBalance',
    args: [originChainHash],
    chainId: 1,
  });

  const exitsFromSchain = useSContractRead('MESSAGE_PROXY_MAINNET_ON_MAINNET', {
    enabled: !!ETHEREUM_MAINNET_HASH,
    name: 'getIncomingMessagesCounter',
    args: [ETHEREUM_MAINNET_HASH],
    chainId: 1,
  });

  const transfersFromMainnet = useSContractRead('MESSAGE_PROXY_SCHAIN', {
    enabled: !!ETHEREUM_MAINNET_HASH,
    name: 'getIncomingMessagesCounter',
    args: [ETHEREUM_MAINNET_HASH],
  });

  const targetConnectedChains = useSContractReads('TOKEN_MANAGER_LINKER', {
    enabled: !!(originChain && sChains?.length),
    reads: sChains.map((targetChain) => ({
      name: 'hasSchain',
      args: [originChain?.name] as const,
      chainId: targetChain?.id,
    })),
    select: (data) => {
      let connectedChains = [] as (typeof originChain & {
        chainHash: `0x${string}`;
      })[];
      data.forEach((isConnected, index) => {
        const chain = sChains[index];
        if (isConnected)
          connectedChains.push({
            ...chain,
            chainHash: ethers.utils.id(chain.name).toString() as `0x${string}`,
          });
      });
      return connectedChains;
    },
  });

  const transfersFromSchains = useSContractReads('MESSAGE_PROXY_SCHAIN', {
    enabled: !!targetConnectedChains.isSuccess,
    reads: targetConnectedChains.data.map((chain) => ({
      name: 'getIncomingMessagesCounter',
      args: [chain.chainHash],
    })),
    select: (data) => {
      const count = (data as number[]).reduce(
        (curr, acc) => (curr || 0) + acc,
        0,
      );
      return count;
    },
  });

  return {
    targetConnectedChains,
    schainWalletBalance,
    exitsFromSchain,
    transfersFromMainnet,
    transfersFromSchains,
  };
}

/**
 * Get measures for block history over defined period
 * @param param0
 * @returns
 */
export function useBlockHistory({
  time,
  includeLatest,
}: {
  time: number;
  includeLatest: boolean;
}) {
  const { chain } = useNetwork();
  const provider = useProvider({ chainId: chain?.id });

  const { data: blockNumber } = useBlockNumber();

  const dayStartTime = (time - (time % 86400000)) / 1000; // seconds

  // ?module=block&action=getblocknobytime×tamp={blockTimestamp}&closest={before/after}

  const [dayZero, week, month] = useExplorer([
    {
      module: 'block',
      action: 'getblocknobytime',
      args: {
        timestamp: dayStartTime,
        closest: 'before',
      },
    },
    {
      module: 'block',
      action: 'getblocknobytime',
      args: {
        timestamp: dayStartTime - 7 * 86400,
        closest: 'before',
      },
    },
    {
      module: 'block',
      action: 'getblocknobytime',
      args: {
        timestamp: dayStartTime - 30 * 86400,
        closest: 'before',
      },
    },
  ]);

  const isFetching = dayZero.isLoading && week.isLoading && month.isLoading;

  const blocksToNow =
    dayZero.data?.result && blockNumber
      ? blockNumber - Number(dayZero.data.result.blockNumber)
      : 0;
  const increment = includeLatest ? blocksToNow : 0;

  const blocksTotal = dayZero.data?.result
    ? Number(dayZero.data.result.blockNumber) + increment
    : 0;
  const blocksLatestWeek =
    blocksTotal && week.data?.result
      ? blocksTotal - Number(week.data.result.blockNumber)
      : 0;
  const blocksLatestMonth =
    blocksTotal && month.data?.result
      ? blocksTotal - Number(month.data.result.blockNumber)
      : 0;

  return {
    isFetching,
    data: {
      blocksToNow,
      blocksTotal,
      blocksLatestWeek,
      blocksLatestMonth,
    },
  };
}
