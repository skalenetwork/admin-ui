import NotSupported from '@/app/screens/NotSupported';
import Prelay from '@/app/screens/Prelay';
import { FunnelIcon } from '@heroicons/react/24/outline';
import {
  ArrowRightIcon,
  CaretLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  MinusCircledIcon,
} from '@radix-ui/react-icons';
import {
  useChainConnect,
  useHistory,
  useTokenMappings,
} from '@skalenetwork/feat/bridge';
import { getSContractProp } from '@skalenetwork/feat/network/contract';
import {
  useRoleAccess,
  useSContractRead,
  useSContractWrite,
} from '@skalenetwork/feat/network/hooks';
import { NETWORK, TOKEN_STANDARD } from '@skalenetwork/feat/network/literals';
import Card from '@skalenetwork/ux/components/Card/Card';
import Dialog from '@skalenetwork/ux/components/Dialog/Dialog';
import { BridgeIcon } from '@skalenetwork/ux/components/Icons/Icons';
import { withErrorBoundary } from '@skalenetwork/ux/elements/ErrorBoundary/ErrorBoundary';
import { NiceAddress } from '@skalenetwork/ux/elements/NiceAddress/NiceAddress';
import { SButton } from '@skalenetwork/ux/elements/SButton/SButton';
import { BigNumber } from 'ethers';
import { motion } from 'framer-motion';
import humanizeDuration from 'humanize-duration';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { tw } from 'twind';
import { useNetwork } from 'wagmi';
import { AlertProps } from '../types';
import { FormattedPeerChain } from './FormattedPeerChain';

const supported = [
  TOKEN_STANDARD.ERC20,
  TOKEN_STANDARD.ERC721_WITH_METADATA,
  TOKEN_STANDARD.ERC1155,
] as const;

type UppercaseStandard = Uppercase<typeof supported[number]['name']>;

const TransactionItem = ({
  id,
  actionText,
  author,
  timestamp,
}: {
  id?: string;
  actionText: string;
  author?: string;
  timestamp?: number;
}) => {
  const elapsed = humanizeDuration(
    (Number(timestamp) - Math.floor(new Date().getTime() / 1000)) * 1000,
    { largest: 1 },
  );
  return (
    <div
      className="min-h-1/2 flex flex-col rounded-lg bg-[var(--slate)] 
    px-12 py-2 text-[var(--gray12)]"
    >
      <div>
        {id ? id + ' - ' : ''}
        {actionText} {author ? 'by ' + { author } : ''}
      </div>
      <div className="text-sm text-[var(--gray10)]">About {elapsed} ago</div>
    </div>
  );
};

const standards = Object.values(TOKEN_STANDARD);

const SelectedPeerChainItem = ({
  name = '',
  alertKey,
  toggleAlert,
  className = '',
}: AlertProps & {
  className: string;
  name: string;
}) => {
  const { chain, chains } = useNetwork();
  const {
    status: connectionStatus,
    connect,
    refetchConnection,
  } = useChainConnect({
    chainName: name,
  });

  const [standardName, setStandardName] = useState('');

  const selectedStandard = useMemo(() => {
    return standards.find((s) => s.name === standardName);
  }, [standardName]);

  const selectedOriginChain = chains.find((c) => c.name === name);

  const contractPrefix =
    selectedOriginChain?.network === NETWORK.SKALE
      ? 'TOKEN_MANAGER'
      : 'DEPOSIT_BOX';
  const standardString =
    selectedStandard?.name.toUpperCase() as UppercaseStandard;
  const contractId =
    selectedOriginChain && selectedStandard?.name
      ? (`${contractPrefix}_${selectedStandard?.name.toUpperCase()}` as const)
      : undefined;

  useEffect(() => {
    if (alertKey !== name) {
      window.setTimeout(() => setStandardName(''), 500);
    }
  }, [alertKey]);

  const mappingsFromOrigin = useTokenMappings({
    contractId,
    toChainId: chain?.id,
    fromChainName: selectedOriginChain?.name,
  });

  const mappingsFromTarget = useTokenMappings({
    contractId,
    toChainId: selectedOriginChain?.id,
    fromChainName: chain?.name,
  });

  // alternate for ethereum mapping, remove false enabled flag
  // then update following variables

  const ethereumMappingLength = useSContractRead(
    contractId as `DEPOSIT_BOX_${typeof standardString}`,
    {
      enabled:
        false &&
        !!(
          chain &&
          contractId &&
          selectedOriginChain?.network === NETWORK.ETHEREUM &&
          selectedStandard
        ),
      name: `getSchainToAll${standardString}Length`,
      args: [chain?.name],
      chainId: selectedOriginChain?.id,
    },
  );
  const ethereumMappings = useSContractRead(
    contractId as `DEPOSIT_BOX_${typeof standardString}`,
    {
      enabled:
        false && !!(ethereumMappingLength.data?.gt(0) && selectedStandard),
      name: `getSchainToAll${standardString}`,
      args: [chain?.name, BigNumber.from(0), ethereumMappingLength.data],
      chainId: selectedOriginChain?.id,
      select: (data) => {
        return (data || []).map((addr) => {
          address: addr;
        });
      },
    },
  );

  const targetTokenMappings = mappingsFromTarget;
  const originTokenMappings = mappingsFromOrigin;

  const accessRegistrarRole = useRoleAccess(
    'TOKEN_MANAGER_LINKER',
    'REGISTRAR_ROLE',
  );

  const tmLinkerAddress = getSContractProp('TOKEN_MANAGER_LINKER', 'address');
  const chainConnectorRoleHash = useSContractRead('MESSAGE_PROXY_SCHAIN', {
    name: 'CHAIN_CONNECTOR_ROLE',
  });
  const hasChainConnectorRole = useSContractRead('MESSAGE_PROXY_SCHAIN', {
    enabled: tmLinkerAddress && chainConnectorRoleHash.data,
    name: 'hasRole',
    args: [chainConnectorRoleHash.data, tmLinkerAddress],
  });

  return (
    <motion.div
      className={tw(
        className,
        !name
          ? '!bg-[var(--slate)]'
          : connectionStatus === 'target'
          ? '!bg-[var(--color-highlighted)]'
          : '',
      )}
      key={name}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      {!name ? (
        <>
          <div className="flex flex-grow items-center justify-center text-[var(--gray10)] text-sm">
            <CaretLeftIcon className="h-5" /> Select a peer chain to view
            details and map tokens
          </div>
        </>
      ) : (
        <>
          <FormattedPeerChain name={name} connectionStatus={connectionStatus} />
          <div className="flex flex-grow items-center">
            {accessRegistrarRole.isLoading ||
            hasChainConnectorRole.isLoading ? (
              <>. . .</>
            ) : connectionStatus === 'target' ? (
              !(
                accessRegistrarRole.data.allow.eoa ||
                accessRegistrarRole.data.allow.mnm
              ) ? (
                <></>
              ) : !hasChainConnectorRole.data ? (
                <small>
                  <ExclamationTriangleIcon /> To accept, assign{' '}
                  <code>MessageProxyForSchain.CHAIN_CONNECTOR_ROLE</code> to{' '}
                  <code>TokenManagerLinker</code>
                </small>
              ) : (
                <SButton
                  writer={connect}
                  toast={{
                    pending: `Accepting request from ${name}`,
                    success: `Request accepted from ${name}`,
                    error: `Failed to accept request from ${name}`,
                  }}
                  onPromise={(promise) => {
                    promise.then((res) => {
                      refetchConnection();
                    });
                  }}
                  className="btn btn-outline m-auto w-2/3 rounded-full"
                >
                  Accept request
                </SButton>
              )
            ) : (
              <div>
                <p className="font-medium py-2">Mapped Tokens </p>
                <Dialog
                  title={`${
                    selectedStandard ? selectedStandard.label : ''
                  } Tokens`}
                  description={''}
                  trigger={
                    <button className="flex gap-6">
                      {supported.map(({ name }) => (
                        <a
                          key={name}
                          onClick={(e) => {
                            setStandardName(name);
                          }}
                        >
                          <span className="text-[var(--blue10)]">
                            {standards.find((s) => s.name === name)?.label}
                          </span>{' '}
                          {/* <span className="text-[var(--green10)]">()</span> */}
                        </a>
                      ))}
                    </button>
                  }
                  open={alertKey === name}
                  onOpenChange={(open) => {
                    toggleAlert(`${name}`)(open);
                  }}
                  activeStep={1}
                  steps={[
                    {
                      onSubmit: (e) => {
                        e.preventDefault();
                      },
                      actionElement: ({ className }) =>
                        accessRegistrarRole.isLoading ? (
                          <>...</>
                        ) : !(
                            accessRegistrarRole.data.allow.eoa ||
                            accessRegistrarRole.data.allow.mnm
                          ) ? (
                          accessRegistrarRole.data.isOwnerOfMultisig ? (
                            <small>
                              <ExclamationTriangleIcon /> To map tokens, assign{' '}
                              <code>REGISTRAR_ROLE</code> on{' '}
                              <code>TokenManagerLinker</code> to{' '}
                              <code>Marionette</code>
                            </small>
                          ) : (
                            <></>
                          )
                        ) : (
                          <Link
                            className={`${className}`}
                            to={`token_map/${name}?t=${chain?.id}&standard=${selectedStandard?.name}`}
                          >
                            Add new {selectedStandard?.label} token
                          </Link>
                        ),
                      cancelElement: () => <></>,
                      content: (
                        <div>
                          <p>
                            List of mapped {selectedStandard?.label} tokens with{' '}
                            <span className="font-semibold">{name}</span> chain:
                          </p>
                          {selectedOriginChain?.network === NETWORK.SKALE && (
                            <Card
                              className="max-h-36 p-0"
                              bodyClass="p-4 pt-4 bg-[var(--slate)] rounded-lg flex flex-col gap-2"
                              heading={
                                <p className="font-medium text-[var(--primary)]">
                                  Mapped from {chain?.name}
                                </p>
                              }
                            >
                              {targetTokenMappings.isLoading ? (
                                <MinusCircledIcon className="text-[var(--gray11)] animate-spin" />
                              ) : !targetTokenMappings.data?.length ? (
                                'No mappings discovered'
                              ) : (
                                targetTokenMappings.data?.map((token) => (
                                  <NiceAddress
                                    key={token.address}
                                    address={token.address}
                                    chainId={selectedOriginChain?.id}
                                    copyable
                                  />
                                ))
                              )}
                            </Card>
                          )}
                          <Card
                            className="max-h-36 p-0"
                            bodyClass="p-4 pt-4 bg-[var(--slate)] rounded-lg flex flex-col gap-2"
                            heading={
                              <p className="font-medium text-[var(--primary)]">
                                Mapped from {selectedOriginChain?.name}
                              </p>
                            }
                          >
                            {originTokenMappings.isLoading ? (
                              <MinusCircledIcon className="text-[var(--gray11)] animate-spin" />
                            ) : !originTokenMappings.data?.length ? (
                              'No mappings discovered'
                            ) : (
                              originTokenMappings.data?.map((token) => (
                                <NiceAddress
                                  key={token.address}
                                  address={token.address}
                                  chainId={chain?.id}
                                  copyable
                                />
                              ))
                            )}
                          </Card>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

const PeerChainItem = ({
  name,
  tokenList = [],
  selected = false,
  onSelect,
}: {
  name: string;
  tokenList: [];
  selected?: boolean;
  onSelect?: () => void;
}) => {
  const { status: connectionStatus, isLoading } = useChainConnect({
    chainName: name,
  });
  return connectionStatus === 'none' ? (
    <></>
  ) : isLoading ? (
    <>
      <button
        className={tw`group flex justify-between
      rounded-lg bg-[var(--slate)] px-6 py-2 text-left text-[var(--blue12)]
      transition-all delay-100 h-1/2 animate-pulse
      `}
      ></button>
    </>
  ) : (
    <button
      onClick={() => onSelect?.()}
      className={tw`group flex justify-between
      rounded-lg bg-[var(--slate)] px-6 py-2 text-left text-[var(--blue12)]
      transition-all delay-100
      ${
        selected
          ? `translate-x-1 cursor-default bg-[var(--slate1)] ${
              connectionStatus === 'target'
                ? 'bg-[var(--color-highlighted)]'
                : ''
            }`
          : 'hover:bg-[var(--slate1)]'
      }
      `}
    >
      <FormattedPeerChain name={name} connectionStatus={connectionStatus} />
      <div className="flex gap-4">
        <div className="text-sm">
          {supported.map(({ label }) => (
            <p key={label}>{label}</p>
          ))}
        </div>
        <div
          className={`flex items-center justify-center transition-all
         ${selected ? 'translate-x-1' : ''}`}
        >
          {selected ? <ArrowRightIcon /> : <ChevronRightIcon />}
        </div>
      </div>
    </button>
  );
};

export function ImaManager() {
  const [alertKey, setAlertKey] = useState('');

  const { chain, chains } = useNetwork();

  const [selectedChain, setSelectedChain] = useState();

  const { events } = useHistory({});

  const toggleAlert = useCallback(
    (toKey: string = '') => {
      return (open: boolean) => {
        setAlertKey(open ? toKey : '');
      };
    },
    [alertKey],
  );

  const accessRegistrarRole = useRoleAccess(
    'TOKEN_MANAGER_LINKER',
    'REGISTRAR_ROLE',
  );
  const tmLinkerAddress = getSContractProp('TOKEN_MANAGER_LINKER', 'address');
  const chainConnectorRoleHash = useSContractRead('MESSAGE_PROXY_SCHAIN', {
    name: 'CHAIN_CONNECTOR_ROLE',
  });
  const hasChainConnectorRole = useSContractRead('MESSAGE_PROXY_SCHAIN', {
    enabled: tmLinkerAddress && chainConnectorRoleHash.data,
    name: 'hasRole',
    args: [chainConnectorRoleHash.data, tmLinkerAddress],
  });

  const grantChainConnectorRole = useSContractWrite('MESSAGE_PROXY_SCHAIN', {
    name: 'grantRole',
    args: [chainConnectorRoleHash.data, tmLinkerAddress],
  });

  // useEffect(() => {
  //   peerSChains?.[0]?.chainName && setSelectedChain(peerSChains[0].chainName);
  // }, [peerSChains?.[0]?.chainName]);

  return (
    <div className="relative grid spaced h-full w-full grid-rows-2 !gap-0 rounded-lg bg-[var(--white)] px-4 py-2">
      {chain?.network !== NETWORK.SKALE ? (
        <NotSupported theme="blur">
          <BridgeIcon className="mr-4" />
          &emsp;
          <strong>IMA Manager</strong> is the entry point for an SChain to
          manage peering with other chains.
          <br />
          <br />
          Only after initating a token mapping, you may be required to switch to{' '}
          {chain ? chain.name : 'another chain'} for authorization
          {chain ? ' on ' + chain.network : ''}.
        </NotSupported>
      ) : (
        <></>
      )}
      <Card
        full
        heading={
          <div className="flex h-max items-center justify-between">
            <h4 className="font-medium">Connected chains</h4>
            {!(
              accessRegistrarRole.data.allow.eoa ||
              accessRegistrarRole.data.allow.mnm
            ) || hasChainConnectorRole.isLoading ? (
              <></>
            ) : !hasChainConnectorRole.data ? (
              <SButton
                className="btn rounded-full"
                writer={grantChainConnectorRole}
                onPromise={(promise) => {
                  promise.then((res) => {
                    hasChainConnectorRole.refetch();
                  });
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
                toast={{
                  pending: `Granting chain connector role to token manager linker`,
                  success: `Granted chain connector role to token manager linker`,
                  error: `Failed to grant chain connector role to token manager linker`,
                }}
              >
                Assign Chain Connector Role
              </SButton>
            ) : (
              <Link to="connect" className="btn btn-wide rounded-full text-sm">
                Connect new chain
              </Link>
            )}
          </div>
        }
      >
        <div className="grid spaced h-full grid-flow-col grid-cols-2">
          <div className="scrollbar flex h-full w-full flex-col gap-3 overflow-auto py-0 pr-4">
            {!chains?.length ? (
              <Prelay>. . .</Prelay>
            ) : chain?.network !== NETWORK.SKALE ? (
              <Prelay>Switch to an SChain to view connected chains</Prelay>
            ) : (
              chains
                .filter(
                  (c) =>
                    c.network === NETWORK.SKALE && c.testnet === chain.testnet,
                )
                .map(({ name }) => (
                  <PeerChainItem
                    key={name}
                    name={name}
                    tokenList={[]}
                    selected={selectedChain === name}
                    onSelect={() => setSelectedChain(name)}
                  />
                ))
            )}
          </div>
          <div>
            <SelectedPeerChainItem
              className={`flex h-full w-full flex-col rounded-lg bg-[var(--slate1)] px-6
                py-2 text-[var(--gray12)]`}
              name={selectedChain}
              alertKey={alertKey}
              toggleAlert={toggleAlert}
            />
          </div>
        </div>
      </Card>
      <Card
        full
        heading="Recent transactions"
        bodyClass="scrollbar flex flex-col gap-3"
      >
        {events && events.length ? (
          events.map((event, index) => (
            <TransactionItem
              key={index}
              actionText={event.label}
              timestamp={event.timestamp}
            />
          ))
        ) : (
          <Prelay>
            <FunnelIcon className="h-5" />
            &emsp;No IMA token actions yet!
          </Prelay>
        )}
      </Card>
      {/* <div data-id="main"></div>
      <div data-id="collapse"></div> */}
    </div>
  );
}

export default withErrorBoundary(ImaManager);
