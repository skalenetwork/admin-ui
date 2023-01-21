import Stepper from '@/components/Stepper/Stepper';
import { Transition } from '@headlessui/react';
import { tw } from 'twind';

import { CheckIcon } from '@radix-ui/react-icons';

export default function ImaManager() {
  const steps = [
    {
      id: 'select-origin',
      label: 'Select Origin',
      content: (
        <div>
          <p>Select Origin</p>
        </div>
      ),
    },
    {
      id: 'select-target',
      label: 'Select Target',
      content: <div>Select Target</div>,
    },
  ];

  return (
    <div className="grid h-full w-full rounded-lg bg-[var(--white)]">
      <Stepper
        trigger={({ id, index, label, activeIndex }) => (
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
              {index < steps.length - 1 ? (
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
        )}
        steps={steps}
      />
      {/* <div data-id="main"></div>
      <div data-id="collapse"></div> */}
    </div>
  );
}
