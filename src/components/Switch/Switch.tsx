import * as SwitchPrimitive from '@radix-ui/react-switch';
import { tw } from 'twind';
import React from 'react';

type SwitchProps = {
  onChange: (checked: boolean) => void
}

const Switch = (props: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={tw(
        'group',
        'radix-state-checked:bg-[var(--slate10)]',
        'radix-state-unchecked:bg-[var(--slate4)]',
        'relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
      )}
      onCheckedChange={props.onChange}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={tw(
          'group-radix-state-checked:translate-x-5',
          'group-radix-state-unchecked:translate-x-0',
          'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
        )}
      />
    </SwitchPrimitive.Root>
  );
};

export { Switch };
