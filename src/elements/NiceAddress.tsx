import Avatar from '@/components/Avatar/Avatar';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { CopyIcon } from '@radix-ui/react-icons';
import { Avatar as AddressAvatar } from 'connectkit';
import { useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';

export function NiceAddress({
  className = '',
  address,
  label,
  balance,
  copyable = false,
  iconUrl,
  labelOnly = false,
}: {
  className?: string;
  address: string;
  label?: string;
  balance?: string;
  copyable?: boolean;
  iconUrl?: string;
  labelOnly?: boolean;
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
      {iconUrl ? (
        <Avatar imageUrl={iconUrl} />
      ) : (
        <AddressAvatar
          address={address as `0x${string}`}
          size={32}
        ></AddressAvatar>
      )}
      <div className="flex justify-start gap-4">
        {label && <span className="font-semibold">{label}</span>}{' '}
        {!(label && labelOnly) && <span>{address}</span>}
      </div>
      <div className="flex items-center gap-2">
        {copyable && (
          <div className="relative ml-auto">
            <button
              className="flex items-center justify-center"
              onClick={() => copy(address)}
            >
              {copied.value ? (
                <CheckBadgeIcon className="ml-auto h-6 w-6 cursor-pointer text-[var(--green10)]" />
              ) : (
                <CopyIcon className="ml-auto h-6 w-6 cursor-pointer text-[var(--gray10)]" />
              )}
            </button>
          </div>
        )}
      </div>
      {/* row break at 3rd col ^ */}
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
