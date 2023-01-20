import { TrashIcon } from '@radix-ui/react-icons';
import { NiceAddress } from './NiceAddress';

export function MultisigOwner({
  address,
  showControls = false,
}: {
  address: string;
  showControls?: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-8 py-2">
      <p className="font-medium">Name</p>
      <NiceAddress address={address} copyable />
      {showControls && (
        <div className="ml-auto">
          <TrashIcon className="h-6 w-6 cursor-pointer text-[var(--red10)]" />
        </div>
      )}
    </div>
  );
}
