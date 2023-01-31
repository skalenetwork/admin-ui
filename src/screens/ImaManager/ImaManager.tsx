import Card from '@/components/Card/Card';
import Dialog from '@/components/Dialog/Dialog';
import { chains } from '@/features/network';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNetwork } from 'wagmi';
import { AlertProps } from '../ChainManager/types';
import { NiceAddress } from '../Multisig/NiceAddress';

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
    <div className="min-h-1/2 flex flex-col rounded-lg bg-[var(--gray4)] px-12 py-2 text-[var(--gray12)]">
      <div>
        {id} - {actionText} by {author}
      </div>
      <div className="text-sm text-[var(--slate10)]">
        About {blocksElapsed} blocks ago
      </div>
    </div>
  );
};

const PeerChainItem = ({
  name,
  connectionStatus,
  tokenList = [],
  alertKey,
  toggleAlert,
}: AlertProps & {
  name: string;
  connectionStatus: 'full' | 'origin' | 'target';
  tokenList: [];
}) => {
  const { chain } = useNetwork();
  return (
    <div className="flex justify-between rounded-lg bg-[var(--gray4)] px-6 py-2 text-[var(--gray12)]">
      <div className="flex flex-col justify-between">
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
      <div className="flex flex-row gap-4 text-[var(--blue12)]">
        <div>
          <div>ERC20</div>
          <div>ERC721</div>
          <div>ERC1155</div>
        </div>
        <div className="flex items-center justify-center">
          <Dialog
            title={'ERC-20 Tokens (6)'}
            description={''}
            trigger={
              <button>
                <ChevronRightIcon />
              </button>
            }
            onOpenChange={toggleAlert(`${name}`)}
            steps={[
              {
                onSubmit: (e) => {
                  e.preventDefault();
                },
                actionElement: ({ className }) => (
                  <Link
                    className={`${className}`}
                    to={`maptoken/${name}?standard=erc20`}
                  >
                    Add new ERC-20 token
                  </Link>
                ),
                cancelElement: () => <></>,
                content: (
                  <div>
                    <p>
                      List of mapped ERC-20 tokens with{' '}
                      <span className="font-semibold">{name}</span> chain:
                    </p>
                    <Card
                      className="max-h-36 p-0"
                      bodyClass="p-4 pt-4 bg-[var(--gray2)] rounded-lg flex flex-col gap-2"
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
                      bodyClass="p-4 pt-4 bg-[var(--gray2)] rounded-lg flex flex-col gap-2"
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
            open={alertKey === `${name}`}
            activeStep={1}
          />
        </div>
      </div>
    </div>
  );
};

export default function ImaManager() {
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
    <div className="grid h-full w-full grid-rows-2 rounded-lg bg-[var(--white)]">
      <Card
        full
        heading={
          <div className="flex justify-between">
            <h4 className="font-semibold">Connected chains</h4>
            <button className="btn rounded-full">Connect new chain</button>
          </div>
        }
      >
        <div className="grid grid-flow-col grid-cols-2">
          <Card full heading="" bodyClass="scrollbar flex flex-col gap-3 p-0">
            {['ethereum', ...Object.keys(chains.staging)].map((name) => (
              <PeerChainItem
                name={name}
                connectionStatus="full"
                tokenList={[]}
                alertKey={alertKey}
                toggleAlert={toggleAlert}
              />
            ))}
          </Card>
          <Card full heading="" bodyClass="scrollbar flex flex-col gap-3 p-0">
            {['origin', 'target', 'origin', 'origin'].map((x) => (
              <PeerChainItem
                name="Other"
                connectionStatus={x}
                tokenList={[]}
                alertKey={alertKey}
                toggleAlert={toggleAlert}
              />
            ))}
          </Card>
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
