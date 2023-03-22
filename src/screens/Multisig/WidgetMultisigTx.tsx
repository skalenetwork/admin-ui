import Card from '@/components/Card/Card';
import { useCacheWallet } from '@/features/multisig/hooks';
import { getAbi } from '@/features/network/abi/abi';
import { getSContractProp } from '@/features/network/contract';
import { useSContractRead, useSContractWrite } from '@/features/network/hooks';
import { build } from '@/features/network/manifest';
import {
  CaretRightIcon,
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
import { Address, useAccount, useTransaction } from 'wagmi';

const TxAction = ({
  id,
  executed,
  confirmTx,
  revokeConfirmTx,
  hasConfirmed,
  remainingConfirms,
  onAction,
}: {
  id: number;
  executed: boolean;
  confirmTx: ReturnType<typeof useSContractWrite>;
  hasConfirmed: boolean;
  revokeConfirmTx: ReturnType<typeof useSContractWrite>;
  remainingConfirms: number;
  onAction?: () => void;
}) => {
  const isFinalSigner = remainingConfirms === 1 && !!confirmTx?.write;
  const handleSubmit = useCallback(async () => {
    const action = (revokeConfirmTx || confirmTx).writeAsync;
    if (!action) return;
    toast.promise(
      async () => {
        await action(true);
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
        (hasConfirmed === undefined ? (
          <CircleIcon className="align-middle text-[var(--gray10)] animate-pulse" />
        ) : hasConfirmed === false && !!confirmTx.write ? (
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
        ) : hasConfirmed === true && !!revokeConfirmTx.write ? (
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
          <></>
        ))}
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
  // evaluate multisig tx state

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

  const countConfirmations = ownersThatConfirmed.data?.length;

  const signerHasConfirmed =
    address &&
    ownersThatConfirmed?.data &&
    ownersThatConfirmed.data.includes(address);

  // ready up writers

  const confirmTx = useSContractWrite('MULTISIG_WALLET', {
    enabled: !!(id && executed === false),
    name: 'confirmTransaction',
    args: id ? [BigNumber.from(id)] : undefined,
  });
  const revokeConfirmTx = useSContractWrite('MULTISIG_WALLET', {
    enabled: !!(id && executed === false),
    name: 'revokeConfirmation',
    args: id ? [BigNumber.from(id)] : undefined,
  });

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

  // const toAddress =
  //   transaction?.data &&
  //   (('0x' + transaction?.data.slice(34, 34 + 40)) as Address);

  const multisigAbi = getAbi('MULTISIG_WALLET');
  const multisigIface = new ethers.utils.Interface(multisigAbi);
  const txArgs =
    transaction?.data &&
    multisigIface &&
    multisigIface.decodeFunctionData('submitTransaction', transaction.data);
  const toAddress = txArgs?.[0] as Address;
  const toTxData = txArgs?.[2];

  const [toContractId, toName, toMethod, destName, destMethod] = useMemo(() => {
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
        : toAddress && toAddress.slice(0, 20));
    const toMethod = toParsed
      ? toParsed.functionFragment.name
      : toTxData.slice(0, 10);

    let destName, destMethod;
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
        : destAddress && destAddress.slice(0, 20);
      destMethod = destParsed
        ? destParsed.functionFragment.name
        : destTxData.slice(0, 10);
    } else {
      destMethod = '-';
    }

    return [toContractId, toName, toMethod, destName, destMethod];
  }, [toAddress]);

  const name = destName || toName;
  const method = destName ? destMethod : toMethod;

  const remainingConfirmations = Math.max(
    0,
    (reqdConfirmations || 0) - (countConfirmations || 0),
  );

  const displayName =
    name &&
    (name.length <= 24
      ? name
      : name.slice(0, 12) + '..' + name.slice(name.length - 12));

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
              {executed === false && (
                <TxAction
                  id={id}
                  executed={executed}
                  confirmTx={confirmTx}
                  revokeConfirmTx={revokeConfirmTx}
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
