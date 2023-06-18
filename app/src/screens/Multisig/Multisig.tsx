import { MultisigOwner } from '@/app/screens/Multisig/MultisigOwner';
import NotSupported from '@/app/screens/NotSupported';
import Prelay from '@/app/screens/Prelay';
import { BoltIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useCacheWallet, useMultisig } from '@skalenetwork/feat/multisig/hooks';
import { getAbi } from '@skalenetwork/feat/network/abi/abi';
import { CONTRACT } from '@skalenetwork/feat/network/contract';
import { NETWORK } from '@skalenetwork/feat/network/literals';
import Card from '@skalenetwork/ux/components/Card/Card';
import { PeopleIcon } from '@skalenetwork/ux/components/Icons/Icons';
import Select from '@skalenetwork/ux/components/Select/Select';
import { withErrorBoundary } from '@skalenetwork/ux/elements/ErrorBoundary/ErrorBoundary';
import { NiceAddress } from '@skalenetwork/ux/elements/NiceAddress/NiceAddress';
import { useCallback, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Address, useAccount, useNetwork } from 'wagmi';
import { MultisigContext } from './context';
import { FlowAddNewOwner } from './FlowAddNewOwner';
import { FlowAddNewTransaction } from './FlowAddNewTransaction';
import { FlowAddNewWallet } from './FlowAddNewWallet';
import { WidgetMultisigTx } from './WidgetMultisigTx';

const marionetteExecArgs = getAbi('MARIONETTE')
  .find((f) => f.name === 'execute')
  .inputs.map((i) => i.type);

const fmtnum = Intl.NumberFormat('en-US');
const fmtcurr = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function WalletSelect({
  wallets,
  active,
  onActiveChange,
}: {
  wallets: { address: Address; name: string }[];
  active: Address;
  onActiveChange: (value: Address) => void;
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

export function Multisig() {
  const { value: walletList } = useCacheWallet();

  const [activeWalletAddress, setActiveWalletAddress] = useState<Address>(
    CONTRACT['MULTISIG_WALLET'].address,
  );

  const { chain } = useNetwork();
  const { address } = useAccount();

  const {
    queryKey,
    contract,
    balance,
    owners,
    counts: {
      isError: countsIsError,
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

  const isOwner = owners?.data?.includes(address) as boolean | undefined;

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
    <MultisigContext.Provider
      value={{
        walletAddress: activeWalletAddress,
      }}
    >
      <div
        className="relative grid spaced h-full w-full grid-cols-[7fr_3fr] grid-rows-[50px_auto]"
        style={{ gridTemplateRows: '50px 1fr', gridTemplateColumns: '7fr 3fr' }}
      >
        {chain?.network !== NETWORK.SKALE ? (
          <NotSupported theme="blur">
            <PeopleIcon className="mr-4" />
            &emsp;
            <strong>Multisig Wallets</strong> on SChain allow multi-party
            accounts to perform on-chain actions.
          </NotSupported>
        ) : (
          <></>
        )}
        <div
          data-id="toolbar:wallet_select"
          data-s="2"
          className="col-span-full"
        >
          <div className="flex h-full w-full items-center gap-2">
            <WalletSelect
              wallets={Object.entries(walletList).map(
                ([address, wallet]) => wallet,
              )}
              active={activeWalletAddress}
              onActiveChange={(val) => {
                setActiveWalletAddress(val);
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
            <Card
              full
              heading="Total transactions"
              bodyClass="flex items-center"
            >
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
            data-s="2"
            className="col-span-full row-start-3 row-end-5"
          >
            <Card
              full
              heading={
                <div className="flex w-full justify-between">
                  <h4>Owners</h4>
                  {isOwner && (
                    <FlowAddNewOwner
                      alertKey={alertKey}
                      toggleAlert={toggleAlert}
                      owners={owners?.data || []}
                      onSubmit={(data) => {
                        owners.refetch();
                        setCachedOwners({
                          ...cachedOwners,
                          [data.ownerAddress]: {
                            address: data.ownerAddress,
                            name: data.ownerName,
                          },
                        });
                      }}
                    />
                  )}
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
                <Prelay>
                  <span className="px-2">
                    <ExclamationTriangleIcon />
                  </span>{' '}
                  Couldn't retrieve owners.
                </Prelay>
              ) : owners.data ? (
                owners.data.map((address, i) => (
                  <MultisigOwner
                    key={address}
                    name={(cachedOwners || {})[address]?.name}
                    address={address}
                    showControls={isOwner}
                  />
                ))
              ) : (
                'Loading'
              )}
            </Card>
          </div>
        </div>

        {/* Transaction lists */}

        <div data-id="list_txs" data-s="2" className="row-span-2">
          <Card
            full
            heading={
              <div className="flex w-full justify-between">
                <h4>Transactions</h4>
                {isOwner && (
                  <FlowAddNewTransaction
                    alertKey={alertKey}
                    toggleAlert={toggleAlert}
                    onSubmit={(data) => {
                      executedTrxIds.refetch();
                      pendingTrxIds.refetch();
                      countsRefetch();
                    }}
                  />
                )}
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
              {chain?.network !== NETWORK.SKALE ? (
                <Prelay>Not supported by the network</Prelay>
              ) : pendingTrxIds.isLoading ? (
                <Prelay>...</Prelay>
              ) : pendingTrxIds.isError ? (
                <Prelay className="gap-1">
                  <ExclamationTriangleIcon />
                  Could not retrieve queue
                </Prelay>
              ) : pendingTrxIds.data ? (
                <div className="flex flex-col gap-2">
                  {pendingTrxIds.data.map((id, i) => (
                    <WidgetMultisigTx
                      key={id}
                      id={id}
                      reqdConfirmations={countReqdConfirms}
                      events={
                        !events
                          ? []
                          : events.filter(
                              (event) =>
                                event?.args?.['transactionId']?.toNumber() ===
                                id,
                            )
                      }
                      onAction={() => {
                        executedTrxIds.refetch();
                        pendingTrxIds.refetch();
                        countsRefetch();
                      }}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </Card>
            <Card
              lean
              heading={`History ( ${executedTrxIds?.data?.length || ''} )`}
              className="h-1/2 !bg-[var(--slate)]"
              bodyClass="scrollbar"
            >
              {chain?.network !== NETWORK.SKALE ? (
                <Prelay>Not supported by the network</Prelay>
              ) : executedTrxIds.isLoading ? (
                <Prelay>...</Prelay>
              ) : executedTrxIds.isError ? (
                <Prelay className="gap-1">
                  <ExclamationTriangleIcon />
                  Could not retrieve queue
                </Prelay>
              ) : executedTrxIds.data ? (
                <div className="flex flex-col gap-2">
                  {executedTrxIds.data.map((id, i) => (
                    <WidgetMultisigTx
                      key={id}
                      id={id}
                      reqdConfirmations={countReqdConfirms}
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
                  ))}
                </div>
              ) : (
                <></>
              )}
            </Card>
          </Card>
        </div>
      </div>
    </MultisigContext.Provider>
  );
}

export default withErrorBoundary(Multisig);
