import { useMultisigContext } from '@/app/screens/Multisig/context';
import {
  CaretRightIcon,
  CheckCircledIcon,
  CircleIcon,
  MinusCircledIcon,
  PlusCircledIcon,
  StackIcon,
} from '@radix-ui/react-icons';
import { useCacheWallet } from '@skalenetwork/feat/multisig/hooks';
import { getAbi } from '@skalenetwork/feat/network/abi/abi';
import { getSContractProp } from '@skalenetwork/feat/network/contract';
import {
  useSContractRead,
  useSContractWrite,
} from '@skalenetwork/feat/network/hooks';
import { build } from '@skalenetwork/feat/network/manifest';
import Card from '@skalenetwork/ux/components/Card/Card';
import { useQuery } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';
import humanizeDuration from 'humanize-duration';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { tw } from 'twind';
import { Address, useAccount, useTransaction } from 'wagmi';

const TxAction = ({
  id,
  toAddress,
  action,
  executed,
  hasConfirmed,
  remainingConfirms,
  onAction,
}: {
  id: number;
  toAddress: string;
  action?: 'execute' | 'confirm' | 'revoke' | null;
  executed: boolean;
  hasConfirmed: boolean;
  remainingConfirms: number;
  onAction?: () => void;
}) => {
  const isFinalSigner =
    action === 'execute' || (action === 'confirm' && remainingConfirms <= 1);

  const actionTx = useSContractWrite('MULTISIG_WALLET', {
    multisigAddress: toAddress,
    enabled: !!action,
    name:
      action === 'revoke'
        ? 'revokeConfirmation'
        : action === 'confirm'
        ? 'confirmTransaction'
        : action === 'execute'
        ? 'executeTransaction'
        : '',
    args: id ? [BigNumber.from(id)] : undefined,
  });

  const pendingNotif = {
    execute: 'Executing',
    revoke: 'Revoking confirmation of',
    confirm: `Confirming ${isFinalSigner ? 'and executing' : ''}`,
  };
  const successNotif = {
    execute: 'is executed',
    revoke: 'has confirmation revoked',
    confirm: `is confirmed ${isFinalSigner ? 'and executed' : ''}`,
  };
  const errorNotif = {
    execute: 'execute',
    revoke: 'revoke confirmation of',
    confirm: `confirm ${isFinalSigner ? 'and execute' : ''}`,
  };

  const handleSubmit = useCallback(async () => {
    if (!(action && actionTx.writeAsync)) return;
    toast.promise(
      async () => {
        await actionTx.writeAsync?.(true);
        onAction?.();
      },
      {
        pending: `${pendingNotif[action] || ''} multisig transaction #${id}`,
        success: `Multisig transaction #${id} ${successNotif[action] || ''}`,
        error: `Failed to ${
          errorNotif[action] || ''
        } multisig transaction #${id}`,
      },
    );
  }, [action, actionTx.writeAsync, isFinalSigner]);

  const actionTooltip = {
    confirm: `Confirm ${isFinalSigner ? '& Execute' : ''}`,
    revoke: 'Revoke Confirmation',
    execute: 'Re-execute',
  };

  return (
    <>
      {action === undefined ? (
        <CircleIcon className="align-middle text-[var(--gray10)] animate-pulse" />
      ) : !(action && actionTx.write) ? (
        <></>
      ) : (
        <button
          className={tw(
            'align-middle hover:scale-110 transition-all',
            actionTx.isLoading ? 'animate-bounce' : '',
          )}
          disabled={!actionTx.write || actionTx.isLoading}
          onClick={handleSubmit}
          title={actionTooltip[action]}
        >
          {isFinalSigner ? (
            <CheckCircledIcon className="align-middle text-[var(--green10)]" />
          ) : action === 'confirm' ? (
            <PlusCircledIcon className="align-middle text-[var(--green10)]" />
          ) : action === 'revoke' ? (
            <MinusCircledIcon className="align-middle text-[var(--red10)]" />
          ) : (
            <></>
          )}
        </button>
      )}
    </>
  );
};

const marionetteAbi = getAbi('MARIONETTE');
const marionetteIface = new ethers.utils.Interface(marionetteAbi);

export const WidgetMultisigTx = React.memo(function TxWidget({
  id,
  events = [],
  reqdConfirmations,
  onAction,
}: {
  id: any;
  events: ethers.Event[];
  reqdConfirmations?: number;
  onAction?: () => void;
}) {
  const { walletAddress } = useMultisigContext();
  const { address } = useAccount();

  const {
    submitEvent,
    isFailed: failed,
    isExecuted: executed,
  } = useMemo(() => {
    if (!(events && events.length)) return {};
    return {
      submitEvent: events.find((e) => e.event === 'Submission'),
      isFailed: events.some((e) => e.event === 'ExecutionFailure'),
      isExecuted: events.some((e) => e.event === 'Execution'),
    };
  }, [events]);

  const ownersThatConfirmed = useSContractRead('MULTISIG_WALLET', {
    enabled: !!id,
    name: 'getConfirmations',
    args: [BigNumber.from(id)] as const,
  });

  const isOwner = useSContractRead('MULTISIG_WALLET', {
    enabled: !!address,
    name: 'isOwner',
    args: [address],
  });

  const countConfirmations = ownersThatConfirmed.data?.length;

  const isConfirmed =
    countConfirmations &&
    reqdConfirmations &&
    countConfirmations >= reqdConfirmations;

  const signerHasConfirmed =
    address &&
    ownersThatConfirmed?.data &&
    ownersThatConfirmed.data.some(
      (addr) => address.toLowerCase() === addr.toLowerCase(),
    );

  // ready up writers

  let action =
    (id && executed) === undefined
      ? undefined
      : executed === true
      ? null
      : signerHasConfirmed === false
      ? 'confirm'
      : isConfirmed === undefined
      ? undefined
      : isConfirmed === true
      ? 'execute'
      : 'revoke';

  // evaluate time elapsed

  const { data: transaction } = useTransaction({
    enabled: !!submitEvent,
    hash: submitEvent?.transactionHash as `0x${string}`,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const { data: block } = useQuery({
    enabled: !!submitEvent,
    queryKey: ['block', submitEvent?.blockNumber],
    queryFn: () => {
      return submitEvent?.getBlock();
    },
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const elapsed = useMemo(() => {
    return block
      ? humanizeDuration(
          (Number(block.timestamp) - Math.floor(new Date().getTime() / 1000)) *
            1000,
          { largest: 1 },
        )
      : 0;
  }, [block]);

  const wallets = useCacheWallet();

  const multisigAbi = getAbi('MULTISIG_WALLET');
  const multisigIface = new ethers.utils.Interface(multisigAbi);
  const txArgs =
    transaction?.data &&
    multisigIface &&
    multisigIface.decodeFunctionData('submitTransaction', transaction.data);
  const toAddress = txArgs?.[0] as Address;
  const toTxData = txArgs?.[2];

  const [
    toContractId,
    toName,
    toMethod,
    toArgs,
    destName,
    destMethod,
    destArgs,
  ] = useMemo(() => {
    const toContractId = toAddress && build.contractIdFromAddress(toAddress);
    const toAbi = toContractId && getAbi(toContractId);
    const toIface = toAbi && new ethers.utils.Interface(toAbi);
    let toParsed;
    try {
      toParsed = toIface && toIface.parseTransaction({ data: toTxData });
    } catch (e) {}

    const toName =
      (toAddress && wallets.value[ethers.utils.getAddress(toAddress)]?.name) ||
      (toContractId
        ? getSContractProp(toContractId, 'name')
        : toAddress && toAddress?.slice(0, 20));
    const toMethod = toParsed
      ? toParsed.functionFragment.name
      : toTxData?.slice(0, 10);
    const toArgs = toParsed ? toParsed.args : [];

    let destName, destMethod, destArgs;
    if (transaction?.data && toContractId === 'MARIONETTE') {
      const destAddress = toParsed?.args[0] as Address;
      const destContractId = build.contractIdFromAddress(destAddress);
      const destAbi = destContractId && getAbi(destContractId);
      const destIface = destAbi && new ethers.utils.Interface(destAbi);
      const destTxData = toParsed && toParsed?.args[2];

      let destParsed;
      try {
        destParsed =
          destIface && destIface.parseTransaction({ data: destTxData });
      } catch (e) {}

      destName = destContractId
        ? getSContractProp(destContractId, 'name')
        : destAddress && destAddress?.slice(0, 20);
      destMethod = destParsed
        ? destParsed.functionFragment.name
        : destTxData?.slice(0, 10);
      destArgs = destParsed ? destParsed.args : [];
    } else {
      destMethod = '-';
    }

    return [
      toContractId,
      toName,
      toMethod,
      toArgs,
      destName,
      destMethod,
      destArgs,
    ];
  }, [toAddress]);

  const name = destName || toName;
  const method = destName ? destMethod : toMethod;
  const methodArgs = destName ? destArgs : toArgs;

  const remainingConfirmations = Math.max(
    0,
    (reqdConfirmations || 0) - (countConfirmations || 0),
  );

  const displayName =
    name &&
    (name.length <= 24
      ? name
      : name?.slice(0, 12) + '..' + name?.slice(name.length - 12));

  return (
    <Card
      lean
      heading={
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <div>
                {id}
                <span className="text-[var(--gray10)]">-</span>{' '}
              </div>
              {displayName && method ? (
                <>
                  {toContractId === 'MARIONETTE' && (
                    <span>
                      <StackIcon />
                    </span>
                  )}
                  <span>{displayName}</span>
                </>
              ) : (
                'Contract Interaction <>'
              )}{' '}
            </div>
            <div>
              {executed === false && isOwner.data && (
                <TxAction
                  id={id}
                  toAddress={walletAddress}
                  action={action}
                  executed={executed}
                  hasConfirmed={signerHasConfirmed}
                  remainingConfirms={remainingConfirmations}
                  onAction={() => {
                    ownersThatConfirmed.refetch();
                    onAction?.();
                  }}
                />
              )}
            </div>
          </div>
          <code
            className={tw(
              'text-xs rounded-sm',
              failed
                ? 'bg-[var(--red2)]'
                : executed
                ? 'bg-[var(--green1)]'
                : 'bg-[var(--yellow2)]',
            )}
            title={methodArgs?.join('\n')}
          >
            <CaretRightIcon /> {method}
          </code>
        </div>
      }
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Confirmations: {countConfirmations}{' '}
            {reqdConfirmations && !executed && `of ${reqdConfirmations}`}{' '}
          </div>
          <div className="text-xs text-[var(--gray10)]">
            {elapsed ? `~ ${elapsed} ago` : '. . .'}
          </div>
        </div>
      </div>
    </Card>
  );
});
