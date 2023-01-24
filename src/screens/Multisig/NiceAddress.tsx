import { CopyIcon } from '@radix-ui/react-icons';
import { Avatar } from 'connectkit';
import { useEffect } from 'react';
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard';

export function NiceAddress({
  className = '',
  address,
  balance,
  copyable = false,
}: {
  className?: string;
  address: string;
  balance?: string;
  copyable?: boolean;
}) {
  const [copied, copy] = useCopyToClipboard();
  useEffect(() => {
    copied.value &&
      window.setTimeout(() => {
        copy('');
      }, 1000);
  }, [copied.value]);
  return (
    <div
      className={`grid grid-cols-[max-content_max-content_1fr] items-center gap-x-4 gap-y-1 ${className}`}
    >
      <Avatar address={address as `0x${string}`} size={32}></Avatar>
      <div className="flex flex-col justify-start">{address}</div>
      <div className="flex items-center gap-2">
        {copyable && (
          <div className="relative">
            {copied.value && (
              <div
                className="
              z-100 absolute left-[125%] bottom-[50%]
              rounded-md border bg-[var(--white)] py-0.5 px-2 text-xs text-[var(--gray11)] shadow-sm
              "
              >
                Copied
              </div>
            )}

            <CopyIcon
              onClick={() => copy(address)}
              className="ml-auto h-6 w-6 cursor-pointer text-[var(--gray10)]"
            />
          </div>
        )}
      </div>
      {balance && (
        <>
          <div></div>
          <div>
            {balance && (
              <p className="inline-block w-max rounded-xl bg-[var(--gray6)] px-4 py-1 text-sm">
                Balance: <span className="font-semibold">{balance}</span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
