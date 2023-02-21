import * as TabsPrimitive from '@radix-ui/react-tabs';
import { tw } from 'twind';

interface Tab {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

type TabsProps = {
  tabs: Tab[];
  defaultValue?: string;
};

const Tabs = ({ tabs, defaultValue = '' }: TabsProps) => {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue}>
      <TabsPrimitive.List className={tw('flex w-full rounded-t-lg')}>
        {tabs.map(({ id, title, description }) => (
          <TabsPrimitive.Trigger
            key={`tab-trigger-${id}`}
            value={id}
            className={tw(
              'group',
              'first:rounded-tl-lg last:rounded-tr-lg',
              'border-b first:border-r last:border-l',
              'border-1 border-[var(--slate1)]',
              'radix-state-active:bg-[#95ACCE] radix-state-active:text-[var(--white)] focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-[var(--gray1)]',
              'flex-1 px-3 py-2.5',
              'focus:radix-state-active:border-b-red',
              'focus:z-10 focus:outline-none',
            )}
          >
            <p className={tw('text-sm font-medium')}>{title}</p>
            {description && (
              <p className="text-xs group-radix-state-active:text-[inherit] text-[var(--gray10)]">
                {description}
              </p>
            )}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map(({ id, content }) => (
        <TabsPrimitive.Content
          key={`tab-content-${id}`}
          value={id}
          className={tw('rounded-b-lg px-6 py-4')}
        >
          {content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
};

export { Tabs };
