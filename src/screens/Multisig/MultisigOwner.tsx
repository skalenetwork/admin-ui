import { NiceAddress } from '@/elements/NiceAddress';
import { useSContractWrite } from '@/features/network/hooks';
import { TrashIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Address } from 'wagmi';

export function MultisigOwner({
  name,
  address,
  showControls = false,
}: {
  name?: string;
  address: Address;
  showControls?: boolean;
}) {
  const { writeAsync } = useSContractWrite('MULTISIG_WALLET', {
    name: 'removeOwner',
    args: [address],
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex w-full items-center gap-4 py-2"
    >
      <NiceAddress
        address={address}
        label={name || address.slice(0, 4)}
        copyable
        className="w-full"
      />
      {showControls && (
        <div className="ml-auto">
          {writeAsync && (
            <button
              className="flex h-10 w-10 items-center justify-center
           rounded-full transition-all hover:bg-[var(--red3)]"
              onClick={() => {
                toast.promise(writeAsync?.(), {
                  pending: `Removing owner ${address}`,
                  success: `Owner removed ${address}`,
                  error: `Failed to remove owner ${address}`,
                });
              }}
            >
              <TrashIcon className="h-6 w-6 cursor-pointer rounded-full text-[var(--red10)]" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
