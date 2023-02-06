import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';

type FormData = {
  chainName: string;
};

export default function ImaConnectChain() {
  const form = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      chainName: '',
    } as FormData,
  });
  const { address } = useAccount();
  return (
    <div
      className="grid grid-cols-4 h-full w-full overflow-auto rounded-lg bg-[var(--white)] p-6"
      data-s="1"
    ></div>
  );
}
