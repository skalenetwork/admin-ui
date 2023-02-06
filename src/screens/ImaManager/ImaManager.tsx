import Card from '@/components/Card/Card';
import Dialog from '@/components/Dialog/Dialog';
import { NiceAddress } from '@/elements/NiceAddress';
import { chains } from '@/features/network';
import { TOKEN_STANDARD } from '@/features/network/manifest';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { tw } from 'twind';
import { useNetwork } from 'wagmi';
import { AlertProps } from '../types';

type ConnectionStatus = 'full' | 'origin' | 'target';

const TransactionItem = ({
  id,
  actionText,
  author,
  blocksElapsed,
}: {
  id: string;
  actionText: string;
  author: string;
  blocksElapsed?: number;
}) => {
  return (
    <div
      className="min-h-1/2 flex flex-col rounded-lg bg-[var(--slate)] 
    px-12 py-2 text-[var(--gray12)]"
    >
      <div>
        {id} - {actionText} by {author}
      </div>
      <div className="text-sm text-[var(--gray10)]">
        About {blocksElapsed} blocks ago
      </div>
    </div>
  );
};

const standards = Object.values(TOKEN_STANDARD);

const SelectedPeerChainItem = ({
  name,
  connectionStatus,
  alertKey,
  toggleAlert,
  className = '',
}: AlertProps & {
  className: string;
  name: string;
  connectionStatus: ConnectionStatus;
}) => {
  const { chain } = useNetwork();

  // mocking subdata of useChainConnections
  const supported = [
    TOKEN_STANDARD.ERC20.name,
    TOKEN_STANDARD.ETH.name,
  ] as const;

  const [standardName, setStandardName] = useState('');

  const selectedStandard = useMemo(() => {
    return standards.find((s) => s.name === standardName);
  }, [standardName]);
  useEffect(() => {
    if (alertKey !== name) {
      window.setTimeout(() => setStandardName(''), 500);
    }
  }, [alertKey]);

  return (
    <motion.div
      className={className}
      key={name}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
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
                  {supported.map((name) => (
                    <a
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
                      to={`maptoken/${name}?standard=${selectedStandard?.name}`}
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
                        <NiceAddress
                          address="0xad0e07a58BcA9678d654903d0b1b43dD08fc21c1"
                          copyable
                        />
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
                        <NiceAddress
                          address="0xad0e07a58BcA9678d654903d0b1b43dD08fc21c1"
                          copyable
                        />
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
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--slate10)]">
          {connectionStatus === 'full'
            ? 'Connected'
            : connectionStatus === 'origin'
            ? 'Partially connected'
            : connectionStatus === 'target'
            ? 'Request for connection'
            : 'Not connected'}
        </span>
        <svg
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
        </svg>
      </div>
    </div>
  </div>
);

const PeerChainItem = ({
  name,
  connectionStatus,
  tokenList = [],
  selected = false,
  onSelect,
}: {
  name: string;
  connectionStatus: 'full' | 'origin' | 'target';
  tokenList: [];
  selected?: boolean;
  onSelect?: () => void;
}) => {
  return (
    <button
      onClick={() => onSelect?.()}
      className={tw`group flex justify-between
      rounded-lg bg-[var(--slate)] px-6 py-2 text-left text-[var(--blue12)]
      transition-all
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
          <p>ERC20</p>
          <p>ERC721</p>
          <p>ERC1155</p>
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
  const [selectedChain, setSelectedChain] = useState(
    Object.values(chains.staging)[0].name,
  );

  const toggleAlert = useCallback(
    (toKey: string = '') => {
      return (open: boolean) => {
        setAlertKey(open ? toKey : '');
      };
    },
    [alertKey],
  );

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
            {['ethereum', ...Object.keys(chains.staging)].map((name) => (
              <PeerChainItem
                name={name}
                connectionStatus={name === 'ethereum' ? 'target' : 'full'}
                tokenList={[]}
                selected={selectedChain === name}
                onSelect={() => setSelectedChain(name)}
              />
            ))}
          </div>
          <div>
            <SelectedPeerChainItem
              className={`flex h-full w-full flex-col rounded-lg bg-[var(--slate1)] px-6
                py-2 text-[var(--gray12)]
                ${
                  (selectedChain === 'ethereum' ? 'target' : 'full') ===
                  'target'
                    ? 'bg-[var(--color-highlighted)]'
                    : 'bg-[var(--slate)]'
                }`}
              name={selectedChain}
              connectionStatus={
                selectedChain === 'ethereum' ? 'target' : 'full'
              }
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
        {[1, 2, 3, 5, 6, 7, 8].map((x) => (
          <TransactionItem
            id={x}
            actionText="Add ERC-20 Token"
            author="owner"
            blocksElapsed={20}
          />
        ))}
      </Card>
      {/* <div data-id="main"></div>
      <div data-id="collapse"></div> */}
    </div>
  );
}
