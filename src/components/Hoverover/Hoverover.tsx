import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { PropsWithChildren } from 'react';
import { tw } from 'twind';

type PopoverProps = PropsWithChildren<{
  trigger: JSX.Element;
  triggerClass?: string;
  title: string;
}>;

const Hoverover = ({
  trigger,
  triggerClass,
  title,
  children,
}: PopoverProps) => {
  return (
    <div className="">
      <HoverCardPrimitive.Root>
        <HoverCardPrimitive.Trigger asChild>
          <button className={tw(triggerClass)}>{trigger}</button>
        </HoverCardPrimitive.Trigger>
        <HoverCardPrimitive.Content
          align="center"
          sideOffset={4}
          className={tw(
            'border z-[99999999]',
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'rounded-lg p-4 shadow-md',
            'bg-[var(--white)]',
            'max-h-[60vh]',
            'flex flex-col',
          )}
        >
          <HoverCardPrimitive.Arrow className="fill-current text-[var(--white)]" />
          <h4>{title}</h4>
          <div className="flex-grow overflow-auto pr-2">{children}</div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </div>
  );
};

export default Hoverover;
