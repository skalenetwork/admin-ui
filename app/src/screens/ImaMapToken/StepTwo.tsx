import {
  CloneTokenData,
  CloneTokenPreData,
  useImaMapTokenContext,
  useWatchValidField,
} from '@/app/screens/ImaMapToken/context';
import { ErrorMessage } from '@/app/screens/ImaMapToken/ErrorMessage';
import { SubmitButtonPair } from '@/app/screens/ImaMapToken/SubmitButtonPair';
import erc1155Standard from '@/features/network/abi/erc1155-standard';
import erc721Standard from '@/features/network/abi/erc721-standard';
import { CheckCircledIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useSTokenMintBurnAccess } from '@skalenetwork/feat/bridge';
import { useSTokenDeploy } from '@skalenetwork/feat/control/hooks';
import { StandardKey, StandardName } from '@skalenetwork/feat/network/literals';
import { Tabs } from '@skalenetwork/ux/components/Tabs/Tabs';
import Field from '@skalenetwork/ux/elements/Field/Field';
import { SButton } from '@skalenetwork/ux/elements/SButton/SButton';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Address, useContractRead, useContractReads, useToken } from 'wagmi';

const useTokenErrors = ({
  contractInfo,
  mintable,
  burnable,
}: {
  contractInfo: ReturnType<typeof useToken>;
  mintable: boolean;
  burnable: boolean;
}) => {
  return Boolean(contractInfo.isLoading)
    ? []
    : Boolean(contractInfo.isError)
    ? ['Address does not belong to a contract.']
    : (!mintable || !burnable) && contractInfo.isSuccess
    ? [
        <>
          Contract is not using required Open zeppelin access control:{' '}
          {!mintable ? <Cross2Icon /> : <CheckIcon />} Mintable |{' '}
          {!burnable ? <Cross2Icon /> : <CheckIcon />} Burnable
        </>,
      ]
    : [];
};

const AlreadyDeployedForm = (props: {
  stepNext: () => void;
  stepPrev: () => void;
}) => {
  const { stepPrev, stepNext } = props;
  const { forms, targetChain, standard } = useImaMapTokenContext();
  const form = forms.cloneToken;

  const tokenAddress = useWatchValidField(
    form,
    'cloneContractAddress',
  ) as Address;

  const standardName = standard?.toLowerCase() as Exclude<StandardName, 'eth'>;
  const { BURNER_ROLE, MINTER_ROLE } = useSTokenMintBurnAccess({
    chainId: targetChain?.id,
    standardName,
    tokenAddress,
  });

  const targetContractInfos = useStandardToken(standard, {
    address: tokenAddress,
    chainId: targetChain?.id,
  });
  const targetContractInfo = targetContractInfos[standardName];

  const errors = useTokenErrors({
    mintable: !!MINTER_ROLE,
    burnable: !!BURNER_ROLE,
    contractInfo: targetContractInfo,
  });

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
        <div className="bg-[var(--slate1)] rounded-lg px-4 py-2 my-4 text-sm">
          The pre-deployed contract section is for contracts that are already
          deployed on the target chain. Simply put in your address and confirm
          the action.
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
            showResetter
          />
          {standardName !== 'erc1155' && (
            <>
              <fieldset
                className={targetContractInfo.isFetching ? 'animate-pulse' : ''}
              >
                <label htmlFor="">Contract symbol</label>
                <p className="input-like">{targetContractInfo.data?.symbol}</p>
              </fieldset>
              <fieldset
                className={targetContractInfo.isFetching ? 'animate-pulse' : ''}
              >
                <label htmlFor="">Contract name</label>
                <p className="input-like">{targetContractInfo?.data?.name}</p>
              </fieldset>
            </>
          )}
          {standardName === 'erc20' ? (
            <fieldset
              className={targetContractInfo.isFetching ? 'animate-pulse' : ''}
            >
              <label htmlFor="">Number of decimals</label>
              <p className="input-like" aria-readonly={true}>
                {targetContractInfo.data?.decimals}
              </p>
            </fieldset>
          ) : standardName === 'erc1155' ? (
            <fieldset
              className={targetContractInfo.isFetching ? 'animate-pulse' : ''}
            >
              <label htmlFor="">URI</label>
              <p className="input-like" aria-readonly={true}>
                {targetContractInfo.data?.uri}
              </p>
            </fieldset>
          ) : (
            <></>
          )}
        </div>
        <ErrorMessage errors={errors} />
        <SubmitButtonPair
          isReady={
            targetContractInfo.isSuccess && !!(MINTER_ROLE && BURNER_ROLE)
          }
          text="Next"
          stepPrev={stepPrev}
          stepNext={stepNext}
        />
      </form>
    </FormProvider>
  );
};

const useStandardToken = (
  standard: Exclude<StandardKey, 'ETH'> | undefined,
  { address, chainId }: { address: Address; chainId?: number },
) => {
  const erc20 = useToken({
    enabled: standard === 'ERC20',
    address,
    chainId,
  });

  const erc721 = useContractReads({
    enabled: standard === 'ERC721' || standard === 'ERC721_WITH_METADATA',
    contracts: [
      {
        abi: erc721Standard['abi'],
        address,
        functionName: 'name',
        chainId,
      },
      {
        abi: erc721Standard['abi'],
        address,
        functionName: 'symbol',
        chainId,
      },
    ],
  });

  const erc1155 = useContractRead({
    enabled: standard === 'ERC1155',
    abi: erc1155Standard['abi'],
    address,
    functionName: 'uri',
    chainId,
  });

  const erc721Data = {
    name: erc721.data?.[0],
    symbol: erc721.data?.[1],
  };

  const dataset = {
    erc20: erc20,
    erc721: {
      ...erc721,
      data: erc721Data,
    },
    erc721_with_metadata: {
      ...erc721,
      data: erc721Data,
    },
    erc1155: {
      ...erc1155,
      data: {
        uri: erc1155.data,
      },
    },
  };

  return dataset;
};

const StandardDeployForm = (props: {
  stepNext: () => void;
  stepPrev: () => void;
}) => {
  const { stepPrev, stepNext } = props;
  const { forms, originChain, standard } = useImaMapTokenContext();
  const form = forms.cloneTokenInit;

  const standardName = standard?.toLowerCase() as Exclude<StandardName, 'eth'>;

  const tokenAddress = useWatchValidField(
    forms.originToken,
    'originContractAddress',
  );

  const originContractInfos = useStandardToken(standard, {
    address: tokenAddress as Address,
    chainId: originChain?.id,
  });

  const originContractInfo = originContractInfos[standardName];

  useEffect(() => {
    if (form.formState.isSubmitted || !form.register) {
      return;
    }
    if (standard !== 'ERC1155') {
      form.register('name', {
        required: true,
      });
      form.register('symbol', {
        required: true,
      });
    }
    if (standard === 'ERC1155' || standard === 'ERC721_WITH_METADATA') {
      form.register('uri', {
        required: true,
      });
    }
    form.register('cloneContractAddress', {
      required: true,
      pattern: {
        value: /^0x[a-fA-F0-9]{40}$/,
        message: 'Address is invalid',
      },
    });
  }, [form.register]);

  useEffect(() => {
    const { data } = originContractInfo;
    if (form.formState.isSubmitted) {
      return;
    }
    if (!data) {
      form.resetField('name');
      form.resetField('symbol');
      form.resetField('uri');
      return;
    }
    const { name, symbol, uri } = data;

    const cloneSymbol = !symbol?.length
      ? undefined
      : symbol[0] === 'w'
      ? symbol.slice(1).toUpperCase()
      : symbol;

    const cloneName = !name?.length
      ? undefined
      : name
          .split(' ')
          .filter((w) => w.toLowerCase() !== 'wrapped')
          .join(' ');

    cloneSymbol && form.setValue('symbol', cloneSymbol);
    cloneName && form.setValue('name', cloneName);
    uri && form.setValue('uri', uri);
    form.trigger('symbol');
    form.trigger('name');
    form.trigger('uri');
  }, [originContractInfo.isSuccess]);

  const { name, symbol, uri } = form.watch();
  const decimals = originContractInfo.data?.decimals;
  const deployment = useSTokenDeploy(standardName, {
    name,
    symbol,
    decimals,
    uri,
  });

  const { isDirty } = form.getFieldState(
    'cloneContractAddress',
    form.formState,
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(
          async (data) => {
            stepNext();
          },
          (err) => {},
        )}
      >
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-4 m-auto">
          {standardName !== 'erc1155' && (
            <>
              <fieldset
                className={originContractInfo.isLoading ? 'animate-pulse' : ''}
              >
                <label htmlFor="">Contract symbol</label>
                <p className="input-like">{symbol}</p>
              </fieldset>
              <fieldset>
                <label htmlFor="">Contract name</label>
                <p className="input-like">{name}</p>
              </fieldset>
            </>
          )}
          {standardName === 'erc20' ? (
            <fieldset>
              <label htmlFor="">Contract decimals</label>
              <p className="input-like" aria-readonly={true}>
                {decimals}
              </p>
            </fieldset>
          ) : standardName === 'erc1155' ||
            standardName === 'erc721_with_metadata' ? (
            <Field<CloneTokenPreData>
              control={() => <input type="text"></input>}
              name="uri"
              label="Base URI"
              placeholder="ipfs://"
              required={`Initial URI is required, it can be changed later`}
            />
          ) : (
            <></>
          )}
          <fieldset
            className={deployment.deploy?.isLoading ? 'animate-pulse' : ''}
          >
            <label htmlFor="">Deployed contract address</label>
            <p className="input-like">{form.watch('cloneContractAddress')}</p>
          </fieldset>
        </div>
        <div className="h-full w-1/2 m-auto">
          {deployment.deploy?.isError ? (
            <ErrorMessage
              errors={[
                <>
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
                </>,
              ]}
            />
          ) : (
            <></>
          )}
          {deployment.deploy?.isSuccess ? (
            <p className="text-sm py-4 max-w-full">
              <span className="text-[var(--green10)] align-middle">
                <CheckCircledIcon />
              </span>{' '}
              Contract successfully deployed at{' '}
              <code className="inline-block">
                {deployment.deploy?.data?.address}
              </code>
            </p>
          ) : (
            <></>
          )}
          <div className="text-center">
            {deployment.deploy?.writeAsync && !isDirty && (
              <SButton
                className="btn mx-auto mt-4 rounded-full"
                writer={deployment.deploy}
                onPromise={(promise) => {
                  promise.then((contract) => {
                    form.setValue('cloneContractAddress', contract.address);
                    form.trigger('cloneContractAddress');
                  });
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Deploy Contract
              </SButton>
            )}
          </div>
          <div>
            <SubmitButtonPair
              isReady={form.formState.isValid}
              text="Next"
              stepPrev={stepPrev}
              stepNext={stepNext}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export const StepTwo = (props: {
  stepNext: () => void;
  stepPrev: () => void;
}) => {
  const { stepNext, stepPrev } = props;
  const { targetChain } = useImaMapTokenContext();

  return (
    <Tabs
      defaultValue="deployed"
      tabs={[
        {
          id: 'deployed',
          title: 'Deployed',
          description: `The contract is already deployed on ${targetChain?.name}`,
          content: (
            <AlreadyDeployedForm stepPrev={stepPrev} stepNext={stepNext} />
          ),
        },
        {
          id: 'deploy-default',
          title: 'Default',
          description: 'I want to deploy the default contract',
          content: (
            <StandardDeployForm stepPrev={stepPrev} stepNext={stepNext} />
          ),
        },
      ]}
    ></Tabs>
  );
};
