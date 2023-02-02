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
          <button className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-[var(--red3)]">
            <TrashIcon className="h-6 w-6 cursor-pointer rounded-full text-[var(--red10)]" />
          </button>
        </div>
      )}
    </div>
  );
}
