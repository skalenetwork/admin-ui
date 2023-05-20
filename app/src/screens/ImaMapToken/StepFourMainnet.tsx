import { useImaMapTokenContext } from '@/app/screens/ImaMapToken/context';
import { SubmitButtonPair } from '@/app/screens/ImaMapToken/SubmitButtonPair';
import { useSTokenRegistration } from '@skalenetwork/feat/bridge';
import { StandardName } from '@skalenetwork/feat/network/literals';
import { Address, useSwitchNetwork } from 'wagmi';

export const StepFourMainnet = (props: {
  stepNext: () => void;
  stepPrev: () => void;
}) => {
  const { stepNext, stepPrev } = props;

  const { chain: activeChain, chains } = useNetwork();

  const { originChain, targetChain, standard, tokenAddress } =
    useImaMapTokenContext();
  const standardName = standard?.toLowerCase() as StandardName;

  const { registerOnForeignChain } = useSTokenRegistration({
    chainId: targetChain?.id,
    originChainId: originChain?.id,
    standardName,
    tokenAddress: tokenAddress as Address,
    originTokenAddress: forms[0].watch('originContractAddress') as Address,
    enabled: forms[0].formState.isValid,
  });

  const handleOrigin = useSwitchNetwork({ chainId: originChain?.id });
  const handleTarget = useSwitchNetwork({ chainId: targetChain?.id });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await handleOrigin.switchNetworkAsync?.();
          await new Promise((resolve, reject) =>
            window.setTimeout(() => resolve(0), 4000),
          );
          await registerOnForeignChain.writeAsync?.();
        } catch (e) {
          console.error('tokenManagerApi tokenByOwner', e);
          // @todo abort here
        }
        await handleTarget.switchNetworkAsync?.();
        stepNext();
      }}
    >
      <div className="w-1/2 m-auto flex h-full flex-col justify-center gap-4">
        <p className="font-medium">
          Register {standard} token on {originChain?.name}:
        </p>
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
        {activeChain?.id !== targetChain?.id && (
          <p className="text-sm">
            Registration is a round trip from {originChain?.name}, you have
            started it. <br />
            <br />
            <span className="text-[var(--yellow11)] animate-pulse">
              <ExclamationTriangleIcon />
            </span>{' '}
            Do not navigate. Approve pending actions from your wallet.
          </p>
        )}
        <SubmitButtonPair
          isReady={registerOnForeignChain.isSuccess}
          text="Confirm"
          stepPrev={async () => {
            await handleTarget.switchNetworkAsync?.();
            stepPrev();
          }}
          stepNext={stepNext}
        />
      </div>
    </form>
  );
};
