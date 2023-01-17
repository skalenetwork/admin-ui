import Avatar from '@/components/Avatar/Avatar';
import Card from '@/components/Card/Card';
import Select from '@/components/Select/Select';
import { useMultisig } from '@/features/multisig/hooks';
import { useQueries } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import { FlowAddNewOwner } from './FlowAddNewOwner';

export function MultisigOwner({ address }: { address: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-8 py-2">
      <p className="font-medium">Name</p>
      <p className="flex items-center justify-between gap-2">
        <Avatar name={address}></Avatar>
        {'  '}
        <span>{address}</span>
      </p>
      <span className="mono ml-auto">🗑️</span>
    </div>
  );
}

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

export function WalletSelect() {
  return (
    <div className="h-full w-3/5 rounded-lg bg-[var(--white)]">
      <Select
        onValueChange={(val) => window.alert(val)}
        items={[
          { value: 'weeee', renderer: () => <MultisigOwner address="weee" /> },
        ]}
      />
    </div>
  );
}

export default function Multisig() {
  const {
    api: multisigApi,
    connected,
    chainId,
    contract,
    data,
  } = useMultisig();

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
        <WalletSelect />
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
                  <MultisigOwner address={address} key={address} />
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
          bodyClass="flex flex-col gap-2"
        >
          <Card
            lean
            heading={`Queue ( ${pendingTrxIds?.data.length} )`}
            className="h-1/2 bg-[var(--gray4)]"
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
