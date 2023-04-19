import { PeopleIcon } from '@/components/Icons/Icons';
import { useSContractWrite } from '@/features/network/hooks';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { toast as toastify } from 'react-toastify';
import { tw } from 'twind';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  writer: ReturnType<typeof useSContractWrite>;
  toast?: Parameters<typeof toastify.promise>[1];
  onToast?: (promise: Promise<unknown>) => any;
} & PropsWithChildren;

export function SButton({
  children,
  className,
  writer,
  toast,
  onToast,
  disabled,
  title,
  onClick,
  ...rest
}: Props) {
  const noAction = writer.action === 'none';
  const _disabled = !writer.writeAsync || writer.isLoading || noAction;
  const _title = noAction && writer.multisigData.trxId;
  return (
    <button
      className={tw(
        className,
        writer.isLoading ? 'loading' : noAction ? 'pending' : '',
      )}
      disabled={_disabled || disabled}
      onClick={async (e) => {
        onClick && (await onClick(e));
        const promise =
          toast &&
          writer.writeAsync &&
          toastify.promise(writer.writeAsync(true), toast);
        promise && onToast?.(promise);
      }}
      title={`${title || ''} ${_title ? '- Trx#' + _title : ''}`}
      {...rest}
    >
      {children}{' '}
      {noAction ? (
        <>
          &emsp;
          <PeopleIcon width="18" />{' '}
          <span className="font-mono text-sm">
            {writer.multisigData.countConfirmed}/
            {writer.multisigData.countRequired}
          </span>
        </>
      ) : (
        ''
      )}
    </button>
  );
}
