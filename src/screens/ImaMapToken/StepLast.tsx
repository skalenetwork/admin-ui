import { useSTokenRegistration } from '@/features/bridge';
import { useImaMapTokenContext } from '@/screens/ImaMapToken/context';

export const StepLast = (props: {
  stepNext: () => void;
  stepPrev: () => void;
  markComplete: () => void;
}) => {
  const { stepPrev } = props;
  const { forms, originChain, targetChain, standard, tokenAddress } =
    useImaMapTokenContext();

  const originForm = form[0];
  const originContractAddress = originForm.watch('originContractAddress');

  const { registerOnSchain } = useSTokenRegistration({
    chainId: targetChain?.id,
    originChainId: originChain?.id,
    standardName,
    tokenAddress: tokenAddress as Address,
    originTokenAddress: originContractAddress as Address,
    enabled: originForm.formState.isValid,
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await registerOnSchain.writeAsync?.(true);
        forms.forEach((f) => f.reset());
        markComplete();
      }}
    >
      <div className="w-1/2 m-auto flex h-full flex-col justify-center gap-4">
        <p className="font-medium">Confirm the mapping:</p>
        <fieldset className="w-full">
          <label htmlFor="" className="text-xs">
            Origin token on{' '}
            <span className="font-semibold">{originChain?.name}</span>
          </label>
          <input
            type="text"
            readOnly
            value={form[0].getValues('originContractAddress')}
          />
        </fieldset>
        <fieldset className="w-full">
          <label htmlFor="" className="text-xs">
            Target token on{' '}
            <span className="font-semibold">{targetChain?.name}</span>
          </label>
          <input
            type="text"
            readOnly
            value={form[1].getValues('cloneContractAddress')}
          />
        </fieldset>
        {registerOnSchain.isError ? (
          <p className="text-sm py-4">
            <span className="text-[var(--red10)]">
              <ExclamationTriangleIcon />
            </span>{' '}
            Could not register the mapped token -{' '}
            {registerOnSchain.error?.message} :{' '}
            {registerOnSchain.error?.error?.message}
            <br />
            <button
              className="underline"
              onClick={(e) => {
                e.preventDefault();
                registerOnSchain.reset?.();
              }}
            >
              Reset to try again
            </button>
          </p>
        ) : (
          <></>
        )}
        <SubmitButtonPair
          isReady={!!registerOnSchain.writeAsync}
          text="Confirm"
          stepPrev={stepPrev}
          stepNext={stepNext}
        />
      </div>
    </form>
  );
};
