import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { tw } from 'twind';

type Props = {
  triggerClass?: string;
  listClass?: string;
  listItemClass?: string;
  items: { value: string; renderer: any }[];
  value: string;
  onValueChange: (value: string) => void;
};

const Select = ({
  triggerClass = '',
  listClass = '',
  listItemClass = '',
  items,
  onValueChange,
  value,
}: Props) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        asChild
        aria-label="Wallet"
        className={tw`${triggerClass}`}
      >
        <div>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-auto text-[inherit]">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </div>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content className="z-50">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className={`${listClass}`}>
          <SelectPrimitive.Group>
            {items.map((item, i) => (
              <SelectPrimitive.Item
                key={`${item}-${i}`}
                value={item.value}
                className={tw(
                  'relative',
                  'radix-disabled:opacity-50',
                  'select-none focus:outline-none',
                  listItemClass,
                )}
              >
                <SelectPrimitive.ItemText>
                  {item.renderer()}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default Select;
