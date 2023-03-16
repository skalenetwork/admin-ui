import Card from '@/components/Card/Card';
import { getSContractProp } from '@/features/network/contract';
import { useSContractWrite } from '@/features/network/hooks';
import { build } from '@/features/network/manifest';
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';
import humanizeDuration from 'humanize-duration';
import React, { useMemo } from 'react';
import { tw } from 'twind';
import { Address, useTransaction } from 'wagmi';

const TxAction = ({
  executed,
  confirmTx,
  revokeConfirmTx,
}: {
  executed: boolean;
  confirmTx: ReturnType<typeof useSContractWrite>;
  revokeConfirmTx: ReturnType<typeof useSContractWrite>;
}) => {
  return (
    <>
      {!executed &&
        (confirmTx.write ? (
          <button
            className="align-middle"
            disabled={!confirmTx.write}
            onClick={() => confirmTx.write?.()}
            title="Confirm"
          >
            <PlusCircledIcon className="align-middle text-[var(--green10)]" />
          </button>
        ) : revokeConfirmTx.write ? (
          <button
            className="align-middle"
            disabled={!revokeConfirmTx.write}
            onClick={() => revokeConfirmTx.write?.()}
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

export const WidgetMultisigTx = React.memo(function TxWidget({
  id,
  events = [],
  reqdConfirmations,
}: {
  id: any;
  events: ethers.Event[];
  reqdConfirmations?: number;
}) {
  const confirmTx = useSContractWrite('MULTISIG_WALLET', {
    name: 'confirmTransaction',
    args: id ? [BigNumber.from(id)] : undefined,
  });
  const revokeConfirmTx = useSContractWrite('MULTISIG_WALLET', {
    name: 'revokeConfirmation',
    args: id ? [BigNumber.from(id)] : undefined,
  });

  // evaluate multisig tx state

  // @later for scale, implement useMultisigTx: fetch submitEvent, rest contract calls
  const {
    countConfirmations,
    submitEvent,
    isFailed: failed,
    isExecuted: executed,
  } = useMemo(() => {
    if (!(events && events.length)) return {};
    return {
      countConfirmations: events.filter((e) => e.event === 'Confirmation')
        .length,
      submitEvent: events.find((e) => e.event === 'Submission'),
      isFailed: events.some((e) => e.event === 'ExecutionFailure'),
      isExecuted: events.some((e) => e.event === 'Execution'),
    };
  }, [events]);

  // evaluate time elapsed

  const { data: transaction } = useTransaction({
    enabled: !!submitEvent,
    hash: submitEvent?.transactionHash as `0x${string}`,
  });

  const { data: block } = useQuery({
    enabled: Boolean(submitEvent),
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

  const [toName, toMethod, destName, destMethod] = useMemo(() => {
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

    return [toName, toMethod, destName, destMethod];
  }, [toAddress]);

  const name = destName || toName;
  const method = destName ? destMethod : toMethod;

  return (
    <Card
      lean
      heading={
        <div>
          <h5 className="flex items-center justify-between">
            <span>
              {id} -{' '}
              {name && method ? (
                <>
                  {name.length <= 12
                    ? name
                    : name.slice(0, 6) +
                      '..' +
                      name.slice(name.length - 6)}{' '}
                  <code
                    className={tw('text-xs', failed ? 'bg-[var(--red2)]' : '')}
                  >
                    {method}
                  </code>
                </>
              ) : (
                'Contract Interaction <>'
              )}{' '}
            </span>
            <TxAction
              executed={!!executed}
              confirmTx={confirmTx}
              revokeConfirmTx={revokeConfirmTx}
            />
          </h5>
          <span className="text-sm text-[var(--gray10)]">
            {elapsed ? `About ${elapsed} ago` : '. . .'}
          </span>
        </div>
      }
    >
      <p className="text-sm">
        Confirmations: {countConfirmations}{' '}
        {reqdConfirmations && !executed && `of ${reqdConfirmations}`}{' '}
      </p>
    </Card>
  );
});
