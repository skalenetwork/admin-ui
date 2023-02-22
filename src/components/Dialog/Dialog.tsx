import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import React, { Fragment, PropsWithChildren, useState } from 'react';
import { tw } from 'twind';

type Footer = {
  actionElement: (props: { className?: string }) => JSX.Element;
  cancelElement?: (props: { className?: string }) => JSX.Element;
};

type Step = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  content: React.ReactNode;
} & Footer;

type Props = PropsWithChildren<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string | JSX.Element;
  description: string | JSX.Element;
  trigger: JSX.Element;
  steps: Step[];
  activeStep: number;
}>;

const Dialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  activeStep,
  steps,
}: Props) => {
  const [step, setStep] = useState(1);
  const cancelElClass = tw('btn btn-outline');
  const actionElClass = tw('btn btn-wide cursor-pointer');
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
            <DialogPrimitive.Content
              forceMount
              className={tw(
                'break-words',
                'fixed z-50',
                'flex flex-col justify-start first-letter:gap-4',
                'max-h-[96vh] w-max min-w-[600px] max-w-[80vw] rounded-lg',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'border bg-[var(--white)] text-[var(--black)]',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            >
              <div
                className={tw`flex flex-row items-center gap-12 border-b p-4`}
              >
                <DialogPrimitive.Title asChild>
                  <h4>{title}</h4>
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-sm font-normal text-[var(--gray10)]">
                  {description}
                </DialogPrimitive.Description>
                <DialogPrimitive.Close
                  className={tw(
                    'ml-auto inline-flex items-center justify-center rounded-full',
                    'focus:outline-none focus-visible:ring focus-visible:ring-[var(--primary)] focus-visible:ring-opacity-75',
                  )}
                >
                  <div className="text-[var(--gray10)]">
                    <Cross1Icon />
                  </div>
                </DialogPrimitive.Close>
              </div>
              {steps.map(
                (
                  { actionElement, cancelElement, onSubmit, content },
                  index,
                ) => (
                  <form
                    key={index}
                    onSubmit={onSubmit}
                    acceptCharset="utf-8"
                    className={tw(
                      'flex flex-grow flex-col overflow-auto',
                      index !== activeStep - 1
                        ? 'invisible h-0 overflow-hidden'
                        : '',
                    )}
                  >
                    <div className="scrollbar flex-grow overflow-auto p-8">
                      {content}
                    </div>
                    <div
                      className={tw`flex justify-center gap-8 border-t py-4`}
                    >
                      {cancelElement ? (
                        cancelElement({
                          className: cancelElClass,
                        })
                      ) : (
                        <DialogPrimitive.Close className={cancelElClass}>
                          Cancel
                        </DialogPrimitive.Close>
                      )}
                      {actionElement({
                        className: actionElClass,
                      })}
                    </div>
                  </form>
                ),
              )}
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
