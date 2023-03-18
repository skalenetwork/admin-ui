import Card from '@/components/Card/Card';
import { getSContractProp } from '@/features/network/contract';
import { useSContractRead, useSContractWrite } from '@/features/network/hooks';
import { build } from '@/features/network/manifest';
import {
  CheckCircledIcon,
  CircleIcon,
  MinusCircledIcon,
  PlusCircledIcon,
  StackIcon,
} from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';
import humanizeDuration from 'humanize-duration';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { tw } from 'twind';
import { Address, useTransaction } from 'wagmi';

const TxAction = ({
  id,
  executed,
  confirmTx,
  revokeConfirmTx,
  remainingConfirms,
  onAction,
}: {
  id: number;
  executed: boolean;
  confirmTx: ReturnType<typeof useSContractWrite>;
  revokeConfirmTx: ReturnType<typeof useSContractWrite>;
  remainingConfirms: number;
  onAction?: () => void;
}) => {
  const isFinalSigner = remainingConfirms === 1 && confirmTx?.write;
  const handleSubmit = useCallback(async () => {
    const action = (confirmTx || revokeConfirmTx).writeAsync;
    if (!action) return;
    toast.promise(
      async () => {
        const { wait } = await action();
        await wait();
        onAction?.();
      },
      {
        pending: `Confirming multisig transaction #${id}`,
        success: `Multisig transaction #${id} ${
          isFinalSigner ? 'executed' : 'confirmed'
        }`,
        error: `Failed to confirm multisig transaction #${id}`,
      },
    );
  }, [confirmTx.write, revokeConfirmTx.write]);
  return (
    <>
      {!executed &&
        (confirmTx.write ? (
          <button
            className={tw(
              'align-middle hover:scale-110 transition-all',
              confirmTx.isLoading ? 'animate-bounce' : '',
            )}
            disabled={!confirmTx.write || confirmTx.isLoading}
            onClick={handleSubmit}
            title={isFinalSigner ? 'Confirm & Execute' : 'Confirm'}
          >
            {isFinalSigner ? (
              <CheckCircledIcon className="align-middle text-[var(--green10)]" />
            ) : (
              <PlusCircledIcon className="align-middle text-[var(--green10)]" />
            )}
          </button>
        ) : revokeConfirmTx.write ? (
          <button
            className={tw(
              'align-middle hover:scale-110 transition-all',
              revokeConfirmTx.isLoading ? 'animate-bounce' : '',
            )}
            disabled={!revokeConfirmTx.write || revokeConfirmTx.isLoading}
            onClick={handleSubmit}
            title="Revoke Confirmation"
          >
            <MinusCircledIcon className="align-middle text-[var(--red10)]" />
          </button>
        ) : (
          <CircleIcon className="align-middle text-[var(--gray10)] animate-pulse" />
        ))}
    </>
  );
};

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
  const confirmTx = useSContractWrite('MULTISIG_WALLET', {
    enabled: !!id,
    name: 'confirmTransaction',
    args: id ? [BigNumber.from(id)] : undefined,
  });
  const revokeConfirmTx = useSContractWrite('MULTISIG_WALLET', {
    enabled: !!id,
    name: 'revokeConfirmation',
    args: id ? [BigNumber.from(id)] : undefined,
  });

  // evaluate multisig tx state

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

  const countConfirmations = useSContractRead('MULTISIG_WALLET', {
    enabled: !!id,
    name: 'getConfirmationCount',
    args: [BigNumber.from(id)] as const,
    select: (data) => data.toNumber(),
  });

  // evaluate time elapsed

  const { data: transaction } = useTransaction({
    enabled: !!submitEvent,
    hash: submitEvent?.transactionHash as `0x${string}`,
  });

  const { data: block } = useQuery({
    enabled: !!submitEvent,
    queryKey: ['block', submitEvent?.blockNumber],
    queryFn: () => {
      return submitEvent?.getBlock();
    },
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

  const toAddress =
    transaction?.data &&
    (('0x' + transaction?.data.slice(34, 34 + 40)) as Address);

  const [toContractId, toName, toMethod, destName, destMethod] = useMemo(() => {
    const toContractId = toAddress && build.contractIdFromAddress(toAddress);
    const toName = toContractId
      ? getSContractProp(toContractId, 'name')
      : toAddress && toAddress.slice(0, 12);
    const toMethod = transaction?.data && transaction.data.slice(264, 264 + 10);

    let destName, destMethod;
    if (transaction?.data && toContractId === 'MARIONETTE') {
      const destAddress = ('0x' +
        transaction.data.slice(298, 298 + 40)) as Address;
      const destContractId = build.contractIdFromAddress(destAddress);
      destName = destContractId
        ? getSContractProp(destContractId, 'name')
        : destAddress && destAddress.slice(0, 12);
      destMethod = transaction.data.slice(529, 529 + 9);
    } else {
      destMethod = '-';
    }

    return [toContractId, toName, toMethod, destName, destMethod];
  }, [toAddress]);

  const name = destName || toName;
  const method = destName ? destMethod : toMethod;

  const remainingConfirmations = Math.max(
    0,
    (reqdConfirmations || 0) - (countConfirmations.data || 0),
  );

  return (
    <Card
      lean
      heading={
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="text-sm">
                {id}
                <span className="text-[var(--gray10)]">-</span>{' '}
              </div>
              {name && method ? (
                <>
                  {toContractId === 'MARIONETTE' && (
                    <span>
                      <StackIcon />
                    </span>
                  )}
                  <span>
                    {name.length <= 12
                      ? name
                      : name.slice(0, 6) + '..' + name.slice(name.length - 6)}
                  </span>
                  <code
                    className={tw('text-xs', failed ? 'bg-[var(--red2)]' : '')}
                  >
                    {method}
                  </code>
                </>
              ) : (
                'Contract Interaction <>'
              )}{' '}
            </div>
            <div>
              {executed === false && (
                <TxAction
                  id={id}
                  executed={executed}
                  confirmTx={confirmTx}
                  revokeConfirmTx={revokeConfirmTx}
                  remainingConfirms={remainingConfirmations}
                  onAction={() => {
                    countConfirmations.refetch();
                    onAction?.();
                  }}
                />
              )}
            </div>
          </div>
          <span className="text-sm text-[var(--gray10)]">
            {elapsed ? `About ${elapsed} ago` : '. . .'}
          </span>
        </div>
      }
    >
      <div className="flex justify-between items-center">
        <div className="text-sm">
          Confirmations: {countConfirmations.data}{' '}
          {reqdConfirmations && !executed && `of ${reqdConfirmations}`}{' '}
        </div>
      </div>
    </Card>
  );
});
