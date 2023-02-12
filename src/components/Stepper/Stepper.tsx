import { CheckIcon } from '@radix-ui/react-icons';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useCallback, useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { tw } from 'twind';

type Step = {
  id: string;
  label: string;
  content: (props: {
    stepNext: () => void;
    stepPrev: () => void;
  }) => JSX.Element | React.ReactNode;
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
  className = '',
  steps,
  trigger = StepperTrigger,
}: Props) {
  const [activeId, setActiveId] = useState('');

  // replace with a comparative effect if steps
  // are async or to change dynamically
  useEffectOnce(() => {
    steps?.length && setActiveId(steps[0].id);
  });

  const activeIndex = useMemo(() => {
    return steps.findIndex((s) => s.id === activeId);
  }, [activeId, steps]);

  const stepNext = useCallback(() => {
    console.log(activeIndex, activeId);
    if (activeIndex < steps.length) {
      setActiveId(steps[activeIndex + 1].id);
    }
  }, [activeIndex, steps]);

  const stepPrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveId(steps[activeIndex - 1].id);
    }
  }, [activeIndex, steps]);

  return (
    <TabsPrimitive.Root
      className={`${className}`}
      value={activeId || steps[0].id}
      onValueChange={(val) => setActiveId(val)}
    >
      <TabsPrimitive.List className="flex justify-center">
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
      <div>
        {steps.map(({ id, content }) => (
          <TabsPrimitive.Content value={id} asChild>
            {content({
              stepNext,
              stepPrev,
            })}
          </TabsPrimitive.Content>
        ))}
      </div>
    </TabsPrimitive.Root>
  );
}
