import { CheckIcon } from '@radix-ui/react-icons';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useMemo, useState } from 'react';
import { tw } from 'twind';

type Step = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type Trigger = Pick<Step, 'id' | 'label'> & {
  index: number;
  activeIndex: number;
  totalSteps: number;
};

type Props = {
  className?: string;
  steps: Step[];
  trigger?: (props: Trigger) => JSX.Element;
};

export function StepperTrigger({
  id,
  label,
  index,
  activeIndex,
  totalSteps,
}: Trigger) {
  return (
    <div className="group py-8">
      <div className="cursor-pointer px-8 py-2 text-sm text-[var(--gray10)] group-radix-state-active:text-[var(--black)]">
        {index + 1}. {label}
      </div>
      <div className="grid grid-cols-[1fr_max-content_1fr] items-center justify-center gap-0">
        {index > 0 ? (
          <div
            className={tw(
              'h-0.5',
              'bg-[var(--gray3)]',
              index <= activeIndex && 'bg-[var(--primary)]',
            )}
          ></div>
        ) : (
          <div></div>
        )}
        <div
          className={tw(
            'flex h-6 w-6 items-center justify-center',
            'rounded-[50%]',
            'group-radix-state-active:shadow-[0_0_0_4px_var(--gray3)]',
            index < activeIndex && 'bg-[var(--primary)]',
          )}
        >
          {index < activeIndex ? (
            <CheckIcon className="h-5 w-5 text-white" />
          ) : (
            <div
              className={tw(
                'h-2 w-2',
                'rounded-[50%]',
                'box-content border-[8px] group-radix-state-active:border-[var(--primary)]',
              )}
            ></div>
          )}
        </div>
        {index < totalSteps - 1 ? (
          <div
            className={tw(
              'h-0.5',
              'bg-[var(--gray3)]',
              index < activeIndex && 'bg-[var(--primary)]',
            )}
          ></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default function Stepper({
  className,
  steps,
  trigger = StepperTrigger,
}: Props) {
  const [activeId, setActiveId] = useState('');
  const activeIndex = useMemo(() => {
    return steps.findIndex((s) => s.id === activeId);
  }, [activeId, steps]);

  return (
    <TabsPrimitive.Root
      className={`${className}`}
      value={activeId || steps[0].id}
      onValueChange={(val) => setActiveId(val)}
    >
      <TabsPrimitive.List className="flex">
        {steps.map(({ id, label }, index) => (
          <TabsPrimitive.Trigger value={id} asChild>
            {trigger({
              id,
              label,
              index,
              activeIndex,
              totalSteps: steps.length,
            })}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {steps.map(({ id, content }) => (
        <TabsPrimitive.Content value={id}>{content}</TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
