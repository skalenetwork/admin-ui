import { Tabs } from '@/components/Tabs/Tabs';
import Field from '@/elements/Field/Field';
import { useSTokenMintBurnAccess } from '@/features/bridge';
import { useSTokenDeploy } from '@/features/control/hooks';
import { StandardName } from '@/features/network/literals';
import {
  CloneTokenData,
  CloneTokenPreData,
  useImaMapTokenContext,
} from '@/screens/ImaMapToken/context';
import { SubmitButtonPair } from '@/screens/ImaMapToken/SubmitButtonPair';
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { BigNumber } from 'ethers';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useToken } from 'wagmi';

export const StepTwo = (props: {
  stepNext: () => void;
  stepPrev: () => void;
}) => {
  const { stepNext, stepPrev } = props;
  const { forms, targetChain, standard, tokenAddress } =
    useImaMapTokenContext();
  const standardName = standard?.toLowerCase() as StandardName;
  const { BURNER_ROLE, MINTER_ROLE } = useSTokenMintBurnAccess({
    chainId: targetChain?.id,
    standardName,
    tokenAddress,
  });
  const targetContractInfo = useToken({
    address: tokenAddress,
  });
  const { name, symbol, decimals } = forms[2].watch();
  const deployment = useSTokenDeploy({
    name,
    symbol,
    decimals: BigNumber.from(decimals),
    standard: 'erc20',
  });

  useEffect(() => {
    deployment.deploy?.isSuccess &&
      forms[1].setValue(
        'cloneContractAddress',
        deployment.deploy?.data?.address,
      );
  }, [deployment.deploy?.isSuccess]);

  return (
    <Tabs
      defaultValue="deployed"
      tabs={[
        {
          id: 'deployed',
          title: 'Deployed',
          description: `The contract is already deployed on ${targetChain?.name}`,
          content: (
            <FormProvider {...forms[1]}>
              <form
                onSubmit={forms[1].handleSubmit(
                  (data) => {
                    stepNext();
                  },
                  (err) => {},
                )}
              >
                <div className="bg-[var(--slate1)] rounded-lg px-4 py-2 my-4 text-sm">
                  The pre-deployed contract section is for contracts that are
                  already deployed on the target chain. Simply put in your
                  address and confirm the action.
                </div>
                <div className="grid grid-cols-2 grid-rows-2 h-full gap-4 m-auto">
                  <Field<CloneTokenData>
                    control={() => <input type="text"></input>}
                    name="cloneContractAddress"
                    label="Deployed Contract Address"
                    placeholder="0x..."
                    required={`Fill address for cloned token on ${targetChain?.name}`}
                    pattern={{
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: 'Address is invalid',
                    }}
                  />
                  <fieldset
                    className={
                      targetContractInfo.isFetching ? 'animate-pulse' : ''
                    }
                  >
                    <label htmlFor="">Contract symbol</label>
                    <p className="input-like">
                      {targetContractInfo.data?.symbol}
                    </p>
                  </fieldset>
                  <fieldset
                    className={
                      targetContractInfo.isFetching ? 'animate-pulse' : ''
                    }
                  >
                    <label htmlFor="">Contract name</label>
                    <p className="input-like">
                      {targetContractInfo?.data?.name}
                    </p>
                  </fieldset>
                  <fieldset
                    className={
                      targetContractInfo.isFetching ? 'animate-pulse' : ''
                    }
                  >
                    <label htmlFor="">Number of decimals</label>
                    <p
                      className="input-like"
                      contentEditable="false"
                      aria-readonly={true}
                    >
                      {targetContractInfo.data?.decimals}
                    </p>
                  </fieldset>
                </div>
                {Boolean(targetContractInfo.isLoading) ? (
                  <></>
                ) : Boolean(targetContractInfo.isError) ? (
                  <p className="text-sm text-center">
                    <span className="text-[var(--red10)]">
                      <ExclamationTriangleIcon />
                    </span>{' '}
                    Address does not belong to a contract.
                  </p>
                ) : (
                  !Boolean(MINTER_ROLE && BURNER_ROLE) &&
                  targetContractInfo.isSuccess && (
                    <p className="text-sm text-center">
                      <span className="text-[var(--red10)]">
                        <ExclamationTriangleIcon />
                      </span>{' '}
                      Contract is not using Open zeppelin access control{' '}
                    </p>
                  )
                )}
                <SubmitButtonPair
                  isReady={
                    targetContractInfo.isSuccess &&
                    !!(MINTER_ROLE && BURNER_ROLE) &&
                    !deployment.deploy?.isLoading
                  }
                  text="Next"
                  stepPrev={stepPrev}
                  stepNext={stepNext}
                />
              </form>
            </FormProvider>
          ),
        },
        {
          id: 'deploy-default',
          title: 'Default',
          description: 'I want to deploy the default contract',
          content: (
            <FormProvider {...forms[2]}>
              <form
                onSubmit={forms[2].handleSubmit(
                  async (data) => {
                    await deployment.deploy?.writeAsync?.();
                  },
                  (err) => {},
                )}
              >
                <div className="h-full w-1/2 m-auto">
                  <Field<CloneTokenPreData>
                    control={() => <input type="text"></input>}
                    name="name"
                    label="Contract name"
                    placeholder="Lilliana Coin"
                    required="Please provide a readable name for contract"
                  />
                  <Field<CloneTokenPreData>
                    control={() => <input type="text"></input>}
                    name="symbol"
                    label="Contract symbol"
                    placeholder="LLC"
                    required="Contract symbol is required"
                  />
                  <Field<CloneTokenPreData>
                    control={() => <input type="number"></input>}
                    name="decimals"
                    label="Contract decimals"
                    placeholder="18"
                    required="Contract decimals are required"
                  />
                  {deployment.deploy?.isError ? (
                    <p className="text-sm py-4 max-w-full">
                      <span className="text-[var(--red10)]">
                        <ExclamationTriangleIcon />
                      </span>{' '}
                      Could not deploy the token -{' '}
                      {deployment.deploy?.error?.reason}
                      <br />
                      <button
                        className="underline"
                        onClick={(e) => {
                          e.preventDefault();
                          deployment.deploy?.reset?.();
                        }}
                      >
                        Reset to try again
                      </button>
                    </p>
                  ) : (
                    <></>
                  )}
                  {deployment.deploy?.isSuccess ? (
                    <p className="text-sm py-4 max-w-full">
                      <span className="text-[var(--green10)] align-middle">
                        <CheckCircledIcon />
                      </span>{' '}
                      Contract successfully deployed at{' '}
                      <code>{deployment.deploy?.data?.address}</code>
                    </p>
                  ) : (
                    <></>
                  )}
                  <div>
                    <SubmitButtonPair
                      isReady={
                        forms[2].formState.isValid &&
                        !deployment.deploy?.isSuccess
                      }
                      isLoading={deployment.deploy?.isLoading}
                      text={
                        !deployment.deploy?.isSuccess
                          ? 'Deploy Contract'
                          : 'Deployed'
                      }
                      stepPrev={stepPrev}
                      stepNext={stepNext}
                    />
                    {deployment.deploy?.isSuccess && (
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.preventDefault();
                          // @todo enable only on step-level clearance
                          stepNext();
                        }}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </FormProvider>
          ),
        },
      ]}
    ></Tabs>
  );
};
