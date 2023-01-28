import Card from '@/components/Card/Card';

import { useMtm, useConfigController, useFcd } from '@/features/interim/hooks';
import { useCallback, useState, Fragment } from 'react';

import AlertDialog from '@/components/AlertDialog/AlertDialog';
import FileStorageReserve from './FileStorageReserve';

import type { WidgetWithAlertProps } from './types';
import { useQuery } from '@tanstack/react-query';
import { useNetwork } from 'wagmi';
import { useChainMetadata } from '@/features/network/hooks';
import { Link } from 'react-router-dom';

/**
 * Show a formatted, colored label reflecting typical states
 * define custom true and false labels with tuples, ex: [true, 'Ready']
 * @param param0
 * @returns
 */
const FormattedStatus = ({
  status,
}: {
  status: 'disabled' | 'no-auth' | 'pending' | [true, string] | [false, string];
}) => {
  return status === 'disabled' || status === 'no-auth' ? (
    <span className="ml-6 text-sm text-[var(--gray6)]">Not Supported</span>
  ) : status === 'pending' ? (
    <span className="ml-6 text-sm text-[var(--yellow6)]">Pending Change</span>
  ) : status[0] === true ? (
    <span className="ml-6 text-sm text-[var(--green6)]">
      {status[1] || 'Disabled'}
    </span>
  ) : status[0] === false ? (
    <span className="ml-6 text-sm text-[var(--red6)]">
      {status[1] || 'Enabled'}
    </span>
  ) : (
    <></>
  );
};

/**
 * Contract flag status
 * @param param0
 * @returns
 * @deprecated
 */
const FlagStatus = ({
  connected,
  isEnabled,
  isLoading,
}: {
  connected: boolean;
  isEnabled: boolean | undefined;
  isLoading: boolean;
}) => {
  return !connected ? (
    <span className="ml-6 text-sm text-[var(--gray6)]">Not Supported</span>
  ) : isLoading ? (
    <span className="ml-6 text-sm text-[var(--yellow6)]">Pending Change</span>
  ) : isEnabled ? (
    <span className="ml-6 text-sm text-[var(--green6)]">Enabled</span>
  ) : (
    <span className="ml-6 text-sm text-[var(--red6)]">Disabled</span>
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
  const { toggle, isEnabled, isSuccess, isLoading } = useMtm();
  return (
    <Card
      full
      heading={
        <>
          <h4 className="inline">Free Contract Deployment</h4>{' '}
          <FlagStatus
            connected={connected}
            isEnabled={isEnabled}
            isLoading={isLoading}
          />
        </>
      }
      tooltip={'Peep Peeep'}
    >
      <div className="flex h-full flex-col justify-between">
        <p className="text-[var(--slate9)]">
          Authorization to deploy contracts on the chain is removed.
          <br />
          Anybody can deploy contracts on the chain!
        </p>
        {connected && toggle && (
          <center>
            <AlertDialog
              open={alertKey === id}
              onOpenChange={toggleAlert(id)}
              trigger={
                <button className="btn btn-wide w-5/6">
                  {isEnabled ? 'Disable' : 'Enable'} FCD
                </button>
              }
              title={`${
                isEnabled ? 'Disable' : 'Enable'
              } Free Contract Deployment?`}
              description="Please confirm this action"
              onAction={async () => {
                toggle();
                return {
                  status: 'success',
                };
              }}
            />
          </center>
        )}
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
  const { toggle, isEnabled, isSuccess, isLoading } = useFcd();
  return (
    <Card
      full
      heading={
        <>
          <h4 className="inline">Multi-transaction mode</h4>{' '}
          <FlagStatus
            connected={connected}
            isEnabled={isEnabled}
            isLoading={isLoading}
          />
        </>
      }
      tooltip={'Peep Peeep'}
    >
      <div className="flex h-full flex-col justify-between">
        <p className="text-[var(--slate9)]">
          Allows accounts to send multiple transactions with incremental nonces
          per block
        </p>
        {connected && toggle && (
          <center>
            <AlertDialog
              open={alertKey === id}
              onOpenChange={toggleAlert(id)}
              trigger={
                <button className="btn btn-wide w-5/6">
                  {isEnabled ? 'Disable' : 'Enable'} MTM
                </button>
              }
              title={`${
                isEnabled ? 'Disable' : 'Enable'
              } Multi-transaction mode?`}
              description="Please confirm this action"
              onAction={async () => {
                toggle();
                return {
                  status: 'success',
                };
              }}
            />
          </center>
        )}
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
  const { data, isSuccess, isError, isFetching } = useQuery({
    queryKey: [chain?.id],
    queryFn: () =>
      fetch(`${chainListsDirectory}/eip155-${chain?.id}.json`).then((res) =>
        res.json(),
      ),
  });

  const status = isFetching
    ? 'disabled'
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
        <p className="text-[var(--slate9)]">
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
  const status = false;
  const { data } = useChainMetadata({
    networkType: 'staging',
  });
  return (
    <Card
      full
      heading={
        <>
          <h4 className="inline">Submit Chain Metadata</h4>{' '}
          <FormattedStatus status={[status, 'Not Submitted']} />
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
        <p className="text-[var(--slate9)]">
          Submit metadata to display in the SKALE network UI
        </p>
        <center>
          <button className="btn btn-wide w-5/6">View & Submit PR</button>
        </center>
      </div>
    </Card>
  );
};

export default function ChainManager() {
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
    <>
      <div className="grid h-full w-full grid-cols-2 grid-rows-3">
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
        <div data-id="fs_reserve_space" data-s="1">
          <FileStorageReserve
            id="fs_reserve_space"
            alertKey={alertKey}
            toggleAlert={toggleAlert}
          />
        </div>
        <div data-id="chainlist_pr" data-s="2">
          <WidgetManageChainlist />
        </div>
        <div data-id="chain_metadata" data-s="1">
          <WidgetManageMetadata />
        </div>
        <div data-id="to_autodeploy" data-s="1">
          <Card full heading="Set Auto Deploymen in IMA">
            <div className="flex h-full flex-col justify-between">
              <p className="text-[var(--slate9)]">
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
