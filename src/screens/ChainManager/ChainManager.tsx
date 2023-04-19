import Card from '@/components/Card/Card';

import { useConfigController, useFcd, useMtm } from '@/features/interim/hooks';
import { useCallback, useEffect, useState } from 'react';

import AlertDialog from '@/components/AlertDialog/AlertDialog';
import FileStorageReserve from './FileStorageReserve';

import Hoverover from '@/components/Hoverover/Hoverover';
import { ManagerIcon } from '@/components/Icons/Icons';
import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';
import { SButton } from '@/elements/SButton/SButton';
import { useChainMetadata } from '@/features/network/hooks';
import { NETWORK } from '@/features/network/literals';
import { useStorageSpace } from '@/features/storage/hooks';
import NotSupported from '@/screens/NotSupported';
import { MinusCircledIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useNetwork } from 'wagmi';
import type { WidgetWithAlertProps } from '../types';

/**
 * Show a formatted, colored label reflecting typical states
 * define custom true and false labels with tuples, ex: [true, 'Ready']
 * @param param0
 * @returns
 */
const FormattedStatus = ({
  status,
}: {
  status:
    | 'loading'
    | 'disabled'
    | 'no-auth'
    | 'pending'
    | 'executing'
    | [boolean, string, undefined | number];
}) => {
  return status === 'loading' ? (
    <span className="ml-6 text-sm text-[var(--gray11)]">
      <MinusCircledIcon className="animate-spin" />
    </span>
  ) : status === 'disabled' || status === 'no-auth' ? (
    <span className="ml-6 text-sm text-[var(--gray8)]">Not Supported</span>
  ) : status === 'pending' ? (
    <span className="ml-6 text-sm text-[var(--yellow10)]">Pending Change</span>
  ) : status === 'executing' ? (
    <span className="ml-6 text-sm text-[var(--yellow10)]">
      Executing Change
    </span>
  ) : status[0] === true ? (
    <div className="ml-6 text-sm text-[var(--green10)] inline-block">
      {status[1] || 'Disabled'}{' '}
      {status[2] === 1 && (
        <span className="align-top inline-block mx-1 w-2 h-2 bg-[var(--yellow11)] opacity-75 rounded-md"></span>
      )}
    </div>
  ) : status[0] === false ? (
    <div className="ml-6 text-sm text-[var(--red10)] inline-block">
      {status[1] || 'Enabled'}{' '}
      {status[2] === 1 && (
        <span className="align-top inline-block mx-1 w-2 h-2 bg-[var(--yellow11)] opacity-75 rounded-md"></span>
      )}
    </div>
  ) : (
    <></>
  );
};

/**
 * Configure free contract deployment and view status
 * @param param0
 * @returns
 */
export const WidgetConfigFcd = ({
  id,
  alertKey,
  toggleAlert,
}: WidgetWithAlertProps) => {
  const { connected } = useConfigController();
  const fcd = useFcd();
  const status = !connected
    ? 'disabled'
    : fcd.isEnabled === undefined
    ? 'loading'
    : fcd.isLoading
    ? 'pending'
    : ([
        fcd.isEnabled,
        !fcd.isEnabled ? 'Disabled' : 'Enabled',
        fcd.action === 'none' && 1,
      ] as [boolean, string, undefined | number]);

  return (
    <Card
      full
      heading={
        <>
          <h4 className="inline">Free Contract Deployment</h4>{' '}
          <FormattedStatus status={status} />
        </>
      }
      tooltip={'Free contract deployment'}
    >
      <div className="flex h-full flex-col justify-between">
        <p className="text-[var(--gray9)] text-sm">
          Authorization to deploy contracts on the chain is removed.
          <br />
          Anybody can deploy contracts on the chain!
        </p>
        <center>
          <AlertDialog
            open={alertKey === id}
            onOpenChange={toggleAlert(id)}
            trigger={
              <SButton className="btn btn-wide w-5/6" writer={fcd}>
                {fcd.isEnabled ? 'Disable' : 'Enable'} FCD
              </SButton>
            }
            actionElement={({ className, onClick }) => (
              <SButton
                className={className}
                writer={fcd}
                onClick={onClick}
                toast={{
                  pending: 'Toggling FCD',
                  success: 'FCD status changed',
                  error: 'Failed to change FCD ',
                }}
                onToast={(promise) => {
                  promise.then((data) => {
                    fcd.refetch();
                  });
                }}
              >
                Yes
              </SButton>
            )}
            title={`${
              fcd.isEnabled ? 'Disable' : 'Enable'
            } Free Contract Deployment?`}
            description="Please confirm this action"
            onAction={async () => {
              return {
                status: 'success',
              };
            }}
          />
        </center>
      </div>
    </Card>
  );
};

/**
 * Configure multi-transaction mode and view status
 * @returns
 */
export const WidgetConfigMtm = ({
  id,
  alertKey,
  toggleAlert,
}: WidgetWithAlertProps) => {
  const { connected, flags } = useConfigController();
  const mtm = useMtm();
  const status = !connected
    ? 'disabled'
    : mtm.isEnabled === undefined
    ? 'loading'
    : mtm.isLoading
    ? 'pending'
    : ([
        mtm.isEnabled,
        !mtm.isEnabled ? 'Disabled' : 'Enabled',
        mtm.action === 'none' && 1,
      ] as [boolean, string, undefined | number]);
  return (
    <Card
      full
      heading={
        <>
          <h4 className="inline">Multi-transaction mode</h4>{' '}
          <FormattedStatus status={status} />
        </>
      }
      tooltip={'MTM'}
    >
      <div className="flex h-full flex-col justify-between">
        <p className="text-[var(--gray9)] text-sm">
          Allows accounts to send multiple transactions with incremental nonces
          per block
        </p>
        {
          <center>
            <AlertDialog
              open={alertKey === id}
              onOpenChange={toggleAlert(id)}
              trigger={
                <SButton className="btn btn-wide w-5/6" writer={mtm}>
                  {mtm.isEnabled ? 'Disable' : 'Enable'} MTM
                </SButton>
              }
              actionElement={({ className, onClick }) => (
                <SButton
                  className={className}
                  onClick={onClick}
                  writer={mtm}
                  toast={{
                    pending: 'Toggling MTM',
                    success: 'MTM status changed',
                    error: 'Failed to change MTM',
                  }}
                  onToast={(promise) => {
                    promise.then((data) => {
                      mtm.refetch();
                    });
                  }}
                >
                  Yes
                </SButton>
              )}
              title={`${
                mtm.isEnabled ? 'Disable' : 'Enable'
              } Multi-transaction mode?`}
              description="Please confirm this action"
              onAction={async () => {
                return {
                  status: 'success',
                };
              }}
            />
          </center>
        }
      </div>
    </Card>
  );
};

const chainListsDirectory =
  'https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/chains';

/**
 * View status and manage chainlists registration / PRs
 * @returns
 */
export const WidgetManageChainlist = () => {
  const { chain } = useNetwork();
  const { data, isSuccess, isError, isLoading, refetch } = useQuery({
    queryKey: [chain?.id],
    queryFn: () =>
      fetch(`${chainListsDirectory}/eip155-${chain?.id}.json`).then((res) =>
        res.json(),
      ),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    chain && refetch();
  }, [chain?.id]);

  const status = isLoading
    ? 'loading'
    : ([isSuccess, isError ? 'Not Registered' : 'Registered'] as [
        boolean,
        string,
      ]);

  return (
    <Card
      full
      heading={
        <>
          <h4 className="inline">Chainlist.wtf</h4>{' '}
          <FormattedStatus status={status} />
        </>
      }
    >
      <div className="flex h-full flex-col justify-between">
        <p className="text-[var(--gray9)] text-sm">
          Chainlist.wtf provides users appropriate Chain ID and Network ID to
          connect to their wallets and Web3 middleware providers.
        </p>
        <center>
          <a
            className="btn w-5/6"
            target="blank"
            href="https://github.com/ethereum-lists/chains/pulls"
          >
            Submit PR
          </a>
        </center>
      </div>
    </Card>
  );
};

/**
 * View status and manage skalenetwork registration / PRs
 * @returns
 * @todo complete status implementation, requires chain hyphenated label discovery
 */
export const WidgetManageMetadata = () => {
  const { chain } = useNetwork();
  const chainMetadata = useChainMetadata({
    networkType: chain && (chain.testnet ? 'staging' : 'mainnet'),
  });

  const status =
    chainMetadata.data === null
      ? [false, 'Not Submitted']
      : [true, 'Submitted'];

  const actionText = chainMetadata.data === null ? 'Submit PR' : 'Update';

  return (
    <Card
      full
      heading={
        <>
          <h4 className="inline">Submit Chain Metadata</h4>{' '}
          <FormattedStatus status={status} />
        </>
      }
      tooltip={
        <p>
          Open PR @{' '}
          <a
            target="_blank"
            href="https://docs.skale.network/develop/submit-metadata"
          >
            https://docs.skale.network/develop/submit-metadata
          </a>
        </p>
      }
    >
      <div className="flex h-full flex-col justify-between">
        <p className="text-[var(--gray9)] text-sm">
          Submit metadata to display in the SKALE network UI
        </p>
        <center>
          <Hoverover
            title="Chain Metadata"
            trigger={<>View & {actionText}</>}
            triggerClass="btn w-5/6"
          >
            <div className="w-[320px]">
              <pre className="p-4 my-4 font-mono w-full overflow-auto text-left">
                {chainMetadata.data
                  ? JSON.stringify(chainMetadata.data, undefined, 2)
                  : '// none found \n{}'}
              </pre>
              <a
                className="btn btn-outline"
                target="blank"
                href="https://github.com/skalenetwork/skale-network/compare"
              >
                {actionText}
              </a>
            </div>
          </Hoverover>
        </center>
      </div>
    </Card>
  );
};

export function ChainManager() {
  const [alertKey, setAlertKey] = useState('');

  const toggleAlert = useCallback(
    (toKey: string = '') => {
      return (open: boolean) => {
        setAlertKey(open ? toKey : '');
      };
    },
    [alertKey],
  );

  const {} = useStorageSpace();

  const { chain } = useNetwork();

  return (
    <>
      <div className="relative grid spaced h-full w-full grid-cols-2 grid-rows-3">
        {chain?.network !== NETWORK.SKALE ? (
          <NotSupported theme="blur">
            <ManagerIcon className="mr-4" />
            &emsp;
            <strong>Chain Manager</strong> allows miscellaneous control
            operations on an SChain.
          </NotSupported>
        ) : (
          <></>
        )}
        <div data-id="contract_deploy" data-s="2">
          <WidgetConfigFcd
            id="contract_deploy"
            alertKey={alertKey}
            toggleAlert={toggleAlert}
          />
        </div>
        <div data-id="mtm_toggle" data-s="2">
          <WidgetConfigMtm
            id="mtm_toggle"
            alertKey={alertKey}
            toggleAlert={toggleAlert}
          />
        </div>
        <div data-id="fs_reserve_space" data-s="2">
          <FileStorageReserve
            id="fs_reserve_space"
            alertKey={alertKey}
            toggleAlert={toggleAlert}
          />
        </div>
        <div data-id="chainlist_pr" data-s="2">
          <WidgetManageChainlist />
        </div>
        <div data-id="chain_metadata" data-s="2">
          <WidgetManageMetadata />
        </div>
        <div data-id="to_autodeploy" data-s="2">
          <Card full heading="Set Auto Deployment in IMA">
            <div className="flex h-full flex-col justify-between">
              <p className="text-[var(--gray9)] text-sm">
                SKALE Chain automatic deployment manager
              </p>
              <center>
                <Link
                  to="/ima_manager/autodeployer"
                  className="btn btn-wide w-5/6"
                >
                  Manage Configurations
                </Link>
              </center>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default withErrorBoundary(ChainManager);
