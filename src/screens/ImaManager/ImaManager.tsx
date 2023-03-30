import Card from '@/components/Card/Card';
import Dialog from '@/components/Dialog/Dialog';
import { BridgeIcon } from '@/components/Icons/Icons';
import { NiceAddress } from '@/elements/NiceAddress';
import { useChainConnect, useHistory } from '@/features/bridge';
import { useSContractApi, useSContractRead } from '@/features/network/hooks';
import { NETWORK, TOKEN_STANDARD } from '@/features/network/literals';
import NotSupported from '@/screens/NotSupported';
import Prelay from '@/screens/Prelay';
import { FunnelIcon } from '@heroicons/react/24/outline';
import {
  ArrowRightIcon,
  CaretLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { motion } from 'framer-motion';
import humanizeDuration from 'humanize-duration';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tw } from 'twind';
import { Address, useNetwork } from 'wagmi';
import { AlertProps } from '../types';
import { FormattedPeerChain } from './FormattedPeerChain';

const supported = [
  TOKEN_STANDARD.ERC20,
  TOKEN_STANDARD.ERC721,
  TOKEN_STANDARD.ERC1155,
] as const;

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
  const { status: connectionStatus, connect } = useChainConnect({
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
  const standardString = selectedStandard?.name.toUpperCase();
  const contractId =
    selectedOriginChain && selectedStandard?.name
      ? (`${contractPrefix}_${selectedStandard?.name.toUpperCase()}` as const)
      : undefined;

  useEffect(() => {
    if (alertKey !== name) {
      window.setTimeout(() => setStandardName(''), 500);
    }
  }, [alertKey]);

  const tokenManager = useSContractApi({
    id: contractId as 'TOKEN_MANAGER_ERC20',
  });
  const originTokenManager = useSContractApi({
    enabled: !!selectedOriginChain,
    id: contractId as 'TOKEN_MANAGER_ERC20',
    chainId: selectedOriginChain?.id,
  });

  // pending ima-js release
  const mappingsFromOrigin = useQuery({
    enabled: !!(tokenManager?.api && chain && selectedOriginChain),
    queryKey: [
      'custom',
      chain?.id,
      'getTokenMappings',
      selectedOriginChain?.name,
    ],
    queryFn: async () => {
      const { api } = tokenManager;
      const length = await api?.getTokenMappingsLength(
        selectedOriginChain.name,
      );
      console.log('mappings', length);
      const mapping = await api?.getTokenMappings(
        selectedOriginChain.name,
        BigNumber.from(0),
        length,
      );
      return (
        mapping?.map((address) => ({
          address,
        })) || undefined
      );
    },
  });

  const mappingsFromTarget = useQuery({
    enabled: !!(selectedOriginChain && originTokenManager?.api && chain),
    queryKey: [
      'custom',
      selectedOriginChain?.id,
      'getTokenMappings',
      chain?.name,
    ],
    queryFn: async () => {
      const { api } = originTokenManager;
      const length = await api?.getTokenMappingsLength(chain?.name);
      console.log('mappings', length);
      const mapping = await api?.getTokenMappings(
        chain?.name,
        BigNumber.from(0),
        length,
      );
      return (
        mapping?.map((address) => ({
          address,
        })) || undefined
      );
    },
  });

  console.log(
    'mappings length',
    originTokenManager,
    mappingsFromOrigin.data,
    tokenManager,
    mappingsFromTarget.data,
  );

  // alternate for ethereum mapping
  const ethereumMappingLength = useSContractRead(
    contractId as 'DEPOSIT_BOX_ERC20',
    {
      enabled:
        false &&
        !!(
          chain &&
          contractId &&
          selectedOriginChain?.network === NETWORK.ETHEREUM &&
          selectedStandard
        ),
      name: `getSchainToAll${selectedStandard?.name.toUpperCase()}Length`,
      args: [chain?.name],
      chainId: selectedOriginChain?.id,
    },
  );
  const ethereumMappings = useSContractRead(contractId as 'DEPOSIT_BOX_ERC20', {
    enabled: false && !!(ethereumMappingLength.data?.gt(0) && selectedStandard),
    name: `getSchainToAll${selectedStandard?.name.toUpperCase()}`,
    args: [chain?.name, BigNumber.from(0), ethereumMappingLength.data],
    chainId: selectedOriginChain?.id,
  });

  const targetTokenMappings: { name?: string; address: Address }[] =
    selectedOriginChain?.network === NETWORK.ETHEREUM
      ? (ethereumMappings.data || []).map((addr) => {
          address: addr;
        })
      : mappingsFromTarget.data || [];

  const originTokenMappings: { name?: string; address: Address }[] = [];

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
            {connectionStatus === 'target' ? (
              <button
                onClick={() => {
                  connect?.writeAsync &&
                    toast.promise(connect.writeAsync(), {
                      pending: `Accepting request from ${name}`,
                      success: `Request accepted from ${name}`,
                      error: `Failed to accept request from ${name}`,
                    });
                }}
                className="btn btn-outline m-auto w-2/3 rounded-full"
                disabled={!connect.writeAsync}
              >
                Accept request
              </button>
            ) : (
              <>
                <span className="font-medium">Mapped Tokens: </span>
                <Dialog
                  title={`${selectedStandard?.label} Tokens`}
                  description={''}
                  trigger={
                    <button className="">
                      {supported.map(({ name }) => (
                        <a
                          key={name}
                          className="px-2"
                          onClick={(e) => {
                            setStandardName(name);
                          }}
                        >
                          <span className="text-[var(--blue10)]">
                            {standards.find((s) => s.name === name)?.label}
                          </span>{' '}
                          <span className="text-[var(--green10)]">()</span>
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
                      actionElement: ({ className }) => (
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
                              {!targetTokenMappings.length
                                ? 'No mappings discovered'
                                : targetTokenMappings.map((token) => (
                                    <NiceAddress
                                      address={token.address}
                                      copyable
                                    />
                                  ))}
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
                            {!originTokenMappings.length
                              ? 'No mappings discovered'
                              : originTokenMappings.map((token) => (
                                  <NiceAddress
                                    address={token.address}
                                    copyable
                                  />
                                ))}
                          </Card>
                        </div>
                      ),
                    },
                  ]}
                />
              </>
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

export default function ImaManager() {
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
            <Link to="connect" className="btn btn-wide rounded-full text-sm">
              Connect new chain
            </Link>
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
