import Card from '@/components/Card/Card';
import Dialog from '@/components/Dialog/Dialog';
import { NiceAddress } from '@/elements/NiceAddress';
import { useChainConnect, useHistory } from '@/features/bridge';
import { TOKEN_STANDARD } from '@/features/network/constants';
import { ConnectionStatus } from '@/features/network/types';
import { ExclamationCircleIcon, FunnelIcon } from '@heroicons/react/24/outline';
import {
  ArrowRightIcon,
  CaretLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import humanizeDuration from 'humanize-duration';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { tw } from 'twind';
import { useNetwork } from 'wagmi';
import { AlertProps } from '../types';

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
    (Number(timestamp) - Math.floor(new Date() / 1000)) * 1000,
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
  const { chain } = useNetwork();
  const { status: connectionStatus } = useChainConnect({
    chainName: name,
  });

  const [standardName, setStandardName] = useState('');

  const selectedStandard = useMemo(() => {
    return standards.find((s) => s.name === standardName);
  }, [standardName]);

  useEffect(() => {
    if (alertKey !== name) {
      window.setTimeout(() => setStandardName(''), 500);
    }
  }, [alertKey]);

  // const contractId =
  //   selectedStandard &&
  //   (`TOKEN_MANAGER_${selectedStandard?.name.toUpperCase()}` as const);

  // const { api } = useContractApi({
  //   id: contractId as 'TOKEN_MANAGER_ERC20',
  // });

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
              <button className="btn btn-outline m-auto w-2/3 rounded-full">
                Accept request
              </button>
            ) : (
              <>
                <span className="font-medium">Mapped Tokens: </span>
                <Dialog
                  title={`${selectedStandard?.label} Tokens ( )`}
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
                          to={`token_map/${name}?standard=${selectedStandard?.name}`}
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
                          <Card
                            className="max-h-36 p-0"
                            bodyClass="p-4 pt-4 bg-[var(--slate)] rounded-lg flex flex-col gap-2"
                            heading={
                              <p className="font-medium text-[var(--primary)]">
                                Origin: {chain?.name}
                              </p>
                            }
                          >
                            <NiceAddress
                              address="0xad0e07a58BcA9678d654903d0b1b43dD08fc21c1"
                              copyable
                            />
                          </Card>
                          <Card
                            className="max-h-36 p-0"
                            bodyClass="p-4 pt-4 bg-[var(--slate)] rounded-lg flex flex-col gap-2"
                            heading={
                              <p className="font-medium text-[var(--primary)]">
                                Target: {name}
                              </p>
                            }
                          >
                            <NiceAddress
                              address="0xad0e07a58BcA9678d654903d0b1b43dD08fc21c1"
                              copyable
                            />
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

const FormattedPeerChain = ({
  name,
  connectionStatus,
}: {
  name: string;
  connectionStatus: ConnectionStatus;
}) => (
  <div className="flex flex-row items-start justify-start gap-2">
    {connectionStatus === 'target' && (
      <div className="h-6 w-6 text-[var(--primary)]">
        <ExclamationCircleIcon />
      </div>
    )}
    <div className="flex flex-col gap-4">
      <h5 className="font-medium">{name}</h5>
      <div className="flex items-center gap-2">
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {connectionStatus === 'origin' || connectionStatus === 'full' ? (
            <path
              d="M6 10C6 11.1046 5.07999 12.0326 4.03621 11.6713C1.68693 10.8579 0 8.62595 0 6C0 3.37405 1.68693 1.14211 4.03621 0.328744C5.07999 -0.0326319 6 0.895431 6 2V10Z"
              fill="var(--green10)"
            />
          ) : (
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 6C0 8.97446 2.16441 11.4434 5.00419 11.9177C5.54892 12.0087 6 11.5523 6 11V11C6 10.4477 5.54533 10.0128 5.01012 9.87657C3.27976 9.43606 2 7.86748 2 6C2 4.13252 3.27976 2.56394 5.01012 2.12343C5.54533 1.98717 6 1.55228 6 1V1C6 0.447715 5.54893 -0.00873472 5.00419 0.0822574C2.16441 0.556609 0 3.02554 0 6Z"
              fill="var(--red10)"
            />
          )}
          {connectionStatus === 'target' || connectionStatus === 'full' ? (
            <path
              d="M8 10C8 11.1046 8.92001 12.0326 9.96379 11.6713C12.3131 10.8579 14 8.62595 14 6C14 3.37405 12.3131 1.14211 9.96379 0.328744C8.92001 -0.0326319 8 0.895431 8 2V10Z"
              fill="var(--green10)"
            />
          ) : (
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 5.92936C14 8.90382 11.8356 11.3727 8.99581 11.8471C8.45108 11.9381 8 11.4816 8 10.9294V10.9294C8 10.3771 8.45467 9.94219 8.98988 9.80593C10.7202 9.36542 12 7.79684 12 5.92936C12 4.06188 10.7202 2.4933 8.98988 2.05279C8.45467 1.91653 8 1.48164 8 0.929359V0.929359C8 0.377074 8.45107 -0.0793755 8.99581 0.0116166C11.8356 0.485968 14 2.9549 14 5.92936Z"
              fill="var(--red10)"
            />
          )}
        </svg>
        <span className="text-sm text-[var(--slate10)]">
          {connectionStatus === 'full'
            ? 'Connected'
            : connectionStatus === 'origin'
            ? 'Partially connected'
            : connectionStatus === 'target'
            ? 'Request for connection'
            : 'Not connected'}
        </span>

        {/* <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 6C0 8.97446 2.16441 11.4434 5.00419 11.9177C5.54892 12.0087 6 11.5523 6 11V11C6 10.4477 5.54533 10.0128 5.01012 9.87657C3.27976 9.43606 2 7.86748 2 6C2 4.13252 3.27976 2.56394 5.01012 2.12343C5.54533 1.98717 6 1.55228 6 1V1C6 0.447715 5.54893 -0.00873472 5.00419 0.0822574C2.16441 0.556609 0 3.02554 0 6Z"
            fill="#299764"
          />
        </svg> */}

        {/* <svg
          width="30"
          height="19"
          viewBox="0 0 30 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.48645 13.2857H13.0894V15H6.48645C4.96874 15 3.51319 14.413 2.44001 13.3682C1.36682 12.3233 0.763916 10.9062 0.763916 9.42857C0.763916 7.95094 1.36682 6.53382 2.44001 5.48898C3.51319 4.44413 4.96874 3.85714 6.48645 3.85714H11.4783L8.75786 1.20857L10.008 0L14.8502 4.71429L10.008 9.42857L8.76666 8.22L11.4783 5.57143H6.48645C4.28548 5.57143 2.5247 7.28571 2.5247 9.42857C2.5247 11.5714 4.28548 13.2857 6.48645 13.2857Z"
            fill={
              connectionStatus === 'full' || connectionStatus === 'origin'
                ? 'var(--green10)'
                : 'var(--red10)'
            }
          />
          <path
            d="M29.9426 9.57143C29.9426 11.0491 29.3397 12.4662 28.2665 13.511C27.1933 14.5559 25.7377 15.1429 24.22 15.1429H19.2282L21.9486 17.7914L20.6985 19L15.8563 14.2857L20.6985 9.57143L21.9398 10.78L19.2282 13.4286H24.22C26.421 13.4286 28.1818 11.7143 28.1818 9.57143C28.1818 7.42857 26.421 5.71429 24.22 5.71429H17.6171V4H24.22C25.7377 4 27.1933 4.58699 28.2665 5.63183C29.3397 6.67668 29.9426 8.09379 29.9426 9.57143Z"
            fill={
              connectionStatus === 'full' || connectionStatus === 'target'
                ? 'var(--green10)'
                : 'var(--red10)'
            }
          />
        </svg> */}
      </div>
    </div>
  </div>
);

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
  const { status: connectionStatus } = useChainConnect({
    chainName: name,
  });
  return connectionStatus === 'none' ? (
    <></>
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

  const { chains } = useNetwork();

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
    <div className="grid spaced h-full w-full grid-rows-2 !gap-0 rounded-lg bg-[var(--white)] px-4 py-2">
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
            {chains.map(({ name }) => (
              <PeerChainItem
                key={name}
                name={name}
                tokenList={[]}
                selected={selectedChain === name}
                onSelect={() => setSelectedChain(name)}
              />
            ))}
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
          <div className="flex justify-center items-center h-full text-[var(--gray10)]">
            <FunnelIcon className="h-5" />
            &emsp;No IMA transactions yet!
          </div>
        )}
      </Card>
      {/* <div data-id="main"></div>
      <div data-id="collapse"></div> */}
    </div>
  );
}
