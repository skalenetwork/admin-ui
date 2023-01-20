import * as TabsPrimitive from '@radix-ui/react-tabs';
import { useMemo, useState } from 'react';
import { tw } from 'twind';

type Step = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type Props = {
  className?: string;
  steps: Step[];
  trigger: (
    props: Pick<Step, 'id' | 'label'> & { index: number; activeIndex: number },
  ) => JSX.Element;
};

export default function Stepper({ className, steps, trigger }: Props) {
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
            {trigger({ id, label, index, activeIndex })}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {steps.map(({ id, content }) => (
        <TabsPrimitive.Content value={id}>{content}</TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
