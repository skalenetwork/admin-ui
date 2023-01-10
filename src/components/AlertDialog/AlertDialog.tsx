import { Transition } from '@headlessui/react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Fragment, useCallback } from 'react';
import { tw } from 'twind';

export default function AlertDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  onAction,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  onAction?: () => Promise<{ status: string; message?: string }>;
}) {
  const handleAction = useCallback(() => {
    ((onAction && onAction()) || Promise.resolve({ status: 'success' })).then(
      ({ status }) => {
        status === 'success' && onOpenChange(false);
      },
    );
  }, [onAction]);

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Trigger asChild>
        {trigger}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal forceMount>
        <Transition.Root show={open}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <AlertDialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-[var(--blackA11)]"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <AlertDialogPrimitive.Content
              forceMount
              className={tw(
                'fixed z-50',
                'flex flex-col items-center justify-start p-16 first-letter:gap-4',
                'w-[95vw] max-w-xl rounded-lg p-4 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'border-[1px] border-[var(--gray3)] bg-[var(--white)]',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            >
              <AlertDialogPrimitive.Title className="mb-4 text-center text-2xl font-medium text-[var(--black)]">
                {title}
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="mt-2 text-sm font-normal text-[var(--black)]">
                {description}
              </AlertDialogPrimitive.Description>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="btn btn-wide" onClick={handleAction}>
                  Yes
                </button>
                <AlertDialogPrimitive.Cancel
                  className={tw(
                    'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                    'bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600',
                    'border border-gray-300 dark:border-transparent',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                  )}
                >
                  Cancel
                </AlertDialogPrimitive.Cancel>
              </div>
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
