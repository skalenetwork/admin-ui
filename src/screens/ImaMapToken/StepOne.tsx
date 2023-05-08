import Field from '@/elements/Field/Field';
import { NiceAddress } from '@/elements/NiceAddress/NiceAddress';
import { useSchainTokens } from '@/features/bridge';
import { StandardName } from '@/features/network/literals';
import {
  OriginTokenData,
  useImaMapTokenContext,
} from '@/screens/ImaMapToken/context';
import { SubmitButtonPair } from '@/screens/ImaMapToken/SubmitButtonPair';
import Prelay from '@/screens/Prelay';
import { FormProvider } from 'react-hook-form';
import { tw } from 'twind';

export const StepOne = (props: {
  stepNext: () => void;
  stepPrev: () => void;
}) => {
  const { stepNext } = props;
  const { forms, originChain, standard } = useImaMapTokenContext();
  const form = forms[0];

  const { data: originTokens, isLoading: isOriginTokensLoading } =
    useSchainTokens({
      chainId: originChain?.id,
      standardName: standard?.toLowerCase() as StandardName,
    });
  const isOriginTokensReady = originTokens && !isOriginTokensLoading;
  const originTokensFiltered = !isOriginTokensReady
    ? []
    : originTokens.filter((ot) => {
        return (
          ot.data?.supportsInterface &&
          !ot.data?.isClone &&
          !ot.data?.isPredeployed
        );
      });
  const tokensFiltered = {
    isLoading: !isOriginTokensReady,
    isFetching: !isOriginTokensReady,
    data: originTokensFiltered.map((ot) => ot.data),
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            stepNext();
          },
          (err) => {},
        )}
      >
        <p className="font-medium pb-4">
          Available tokens on origin:{' '}
          {tokensFiltered.isLoading ? 'ʕ￫ᴥ￩ʔ' : tokensFiltered.data.length}
        </p>
        <div className="flex flex-col h-36 overflow-auto ">
          {tokensFiltered.isFetching || tokensFiltered.isLoading ? (
            <Prelay>
              <span className="animate-bounce px-2">ʕ￫ᴥ￩ʔ</span> Holdon...
              Fetching the tokens that can be cloned!
            </Prelay>
          ) : (
            tokensFiltered.data.map((token) => (
              <button
                key={token.address}
                className={tw(
                  'p-2 rounded-lg transition-all delay-75 mx-2',
                  token.address === form.watch('originContractAddress')
                    ? 'bg-[var(--slate1)]'
                    : 'hover:bg-[var(--slate)]',
                )}
                onClick={(e) => {
                  e.preventDefault();
                  form.setValue('originContractAddress', token.address);
                  form.trigger('originContractAddress');
                }}
              >
                <NiceAddress address={token.address} label={token.name} />
              </button>
            ))
          )}
        </div>
        <div className="text-center py-4 flex flex-row justify-center items-center gap-4">
          <div className="bg-[var(--gray8)] w-1/6 h-[1px]"></div>
          <p className="font-semibold">OR</p>
          <div className="bg-[var(--gray8)] w-1/6 h-[1px]"></div>
        </div>
        <Field<OriginTokenData>
          className="w-1/2"
          control={() => <input type="text"></input>}
          name="originContractAddress"
          label="Contract Address"
          placeholder="0x..."
          required="Please provide the address for token on origin chain"
          pattern={{
            value: /^0x[a-fA-F0-9]{40}$/,
            message: 'Address is invalid',
          }}
        />
        <SubmitButtonPair
          isReady={form.formState.isValid}
          stepNext={stepNext}
          text="Next"
        />
      </form>
    </FormProvider>
  );
};
