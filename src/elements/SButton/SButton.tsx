import { useSContractWrite } from '@/features/network/hooks';
import { PropsWithChildren } from 'react';
import { tw } from 'twind';

type Props = {
  className: string;
  disabled?: boolean;
  writer: ReturnType<typeof useSContractWrite>;
} & PropsWithChildren;

export default function SButton({
  className,
  disabled,
  children,
  writer,
}: Props) {
  const _disabled = !writer.write && disabled;
  return (
    <button
      className={tw(className, writer.isLoading ? 'loading' : '')}
      disabled={_disabled}
    >
      {children}
    </button>
  );
}
