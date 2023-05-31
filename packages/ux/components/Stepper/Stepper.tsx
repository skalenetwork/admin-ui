import { CheckIcon } from '@radix-ui/react-icons';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { tw } from 'twind';

type Step = {
  id: string;
  label: string;
  content: (props: {
    stepNext: () => void;
    stepPrev: () => void;
    markComplete: () => void;
  }) => JSX.Element | React.ReactNode;
};

type Trigger = Pick<Step, 'id' | 'label'> & {
  index: number;
  activeIndex: number;
  totalSteps: number;
  complete: boolean;
};

type Props = {
  className?: string;
  steps: Step[];
  completeElement: JSX.Element;
  trigger?: (props: Trigger) => JSX.Element;
  bodyClass?: string;
};

export function StepperTrigger({
  id,
  label,
  index,
  activeIndex,
  totalSteps,
  complete,
}: Trigger) {
  return (
    <div
      className="group py-4"
      data-state={index === activeIndex || complete ? 'active' : 'inactive'}
    >
      <div className="px-8 py-2 text-sm text-[var(--gray10)] group-radix-state-active:text-[var(--black)]">
        {index + 1}. {label}
      </div>
      <div className="grid grid-cols-[1fr_max-content_1fr] items-center justify-center gap-0">
        {index > 0 ? (
          <div
            className={tw(
              'h-0.5',
              'bg-[var(--gray3)]',
              (index <= activeIndex || complete) && 'bg-[var(--primary)]',
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
            (index < activeIndex || complete) && 'bg-[var(--primary)]',
          )}
        >
          {index < activeIndex || complete ? (
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
              (index < activeIndex || complete) && 'bg-[var(--primary)]',
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
  completeElement,
  bodyClass = '',
}: Props) {
  const [activeId, setActiveId] = useState('');
  const [complete, setComplete] = useState(false);

  // replace with a comparative effect if steps
  // are async or to change dynamically
  useEffectOnce(() => {
    steps?.length && setActiveId(steps[0].id);
  });

  const activeIndex = useMemo(() => {
    return steps.findIndex((s) => s.id === activeId);
  }, [activeId, steps]);

  const stepNext = useCallback(() => {
    if (activeIndex < steps.length) {
      setActiveId(steps[activeIndex + 1].id);
    }
  }, [activeIndex, steps]);

  const stepPrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveId(steps[activeIndex - 1].id);
    }
  }, [activeIndex, steps]);

  useEffect(() => {
    complete === true && setActiveId('__complete');
  }, [complete]);

  return (
    <TabsPrimitive.Root
      className={`${className}`}
      value={activeId || steps[0].id}
      onValueChange={(val) => setActiveId(val)}
    >
      <TabsPrimitive.List className="flex justify-center">
        {steps.map(({ id, label }, index) => (
          <React.Fragment key={id}>
            {trigger({
              id,
              label,
              index,
              activeIndex,
              totalSteps: steps.length,
              complete,
            })}
          </React.Fragment>
        ))}
      </TabsPrimitive.List>
      <div className={bodyClass}>
        {steps.map(({ id, content }) => (
          <TabsPrimitive.Content value={id} key={id} asChild>
            <>
              {content({
                stepNext,
                stepPrev,
                markComplete: () => setComplete(true),
              })}
            </>
          </TabsPrimitive.Content>
        ))}
        <TabsPrimitive.Content value={'__complete'} asChild>
          <>{completeElement}</>
        </TabsPrimitive.Content>
      </div>
    </TabsPrimitive.Root>
  );
}
