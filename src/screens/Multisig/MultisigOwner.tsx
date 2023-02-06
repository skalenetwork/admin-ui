import { NiceAddress } from '@/elements/NiceAddress';
import { TrashIcon } from '@radix-ui/react-icons';

export function MultisigOwner({
  name,
  address,
  showControls = false,
}: {
  name?: string;
  address: string;
  showControls?: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-8 py-2">
      <NiceAddress
        address={address}
        label={name || address.slice(0, 4)}
        copyable
        className="w-full"
      />
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
