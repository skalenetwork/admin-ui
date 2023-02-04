import { Cross1Icon } from '@radix-ui/react-icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { PropsWithChildren } from 'react';
import { tw } from 'twind';

type PopoverProps = PropsWithChildren<{
  trigger: JSX.Element;
  title: string;
  hasCross?: boolean;
}>;

const Popover = ({
  trigger,
  title,
  hasCross = false,
  children,
}: PopoverProps) => {
  return (
    <div className="relative inline-block w-max text-left">
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <button className="p-0 text-inherit">{trigger}</button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={4}
          className={tw(
            'border',
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'rounded-lg p-4 shadow-md',
            'bg-[var(--white)]',
            'max-h-[60vh]',
            'flex flex-col',
          )}
        >
          <PopoverPrimitive.Arrow className="fill-current text-[var(--white)]" />
          <h4>{title}</h4>
          <div className="flex-grow overflow-auto pr-2">{children}</div>
          {hasCross && (
            <PopoverPrimitive.Close
              className={tw(
                'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            >
              <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
            </PopoverPrimitive.Close>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  );
};

export default Popover;
