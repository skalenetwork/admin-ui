import Card from '@/components/Card/Card';

import { useMtm, useConfigController, useFcd } from '@/features/interim/hooks';
import { useCallback, useState, Fragment } from 'react';

import AlertDialog from '@/components/AlertDialog/AlertDialog';

type KeyedAlertToggle = (toKey?: string) => (open: boolean) => void;

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
    <span className="ml-6 text-sm text-[var(--gray6)]">Not Available</span>
  ) : isLoading ? (
    <span className="ml-6 text-sm text-[var(--yellow6)]">Pending Change</span>
  ) : isEnabled ? (
    <span className="ml-6 text-sm text-[var(--green6)]">Enabled</span>
  ) : (
    <span className="ml-6 text-sm text-[var(--red6)]">Disabled</span>
  );
};

export const WidgetConfigFcd = ({
  id,
  alertKey,
  toggleAlert,
}: {
  id: string;
  alertKey: string;
  toggleAlert: KeyedAlertToggle;
}) => {
  const { connected } = useConfigController();
  const { toggle, isEnabled, isSuccess, isLoading } = useMtm();
  return (
    <Card
      full
      heading={
        <>
          Free Contract Deployment{' '}
          <FlagStatus
            connected={connected}
            isEnabled={isEnabled}
            isLoading={isLoading}
          />
        </>
      }
    >
      <div className="flex h-full flex-col justify-around">
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

export const WidgetConfigMtm = ({
  id,
  alertKey,
  toggleAlert,
}: {
  id: string;
  alertKey: string;
  toggleAlert: KeyedAlertToggle;
}) => {
  const { connected, flags } = useConfigController();
  const { toggle, isEnabled, isSuccess, isLoading } = useFcd();
  return (
    <Card
      full
      heading={
        <>
          Multi-transaction mode{' '}
          <FlagStatus
            connected={connected}
            isEnabled={isEnabled}
            isLoading={isLoading}
          />
        </>
      }
    >
      <div className="flex h-full flex-col justify-around">
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
        <div data-id="contract_deploy" data-s="1">
          <WidgetConfigFcd
            id="contract_deploy"
            alertKey={alertKey}
            toggleAlert={toggleAlert}
          />
        </div>
        <div data-id="mtm_toggle" data-s="1">
          <WidgetConfigMtm
            id="mtm_toggle"
            alertKey={alertKey}
            toggleAlert={toggleAlert}
          />
        </div>
        <div data-id="fs_reserve_space" data-s="1"></div>
        <div data-id="chainlist_pr" data-s="1"></div>
        <div data-id="chain_metadata" data-s="1"></div>
      </div>
    </>
  );
}
