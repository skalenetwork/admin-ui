import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, {
  Fragment,
  HTMLAttributes,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { tw } from 'twind';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  actionElement: any;
  cancelElement?: any;
  onAction?: () => Promise<{
    status: string;
    message?: string;
  }>;
}

const Dialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  actionElement,
  cancelElement,
  onSubmit,
}: Props) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
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
            <DialogPrimitive.Overlay
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
            <DialogPrimitive.Content
              forceMount
              className={tw(
                'fixed z-50',
                'flex flex-col justify-start first-letter:gap-4',
                'w-[95vw] max-w-xl rounded-lg md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-[var(--white)] text-[var(--black)]',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            >
              <form onSubmit={onSubmit}>
                <div className="flex flex-row items-center gap-4 border-b border-[var(--gray6)] p-4">
                  <DialogPrimitive.Title asChild>
                    <h4>{title}</h4>
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="text-sm font-normal text-[var(--gray10)]">
                    {description}
                  </DialogPrimitive.Description>
                  <DialogPrimitive.Close
                    className={tw(
                      'ml-auto inline-flex items-center justify-center rounded-full',
                      'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                    )}
                  >
                    <div className="text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400">
                      ✠
                    </div>
                  </DialogPrimitive.Close>
                </div>

                <div className="p-8">{children}</div>

                <div className="flex justify-center gap-8 border-t border-[var(--gray6)] py-4">
                  {cancelElement ? (
                    cancelElement({
                      className: tw(
                        'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                        'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600',
                        'border border-transparent',
                        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                        'cursor-pointer',
                      ),
                    })
                  ) : (
                    <DialogPrimitive.Close
                      className={tw(
                        'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                        'bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600',
                        'border border-gray-300 dark:border-transparent',
                        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                      )}
                    >
                      Cancel
                    </DialogPrimitive.Close>
                  )}
                  {actionElement({
                    className: tw(
                      'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                      'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600',
                      'border border-transparent',
                      'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                      'cursor-pointer',
                    ),
                  })}
                </div>
              </form>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
