import { CopyIcon } from '@radix-ui/react-icons';
import { Avatar } from 'connectkit';
import { useEffect } from 'react';
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard';

export function NiceAddress({
  className = '',
  address,
  copyable = false,
}: {
  className?: string;
  address: string;
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
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <Avatar address={address as `0x${string}`} size={32}></Avatar>
      {'  '}
      <span>{address}</span>
      {copyable && (
        <div className="relative">
          {copied.value && (
            <div
              className="
              z-100 tex-[] absolute left-[100%] bottom-[100%]
              rounded-xl border bg-[var(--white)] py-0.5 px-1 text-xs text-[var(--gray10)]

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
  );
}
