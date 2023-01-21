import Avatar from '@/components/Avatar/Avatar';
import Card from '@/components/Card/Card';
import Select from '@/components/Select/Select';
import { useMultisig } from '@/features/multisig/hooks';
import { useQueries } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import { FlowAddNewOwner } from './FlowAddNewOwner';

import { CopyIcon, TrashIcon } from '@radix-ui/react-icons';
import { WalletIcon } from '@heroicons/react/20/solid';
import { addresses } from '@/features/network';
import { Address } from 'wagmi';
import { NiceAddress } from './NiceAddress';
import { MultisigOwner } from './MultisigOwner';

export function EventSummary({ id }: { id: any }) {
  return (
    <Card
      lean
      heading={
        <h5>
          {id} - Contract interaction {'<>'}
          <br></br>
          <span className="text-sm text-[var(--gray10)]">
            About 8 hours ago
          </span>
        </h5>
      }
    >
      <p className="text-sm">Needs Confirmation (1 out of 3)</p>
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
        triggerClass="z-50 flex h-full px-2 items-center shadow-sm bg-[var(--white)] text-[var(--black)] rounded-3xl"
        listClass="z-50 w-full bg-[var(--white)] rounded-3xl text-[var(--black)]"
        listItemClass="shadow-sm p-1 hover:bg[var(--gray2)] text-[var(--black)]"
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
  const signerWallets = [
    addresses.SCHAIN_MULTISIG_WALLET_ADDRESS as `0x${string}`,
  ];
  const activeWalletAddress = signerWallets[0];

  const {
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
  } = data;

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
      className="grid h-full w-full grid-cols-[7fr_3fr] grid-rows-[50px_auto]"
      style={{ gridTemplateRows: '50px 1fr', gridTemplateColumns: '7fr 3fr' }}
    >
      <div data-id="toolbar:wallet_select" data-s="1" className="col-span-full">
        <div className="flex h-full w-full items-center gap-2">
          <WalletSelect
            wallets={signerWallets}
            active={activeWalletAddress}
            onActiveChange={(val) => console.log}
          />
          <div className="flex h-full items-center rounded-3xl border-[var(--gray6)] bg-[var(--white)] px-4 shadow-sm">
            <p className="cursor-pointer text-[var(--primary)]">
              +{' '}
              <span className="underline underline-offset-4 hover:underline-offset-2">
                Add new multisig
              </span>
            </p>
          </div>
        </div>
      </div>

      <div data-id="scene" className="row-span-2 grid grid-cols-3 grid-rows-4">
        {/* Counts */}

        <div data-id="wallet_balance" data-s="2">
          <Card full heading="Wallet Balance" bodyClass="flex items-center">
            <p className="text-2xl font-bold text-[var(--primary)]">
              {balance?.data?.decimals} Sfuel
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
                <FlowAddNewOwner
                  alertKey={alertKey}
                  toggleAlert={toggleAlert}
                  owners={owners?.data || []}
                />
              </div>
            }
          >
            {!connected
              ? 'Not Available'
              : !owners
              ? '...'
              : owners.isError
              ? 'Failed to retrieve owners'
              : owners.data
              ? owners.data.map((address, i) => (
                  <MultisigOwner
                    address={address}
                    key={address}
                    showControls={true}
                  />
                ))
              : 'Loading'}
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
              <p className="cursor-pointer text-[var(--primary)]">
                +{' '}
                <span className="underline underline-offset-4 hover:underline-offset-2">
                  New Transaction
                </span>
              </p>
            </div>
          }
          bodyClass="flex flex-col gap-4"
        >
          <Card
            lean
            heading={`Queue ( ${pendingTrxIds?.data.length} )`}
            className="h-1/2 bg-[var(--gray4)]"
            bodyClass="scrollbar"
          >
            <div className="flex flex-col gap-2">
              {!connected
                ? 'Not Available'
                : !pendingTrxIds
                ? '...'
                : pendingTrxIds.isError
                ? 'Failed to retrieve queue'
                : pendingTrxIds.data
                ? pendingTrxIds.data.map((id, i) => (
                    <EventSummary key={id} id={id} />
                  ))
                : 'Loading'}
            </div>
          </Card>
          <Card
            lean
            heading={`History ( ${executedTrxIds?.data.length} )`}
            className="h-1/2 bg-[var(--gray4)]"
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
                    <EventSummary key={id} id={id} />
                  ))
                : 'Loading'}
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
