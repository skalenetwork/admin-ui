import { ABI } from '@/features/network/abi/abi';
import {
  ContractDetailList,
  ContractIdByAddress,
} from '@/features/network/contract';
import { build } from '@/features/network/manifest';
import { useQueries } from '@tanstack/react-query';
import { Abi, ExtractAbiEventNames } from 'abitype';
import { useState } from 'react';

export function useEvents<
  TAddress extends ContractDetailList['address'],
  TContractId extends ContractIdByAddress<TAddress>,
  TAbi extends typeof ABI[TContractId],
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
