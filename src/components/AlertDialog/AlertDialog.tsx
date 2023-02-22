import { Transition } from '@headlessui/react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Fragment, useCallback } from 'react';
import { tw } from 'twind';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  onAction?: () => Promise<{ status: string; message?: string }>;
}

export default function AlertDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  onAction,
}: Props) {
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
              className="fixed inset-0 top-0 bottom-0 z-20 grid place-items-center overflow-y-auto bg-[var(--blackA10)] backdrop-blur-sm"
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
                'border bg-[var(--white)]',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            >
              <AlertDialogPrimitive.Title className="my-2 text-center font-semibold text-[var(--black)]">
                <h4>{title}</h4>
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="my-2 font-normal text-[var(--black)]">
                <p className="text-sm">{description}</p>
              </AlertDialogPrimitive.Description>
              <AlertDialogPrimitive.Cancel
                className={tw(
                  'absolute top-4 right-5 inline-flex items-center justify-center rounded-full',
                  'focus:outline-none focus-visible:ring focus-visible:ring-[var(--primary)] focus-visible:ring-opacity-75',
                )}
              >
                <div className="text-[var(--gray10)]">
                  <Cross1Icon />
                </div>
              </AlertDialogPrimitive.Cancel>
              <div className="mt-4 flex justify-end space-x-2 w-full">
                <button className="btn w-1/2" onClick={handleAction}>
                  Yes
                </button>
                <AlertDialogPrimitive.Cancel
                  className={'btn btn-outline w-1/2'}
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
