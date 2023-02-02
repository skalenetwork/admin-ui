import { PropsWithChildren } from 'react';
import { tw } from 'twind';
import { InfoIcon } from '../Icons/Icons';
import ScrollZone from '../ScrollZone/ScrollZone';
import Tooltip from '../Tooltip/Tooltip';

/**
 * Set fixed height on body instead of whole card
 */

type Props = PropsWithChildren<{
  className?: string;
  bodyClass?: string;
  full?: boolean;
  lean?: boolean;
  heading: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
}>;

export default function Card({
  children,
  className,
  bodyClass,
  full,
  lean,
  heading,
  tooltip,
}: Props) {
  const paddingClass = `${lean ? 'p-2' : 'p-4'}`;
  return (
    <div
      className={tw`
      flex flex-col overflow-hidden
      rounded-lg bg-[var(--white)] text-[var(--gray12)]
      ${className}
      ${full ? 'h-full w-full' : ''}
      `}
      role="combobox"
    >
      <div
        className={tw`flex justify-between ${paddingClass} rounded-t-lg pb-0`}
      >
        <div className={tw`h-[max-content] w-full pb-2`}>
          {typeof heading === 'string' ? (
            lean ? (
              <h5 className="font-medium">{heading}</h5>
            ) : (
              <h4 className="font-medium">{heading}</h4>
            )
          ) : (
            heading
          )}
        </div>
        {tooltip && (
          <Tooltip
            trigger={
              <div className="cursor-pointer transition-all hover:-translate-x-1">
                <InfoIcon color={'var(--gray8)'} />
              </div>
            }
            content={tooltip}
          />
        )}
      </div>
      <div
        className={tw`flex-grow overflow-auto ${paddingClass} pt-0 ${bodyClass}`}
      >
        {children}
      </div>
    </div>
  );
}
