import Card from '@/components/Card/Card';
import { PeopleIcon } from '@/components/Icons/Icons';
import Select from '@/components/Select/Select';
import { NiceAddress } from '@/elements/NiceAddress';
import { useCacheWallet, useMultisig } from '@/features/multisig/hooks';
import { getAbi } from '@/features/network/abi/abi';
import { CONTRACT } from '@/features/network/contract';
import { NETWORK } from '@/features/network/literals';
import { MultisigOwner } from '@/screens/Multisig/MultisigOwner';
import NotSupported from '@/screens/NotSupported';
import Prelay from '@/screens/Prelay';
import { BoltIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Address, useNetwork } from 'wagmi';
import { FlowAddNewOwner } from './FlowAddNewOwner';
import { FlowAddNewTransaction } from './FlowAddNewTransaction';
import { FlowAddNewWallet } from './FlowAddNewWallet';
import { WidgetMultisigTx } from './WidgetMultisigTx';

const marionetteExecArgs = getAbi('MARIONETTE')
  .find((f) => f.name === 'execute')
  .inputs.map((i) => i.type);

export function WalletSelect({
  wallets,
  active,
  onActiveChange,
}: {
  wallets: { address: Address; name: string }[];
  active: Address;
  onActiveChange: (value: string) => void;
}) {
  return (
    <div className="h-full min-w-[400px] w-max">
      <Select
        triggerClass="z-50 flex w-full h-full px-2 items-center border bg-[var(--white)] text-[var(--black)] rounded-3xl"
        listClass="z-50 w-full bg-[var(--white)] rounded-3xl text-[var(--black)]"
        listItemClass="shadow-sm p-1 hover:bg[var(--slate)] text-[var(--black)]"
        onValueChange={onActiveChange}
        items={wallets.map(({ address, name }) => ({
          value: address,
          renderer: () => (
            <NiceAddress
              className="py-1"
              label={name}
              address={address}
              labelOnly
            />
          ),
        }))}
        value={active}
      />
    </div>
  );
}

export default function Multisig() {
  const { value: walletList } = useCacheWallet();

  const activeWalletAddress =
    Object.entries(walletList)[0][1]?.address ||
    CONTRACT['MULTISIG_WALLET'].address;

  const contractKey = CONTRACT['MULTISIG_WALLET'].key;

  const { chain } = useNetwork();

  const {
    queryKey,
    api: multisigApi,
    contract,
    balance,
    owners,
    counts: {
      data: {
        countTotalTrx,
        countPendingTrx,
        countExecutedTrx,
        countReqdConfirms,
      },
      refetch: countsRefetch,
    },
    pendingTrxIds,
    executedTrxIds,
    events,
  } = useMultisig({
    address: activeWalletAddress,
  });

  const [cachedOwners, setCachedOwners] = useLocalStorage<{
    [key: string]: {
      address: string;
      name: string;
    };
  }>(`SKL_MULTISIG_OWNERS:${activeWalletAddress}`, {});

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
            wallets={Object.entries(walletList).map(
              ([address, wallet]) => wallet,
            )}
            active={activeWalletAddress}
            onActiveChange={(val) => {
              // @todo switch wallet of state
            }}
          />
          <FlowAddNewWallet
            alertKey={alertKey}
            toggleAlert={toggleAlert}
            onSubmit={(data) => {}}
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
              {countReqdConfirms} conf
            </p>
          </Card>
        </div>

        <div data-id="count_owners" data-s="2">
          <Card full heading="Number of owners" bodyClass="flex items-center">
            <p className="text-2xl font-bold text-[var(--primary)]">
              {owners?.data?.length} Owners
            </p>
          </Card>
        </div>

        <div data-id="count_txs" data-s="2">
          <Card full heading="Total transactions" bodyClass="flex items-center">
            <p className="text-2xl font-bold text-[var(--primary)]">
              {countTotalTrx} Txs
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
              {countPendingTrx} Txs
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
              {countExecutedTrx} Txs
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
                  onSubmit={(data) => {
                    setCachedOwners({
                      ...cachedOwners,
                      [data.ownerAddress]: {
                        address: data.ownerAddress,
                        name: data.ownerName,
                      },
                    });
                  }}
                />
              </div>
            }
          >
            {!owners ? (
              '...'
            ) : owners.isLoading ? (
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
              <FlowAddNewTransaction
                alertKey={alertKey}
                toggleAlert={toggleAlert}
                onSubmit={(data) => {
                  executedTrxIds.refetch();
                  pendingTrxIds.refetch();
                  countsRefetch();
                }}
              />
            </div>
          }
          bodyClass="flex flex-col gap-4"
        >
          <Card
            lean
            heading={`Queue ( ${pendingTrxIds?.data?.length || ''} )`}
            className="h-1/2 !bg-[var(--slate)]"
            bodyClass="scrollbar"
          >
            <div className="flex flex-col gap-2">
              {chain?.network !== NETWORK.SKALE ? (
                <Prelay>Not supported by the network.</Prelay>
              ) : !pendingTrxIds ? (
                <Prelay>...</Prelay>
              ) : pendingTrxIds.isError ? (
                <Prelay>Failed to retrieve queue</Prelay>
              ) : pendingTrxIds.data ? (
                pendingTrxIds.data.map((id, i) => (
                  <WidgetMultisigTx
                    key={id}
                    id={id}
                    reqdConfirmations={countReqdConfirms}
                    events={
                      !events
                        ? []
                        : events.filter(
                            (event) =>
                              event?.args?.['transactionId']?.toNumber() === id,
                          )
                    }
                    onAction={() => {
                      executedTrxIds.refetch();
                      pendingTrxIds.refetch();
                      countsRefetch();
                    }}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </Card>
          <Card
            lean
            heading={`History ( ${executedTrxIds?.data?.length || ''} )`}
            className="h-1/2 !bg-[var(--slate)]"
            bodyClass="scrollbar"
          >
            <div className="flex flex-col gap-2">
              {chain?.network !== NETWORK.SKALE ? (
                <Prelay>Not supported by the network.</Prelay>
              ) : !executedTrxIds ? (
                <Prelay>...</Prelay>
              ) : executedTrxIds.isError ? (
                <Prelay>Failed to retrieve queue</Prelay>
              ) : executedTrxIds.data ? (
                executedTrxIds.data.map((id, i) => (
                  <WidgetMultisigTx
                    key={id}
                    id={id}
                    reqdConfirmations={countReqdConfirms}
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
                <></>
              )}
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
