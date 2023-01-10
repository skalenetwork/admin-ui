import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';
import { tw } from 'twind';

interface Props {
  trigger: React.ReactNode;
  content: string | React.ReactNode;
}

const Tooltip = ({ trigger, content }: Props) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className={tw(
            'inline-flex items-center rounded-md px-4 py-2.5',
            'bg-[var(--black)]',
          )}
        >
          <TooltipPrimitive.Arrow className="fill-current text-[var(--black)]" />
          <>
            {typeof content === 'string' ? (
              <span className="block text-xs leading-none text-[var(--gray2)]">
                {content}
              </span>
            ) : (
              <div className="text-xs text-[var(--gray2)]">{content}</div>
            )}
          </>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
