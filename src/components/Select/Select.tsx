import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { tw } from 'twind';

type Props = {
  items: { value: string; renderer: any }[];
  onValueChange: (value: string) => void;
};

const Select = ({ items, onValueChange }: Props) => {
  return (
    <SelectPrimitive.Root
      defaultValue="blueberry"
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger asChild aria-label="Food">
        <button>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
          <SelectPrimitive.Group>
            {items.map((item, i) => (
              <SelectPrimitive.Item
                key={`${item}-${i}`}
                value={item.value}
                className={tw(
                  'relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-gray-700 focus:bg-gray-100 dark:text-gray-300 dark:focus:bg-gray-900',
                  'radix-disabled:opacity-50',
                  'select-none focus:outline-none',
                )}
              >
                {item.renderer()}
                {/* <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator> */}
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default Select;
