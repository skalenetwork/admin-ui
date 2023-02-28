import Card from '@/components/Card/Card';
import Select from '@/components/Select/Select';
import { NiceAddress } from '@/elements/NiceAddress';
import { useFetchMultisigs, useMultisig } from '@/features/multisig/hooks';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Address, useNetwork } from 'wagmi';

import { PeopleIcon } from '@/components/Icons/Icons';
import { CONTRACT } from '@/features/network/contract';
import { NETWORK } from '@/features/network/literals';
import { MultisigOwner } from '@/screens/Multisig/MultisigOwner';
import NotSupported from '@/screens/NotSupported';
import Prelay from '@/screens/Prelay';
import { BoltIcon } from '@heroicons/react/24/outline';
import { Cross2Icon, DiscIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import humanizeDuration from 'humanize-duration';
import { toast } from 'react-toastify';
import { DataOut as NewOwner, FlowAddNewOwner } from './FlowAddNewOwner';
import {
  DataOut as NewTransaction,
  FlowAddNewTransaction,
} from './FlowAddNewTransaction';
import { FlowAddNewWallet } from './FlowAddNewWallet';
export function EventSummary({
  id,
  events = [],
}: {
  id: any;
  events: ethers.Event[];
}) {
  const countConfirmations = events.filter(
    (e) => e.event === 'Confirmation',
  ).length;
  const submitEvent = events.find((e) => e.event === 'Submission');
  const failed = events.some((e) => e.event === 'ExecutionFailure');
  const executed = events.some((e) => e.event === 'Execution');

  const { data: transaction } = useQuery({
    enabled: Boolean(!executed && submitEvent),
    queryKey: ['transaction', submitEvent?.transactionHash],
    queryFn: () => {
      return submitEvent?.getTransaction();
    },
  });

  const { data: block } = useQuery({
    enabled: Boolean(submitEvent),
    queryKey: ['block', submitEvent?.blockNumber],
    queryFn: () => {
      return submitEvent?.getBlock();
    },
  });

  const elapsed = block
    ? humanizeDuration(
        (Number(block.timestamp) - Math.floor(new Date().getTime() / 1000)) *
          1000,
        { largest: 1 },
      )
    : 0;

  return (
    <Card
      lean
      heading={
        <div>
          <h5 className="flex items-center justify-between">
            <span>
              {id} -{' '}
              {transaction
                ? transaction.data.slice(264, 264 + 10)
                : 'Contract Interacion <>'}{' '}
            </span>
            {failed ? (
              <Cross2Icon className="align-middle text-[var(--red10)]" />
            ) : (
              ''
            )}
          </h5>
          <span className="text-sm text-[var(--gray10)]">
            About {elapsed} ago
          </span>
        </div>
      }
    >
      <p className="text-sm">{countConfirmations} Confirmations</p>
    </Card>
  );
}

export function WalletSelect({
  wallets,
  active,
  onActiveChange,
}: {
  wallets: Address[];
  active: Address;
  onActiveChange: (value: string) => void;
}) {
  return (
    <div className="h-full w-min">
      <Select
        triggerClass="z-50 flex h-full px-2 items-center border bg-[var(--white)] text-[var(--black)] rounded-3xl"
        listClass="z-50 w-full bg-[var(--white)] rounded-3xl text-[var(--black)]"
        listItemClass="shadow-sm p-1 hover:bg[var(--slate)] text-[var(--black)]"
        onValueChange={onActiveChange}
        items={wallets.map((address) => ({
          value: address,
          renderer: () => <NiceAddress className="py-1" address={address} />,
        }))}
        value={active}
      />
    </div>
  );
}

export default function Multisig() {
  // @todo: get from higher context:: multisigs+owners and filter those where signer is owner
  const { data: allWallets } = useFetchMultisigs();
  const activeWalletAddress =
    allWallets[0]?.address || CONTRACT['MULTISIG_WALLET'].address;

  const contractKey = CONTRACT['MULTISIG_WALLET'].key;

  const { chain } = useNetwork();

  const {
    queryKey,
    api: multisigApi,
    connected,
    chainId,
    contract,
    data,
  } = useMultisig({
    address: activeWalletAddress,
  });

  const {
    balance,
    owners,
    countTotalTrx,
    countPendingTrx,
    countExecutedTrx,
    countReqConfirms,
    pendingTrxIds,
    executedTrxIds,
    events,
  } = data;

  const [cachedOwners, setCachedOwners] = useLocalStorage(
    `SKL_MULTISIG_OWNERS:${activeWalletAddress}`,
    {},
  );

  const addOwner = useMutation({
    mutationKey: queryKey([contractKey, 'addOwner']),
    mutationFn:
      multisigApi &&
      (async (payload: NewOwner) => {
        const txResponse = await contract.contract.addOwner(
          payload.ownerAddress as Address,
        );
        setCachedOwners({
          ...cachedOwners,
          [payload.ownerAddress]: {
            address: payload.ownerAddress,
            name: payload.ownerName,
          },
        });
        return txResponse;
        // return multisigApi.addOwner({
        //   address: payload.ownerAddress,
        // });
      }),
  });

  const submitTransaction = useMutation({
    mutationKey: queryKey([contractKey, 'submitTransaction']),
    mutationFn:
      multisigApi &&
      ((payload: NewTransaction) => {
        const args = {
          destination: multisigApi.contract.address as Address,
          value: ethers.BigNumber.from(0),
          data: payload.encoded as `0x${string}`,
        };
        // prepare tx here from multisig.lib
        return contract.contract?.submitTransaction(
          args.destination,
          args.value,
          args.data,
        );
      }),
  });

  const [alertKey, setAlertKey] = useState('');

  const toggleAlert = useCallback(
    (toKey: string = '') => {
      return (open: boolean) => {
        setAlertKey(open ? toKey : '');
      };
    },
    [alertKey],
  );

  return (
    <div
      className="relative grid spaced h-full w-full grid-cols-[7fr_3fr] grid-rows-[50px_auto]"
      style={{ gridTemplateRows: '50px 1fr', gridTemplateColumns: '7fr 3fr' }}
    >
      {chain?.network !== NETWORK.SKALE ? (
        <NotSupported theme="blur">
          <PeopleIcon className="mr-4" />
          &emsp;
          <strong>Multisig Wallets</strong> on SChain allow multi-party accounts
          to perform on-chain actions.
        </NotSupported>
      ) : (
        <></>
      )}
      <div data-id="toolbar:wallet_select" data-s="1" className="col-span-full">
        <div className="flex h-full w-full items-center gap-2">
          <WalletSelect
            wallets={allWallets.map((wallet) => wallet.address)}
            active={activeWalletAddress}
            onActiveChange={(val) => {
              // @todo switch wallet of state
            }}
          />
          <FlowAddNewWallet
            alertKey={alertKey}
            toggleAlert={toggleAlert}
            onSubmit={(data) => {
              // false && addOwner.mutateAsync(data);
            }}
          />
        </div>
      </div>

      <div
        data-id="scene"
        className="row-span-2 grid spaced grid-cols-3 grid-rows-4"
      >
        {/* Counts */}

        <div data-id="wallet_balance" data-s="2">
          <Card full heading="Wallet Balance" bodyClass="flex items-center">
            <p className="text-2xl font-bold text-[var(--primary)]">
              {balance?.data?.decimals} {balance?.data?.symbol}
            </p>
          </Card>
        </div>

        <div data-id="count_confirms" data-s="2">
          <Card
            full
            heading="Required confirmations"
            bodyClass="flex items-center"
          >
            <p className="text-2xl font-bold text-[var(--primary)]">
              {countReqConfirms?.data} conf
            </p>
          </Card>
        </div>

        <div data-id="count_owners" data-s="2">
          <Card full heading="Number of owners" bodyClass="flex items-center">
            <p className="text-2xl font-bold text-[var(--primary)]">
              {owners?.data?.length} persons
            </p>
          </Card>
        </div>

        <div data-id="count_txs" data-s="2">
          <Card full heading="Total transactions" bodyClass="flex items-center">
            <p className="text-2xl font-bold text-[var(--primary)]">
              {countTotalTrx?.data} Txs
            </p>
          </Card>
        </div>

        <div data-id="count_pend_txs" data-s="2">
          <Card
            full
            heading="Pending transactions"
            bodyClass="flex items-center"
          >
            <p className="text-2xl font-bold text-[var(--primary)]">
              {countPendingTrx?.data} Txs
            </p>
          </Card>
        </div>

        <div data-id="count_exe_txs" data-s="2">
          <Card
            full
            heading="Executed transactions"
            bodyClass="flex items-center"
          >
            <p className="text-2xl font-bold text-[var(--primary)]">
              {countExecutedTrx?.data} Txs
            </p>
          </Card>
        </div>

        {/* Owners list */}

        <div
          data-id="list_owners"
          data-s="1"
          className="col-span-full row-start-3 row-end-5"
        >
          <Card
            full
            heading={
              <div className="flex w-full justify-between">
                <h4>Owners</h4>
                {addOwner && (
                  <FlowAddNewOwner
                    alertKey={alertKey}
                    toggleAlert={toggleAlert}
                    owners={owners?.data || []}
                    onSubmit={(data) => {
                      toast.promise(addOwner.mutateAsync(data), {
                        pending: `Adding owner - ${data.ownerName}`,
                        success: `Added owner - ${data.ownerName}`,
                        error: `Failed to add owner - ${data.ownerName}`,
                      });
                    }}
                  />
                )}
              </div>
            }
          >
            {!connected ? (
              'Not Available'
            ) : !owners ? (
              '...'
            ) : owners.isFetching ? (
              <Prelay>
                <span className="animate-bounce px-2">
                  <BoltIcon className="h-5" />
                </span>{' '}
                Finding the owners... just a moment!
              </Prelay>
            ) : owners.isError ? (
              'Failed to retrieve owners'
            ) : owners.data ? (
              owners.data.map((address, i) => (
                <MultisigOwner
                  key={address}
                  name={(cachedOwners || {})[address]?.name}
                  address={address}
                  showControls={true}
                />
              ))
            ) : (
              'Loading'
            )}
          </Card>
        </div>
      </div>

      {/* Transaction lists */}

      <div data-id="list_txs" data-s="1" className="row-span-2">
        <Card
          full
          heading={
            <div className="flex w-full justify-between">
              <h4>Transactions</h4>
              {submitTransaction && (
                <FlowAddNewTransaction
                  alertKey={alertKey}
                  toggleAlert={toggleAlert}
                  onSubmit={(data) => {
                    false &&
                      alert(
                        `to: ${data.contractAddress}\ndata: ${data.encoded}\nopts: {${data.nonce},${data.gasAmount}}`,
                      );
                    toast.promise(submitTransaction.mutateAsync(data), {
                      pending: {
                        render: ({ data }) => `Submitting transaction`,
                      },
                      success: {
                        render: ({ data }) =>
                          `Transaction submitted ${data?.hash}`,
                      },
                      error: {
                        render: ({ data }) => `Transaction failed to submit`,
                      },
                    });
                  }}
                />
              )}
            </div>
          }
          bodyClass="flex flex-col gap-4"
        >
          <Card
            lean
            heading={`Queue ( ${pendingTrxIds?.data?.length} )`}
            className="h-1/2 bg-[var(--slate)]"
            bodyClass="scrollbar"
          >
            <div className="flex flex-col gap-2">
              {!connected ? (
                <Prelay>Not supported by the network.</Prelay>
              ) : !pendingTrxIds ? (
                <Prelay>...</Prelay>
              ) : pendingTrxIds.isError ? (
                <Prelay>Failed to retrieve queue</Prelay>
              ) : pendingTrxIds.data ? (
                pendingTrxIds.data.map((id, i) => (
                  <EventSummary
                    key={id}
                    id={id}
                    events={
                      !events
                        ? []
                        : events.filter(
                            (event) =>
                              event?.args?.['transactionId']?.toNumber() === id,
                          )
                    }
                  />
                ))
              ) : (
                <Prelay>
                  <DiscIcon />
                </Prelay>
              )}
            </div>
          </Card>
          <Card
            lean
            heading={`History ( ${executedTrxIds?.data?.length} )`}
            className="h-1/2 bg-[var(--slate)]"
            bodyClass="scrollbar"
          >
            <div className="flex flex-col gap-2">
              {!connected
                ? 'Not Available'
                : !executedTrxIds
                ? '...'
                : executedTrxIds.isError
                ? 'Failed to retrieve history'
                : executedTrxIds.data
                ? executedTrxIds.data.map((id, i) => (
                    <EventSummary
                      key={id}
                      id={id}
                      events={
                        !events
                          ? []
                          : events.filter(
                              (event) =>
                                event?.args?.['transactionId']?.toNumber() ===
                                id,
                            )
                      }
                    />
                  ))
                : 'Loading'}
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
