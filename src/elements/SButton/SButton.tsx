import { PeopleIcon } from '@/components/Icons/Icons';
import { useSContractWrite } from '@/features/network/hooks';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { toast as toastify } from 'react-toastify';
import { tw } from 'twind';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  writer: ReturnType<typeof useSContractWrite>;
  noWrite?: boolean;
  toast?: Parameters<typeof toastify.promise>[1];
  onPromise?: (promise: Promise<unknown>) => any;
  confirm?: boolean | number;
} & PropsWithChildren;

export function SButton({
  children,
  className,
  writer,
  noWrite,
  toast,
  onPromise,
  confirm = true,
  disabled,
  title,
  onClick,
  ...rest
}: Props) {
  const midStatus =
    writer.action === 'wait'
      ? 'preparing'
      : writer.isLoading
      ? 'loading'
      : writer.action === 'none'
      ? 'pending'
      : '';
  const noAction = midStatus === 'pending';
  const _disabled = !writer.writeAsync || !!midStatus;
  const _title =
    writer.multisigData?.trxId &&
    `${
      writer.multisigData?.signerHasConfirmed === false
        ? writer.multisigData?.countRemaining === 1
          ? '▶️'
          : '⊕'
        : writer.multisigData?.countRemaining === 0
        ? '▶️'
        : '⏳'
    } msig tx#${writer.multisigData?.trxId}`;
  return (
    <button
      className={tw(className, midStatus)}
      disabled={_disabled || disabled}
      onClick={async (e) => {
        onClick && (await onClick(e));
        const promise =
          noWrite !== true &&
          writer.writeAsync &&
          (toast
            ? toastify.promise(writer.writeAsync(confirm), toast)
            : writer.writeAsync(confirm));
        promise && onPromise?.(promise);
      }}
      title={`${title || ''} ${_title || ''}`}
      {...rest}
    >
      {children}{' '}
      {noAction ? (
        <>
          &emsp;
          <PeopleIcon width="18" />{' '}
          <span className="font-mono text-sm">
            {writer.multisigData?.countConfirmed}/
            {writer.multisigData?.countRequired}
          </span>
        </>
      ) : (
        ''
      )}
    </button>
  );
}
