import { PropsWithChildren } from 'react';
import { tw } from 'twind';
import ScrollZone from '../ScrollZone/ScrollZone';

type Props = PropsWithChildren<{
  className?: string;
  full: boolean;
  heading: string | JSX.Element;
}>;

export default function Card({ children, className, full, heading }: Props) {
  return (
    <div
      className={tw`
      flex flex-col
      rounded-lg bg-[var(--white)] p-4 text-[var(--gray12)]
      ${full ? 'h-full w-full' : ''}
      ${className}
      `}
      role="combobox"
    >
      <h4 className={tw`h-[max-content] pb-2`}>{heading}</h4>
      <div className={tw`flex-grow`}>
        <ScrollZone grow>{children}</ScrollZone>
      </div>
    </div>
  );
}
