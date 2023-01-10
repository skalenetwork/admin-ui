import { PropsWithChildren } from 'react';
import { tw } from 'twind';
import { InfoIcon } from '../Icons/Icons';
import ScrollZone from '../ScrollZone/ScrollZone';
import Tooltip from '../Tooltip/Tooltip';

type Props = PropsWithChildren<{
  className?: string;
  full: boolean;
  heading: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
}>;

export default function Card({
  children,
  className,
  full,
  heading,
  tooltip,
}: Props) {
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
      <div className="flex justify-between">
        <h4 className={tw`h-[max-content] pb-2`}>{heading}</h4>
        {tooltip && (
          <Tooltip
            trigger={
              <div className="cursor-pointer">
                <InfoIcon color={'var(--gray6)'} />
              </div>
            }
            content={tooltip}
          />
        )}
      </div>
      <div className={tw`flex-grow`}>
        <ScrollZone grow>{children}</ScrollZone>
      </div>
    </div>
  );
}
