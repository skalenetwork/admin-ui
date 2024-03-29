import { useImaMapTokenContext } from '@/app/screens/ImaMapToken/context';
import { ErrorMessage } from '@/app/screens/ImaMapToken/ErrorMessage';
import { SubmitButtonPair } from '@/app/screens/ImaMapToken/SubmitButtonPair';
import { useSTokenRegistration } from '@skalenetwork/feat/bridge';
import { StandardName } from '@skalenetwork/feat/network/literals';
import { Address } from 'abitype';
import { useEffect } from 'react';

export const StepLast = (props: {
  stepNext: () => void;
  stepPrev: () => void;
  markComplete: () => void;
}) => {
  const { stepPrev, markComplete } = props;
  const { forms, originChain, targetChain, standard, cloneTokenAddress } =
    useImaMapTokenContext();
  const standardName = standard?.toLowerCase() as StandardName;

  const originForm = forms.originToken;
  const originContractAddress = originForm.watch('originContractAddress');

  const { registerOnSchain } = useSTokenRegistration({
    enabled: originForm.formState.isValid,
    chainId: targetChain?.id,
    originChainId: originChain?.id,
    standardName,
    tokenAddress: cloneTokenAddress as Address,
    originTokenAddress: originContractAddress as Address,
  });

  useEffect(() => {
    registerOnSchain.isErrorOnPrepare &&
      console.log(
        'registerOnSchain: Error on Prepare',
        registerOnSchain.errorOnPrepare,
        registerOnSchain,
      );
  }, [registerOnSchain.isErrorOnPrepare]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await registerOnSchain.writeAsync?.(true);
        Object.values(forms).forEach((f) => f.reset());
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
          <input type="text" readOnly value={originContractAddress} />
        </fieldset>
        <fieldset className="w-full">
          <label htmlFor="" className="text-xs">
            Target token on{' '}
            <span className="font-semibold">{targetChain?.name}</span>
          </label>
          <input type="text" readOnly value={cloneTokenAddress} />
        </fieldset>
        {registerOnSchain.isError && (
          <ErrorMessage
            errors={[
              <>
                Could not register the mapped token -{' '}
                {registerOnSchain.error?.message} :{' '}
                {registerOnSchain.error?.error?.message}
              </>,
              <button
                className="underline"
                onClick={(e) => {
                  e.preventDefault();
                  registerOnSchain.reset?.();
                }}
              >
                Reset to try again
              </button>,
            ]}
          />
        )}
        <SubmitButtonPair
          isReady={!!registerOnSchain.writeAsync}
          isLoading={registerOnSchain.isLoading}
          text="Confirm"
          stepPrev={stepPrev}
        />
      </div>
    </form>
  );
};
