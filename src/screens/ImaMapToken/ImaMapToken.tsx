import Card from '@/components/Card/Card';
import Stepper from '@/components/Stepper/Stepper';
import Field from '@/elements/Field/Field';
import { NiceAddress } from '@/elements/NiceAddress';
import { ABI } from '@/features/network/abi/abi';
import { CONTRACT } from '@/features/network/contract';
import { useExplorer } from '@/features/network/hooks';
import { NETWORK, TOKEN_STANDARD } from '@/features/network/literals';
import ImaConnectToken from '@/screens/ImaConnectToken/ImaConnectToken';
import Prelay from '@/screens/Prelay';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { tw } from 'twind';

import { Tabs } from '@/components/Tabs/Tabs';
import { useTokenManager } from '@/features/bridge';
import * as addresses from '@/features/network/address';
import { CaretLeftIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useContract, useNetwork, useProvider, useQuery } from 'wagmi';

import imaAbi from '@/features/network/abi/abi-ima.union';
import { useQueries } from '@tanstack/react-query';

const wildcardAddresses = Object.values(addresses).map((x) => x.toLowerCase());

function liteEncodeAbiFunctions(abi) {
  return abi
    .filter((a) => a.type === 'function')
    .map((i) => `${i.name};${i.inputs?.length};${i.outputs?.length}`);
}

const wildcardLiteEncodedAbis = Object.entries(CONTRACT)
  .filter(([id, c]) => c.network === NETWORK.SKALE)
  .map(([id, c]) => ABI[id])
  .concat([])
  .map((oneAbi) => {
    return liteEncodeAbiFunctions(oneAbi);
  });

const SubmitButtonPair = ({
  stepPrev,
  stepNext,
  text = 'Submit',
}: {
  stepPrev?: () => void;
  stepNext?: () => void;
  text?: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {stepPrev && (
        <button
          className="btn btn-outline"
          onClick={(e) => {
            e.preventDefault();
            stepPrev();
          }}
        >
          <CaretLeftIcon />
        </button>
      )}
      <button className="btn" type="submit">
        {text}
      </button>
    </div>
  );
};

export default function ImaMapToken() {
  const { chainName } = useParams();
  const [searchParam] = useSearchParams();

  const provider = useProvider();

  const standard = (
    searchParam.get('standard') || ''
  ).toUpperCase() as keyof typeof TOKEN_STANDARD;
  const key = `${standard}OnChain_abi` as const;
  const tokenAbi = imaAbi[key];

  const { chain: targetChain, chains } = useNetwork();
  const originChain = chains.find((c) => c.name === chainName);
  const originIsForeign = originChain?.network !== NETWORK.SKALE;

  const [originTokens] = useExplorer(
    [
      {
        module: 'contract',
        action: 'listcontracts',
        args: {
          page: '1',
          offset: '100',
          filter: 'verified',
        },
      },
    ],
    {
      enabled: Boolean(originChain),
      chainId: originChain?.id,
    },
  );

  const { contract: tokenManager, address: tokenManagerAddress } =
    useTokenManager({
      standard,
    });

  const originTokensFiltered: { address: string; name: string }[] =
    originTokens.isSuccess && originTokens?.data?.result
      ? originTokens.data.result
          .filter((c) => {
            const matchable = liteEncodeAbiFunctions(JSON.parse(c['ABI']));
            const abiMatches = wildcardLiteEncodedAbis.some((wildcard) => {
              const foundInWildcard = matchable.filter((func) =>
                wildcard.includes(func),
              ).length;
              const ratio = foundInWildcard / wildcard.length;
              return ratio > 0.9;
            });
            return (
              !abiMatches &&
              !wildcardAddresses.includes(c.Address.toLowerCase())
            );
          })
          .map((c: { Address: string; ContractName: string }) => ({
            address: c.Address,
            name: c.ContractName,
          }))
      : [];

  type OriginTokenData = {
    originContractAddress: string;
  };
  type CloneTokenPreData = {
    name: string;
    symbol: string;
    decimals: number;
  };
  type CloneTokenData = {
    cloneContractAddress: string;
  };
  type PermissionData = {
    tokenManagerRoleAddress: string;
  };

  const form = [
    useForm<OriginTokenData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        originContractAddress: '',
      },
    }),
    useForm<CloneTokenData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        cloneContractAddress: '',
      },
    }),
    useForm<CloneTokenPreData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        name: '',
        symbol: '',
        decimals: 18,
      },
    }),
    useForm<PermissionData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        tokenManagerRoleAddress: tokenManagerAddress,
      },
    }),
  ] as const;

  const cloneContractAddress = form[1].watch('cloneContractAddress');

  const clonedContractForRoles = useContract({
    abi: tokenAbi as (typeof imaAbi)['ERC20OnChain_abi'],
    address: form[1].getFieldState('cloneContractAddress').invalid
      ? ''
      : cloneContractAddress,
    signerOrProvider: provider,
  });

  const roleHashesQuery = useQueries({
    queries: [
      {
        enabled: !!clonedContractForRoles?.address,
        queryKey: [
          `CUSTOM:${clonedContractForRoles?.address}`,
          'role',
          'MINTER_ROLE',
        ],
        queryFn: async () => {
          return clonedContractForRoles?.MINTER_ROLE
            ? await clonedContractForRoles?.MINTER_ROLE?.()
            : '';
        },
      },
      {
        enabled: !!clonedContractForRoles?.address,
        queryKey: [
          `CUSTOM:${clonedContractForRoles?.address}`,
          'role',
          'BURNER_ROLE',
        ],
        queryFn: async () => {
          return clonedContractForRoles?.BURNER_ROLE
            ? await clonedContractForRoles?.BURNER_ROLE?.()
            : '';
        },
      },
    ],
  });

  const clonedContractInfo = useQuery({
    enabled: !!clonedContractForRoles,
    queryKey: [`CUSTOM:${clonedContractForRoles?.address}`, 'constuctor_data'],
    queryFn: async () => {
      const symbol = await clonedContractForRoles?.symbol();
      const name = await clonedContractForRoles?.name();
      const decimals = await clonedContractForRoles?.decimals();
      return {
        symbol,
        name,
        decimals,
      };
    },
  });

  const MINTER_ROLE = roleHashesQuery.data?.[0];
  const BURNER_ROLE = roleHashesQuery.data?.[1];

  console.log(
    'clonedContractData',
    clonedContractInfo,
    MINTER_ROLE,
    BURNER_ROLE,
  );

  const steps: Parameters<typeof Stepper>[0]['steps'] = standard
    ? [
        {
          id: 'select-origin',
          label: `Select ${originIsForeign ? 'ethereum' : 'origin'} token`,
          content: ({ stepNext, stepPrev }) => (
            <FormProvider {...form[0]}>
              <form
                onSubmit={form[0].handleSubmit(
                  (data) => {
                    stepNext();
                  },
                  (err) => {},
                )}
              >
                <p className="font-medium pb-4">Available tokens on origin:</p>
                <div className="flex flex-col h-32 overflow-auto ">
                  {originTokens.isFetching || originTokens.isLoading ? (
                    <Prelay>
                      <span className="animate-bounce px-2">ʕ￫ᴥ￩ʔ</span>{' '}
                      Holdon... Bera fetching alot of tokens!
                    </Prelay>
                  ) : (
                    [...originTokensFiltered].map((token) => (
                      <button
                        key={token.address}
                        className={tw(
                          'p-2 rounded-lg transition-all delay-75 mx-2',
                          token.address ===
                            form[0].watch('originContractAddress')
                            ? 'bg-[var(--slate1)]'
                            : 'hover:bg-[var(--slate)]',
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          form[0].setValue(
                            'originContractAddress',
                            token.address,
                          );
                        }}
                      >
                        <NiceAddress
                          address={token.address}
                          label={token.name}
                        />
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
                <SubmitButtonPair stepNext={stepNext} text="Next" />
              </form>
            </FormProvider>
          ),
        },
        {
          id: 'select-target',
          label: `Select clone token`,
          content: ({ stepNext, stepPrev }) => (
            <Tabs
              defaultValue="deployed"
              tabs={[
                {
                  id: 'deployed',
                  title: 'Deployed',
                  description: `The contract is already deployed on ${targetChain?.name}`,
                  content: (
                    <FormProvider {...form[1]}>
                      <form
                        onSubmit={form[1].handleSubmit(
                          (data) => {
                            stepNext();
                          },
                          (err) => {},
                        )}
                      >
                        <div className="bg-[var(--slate1)] rounded-lg px-4 py-2 my-4 text-sm">
                          The pre-deployed contract section is for contracts
                          that are already deployed on the target chain. Simply
                          put in your address and confirm the action.
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
                              clonedContractInfo.isLoading
                                ? 'animate-pulse'
                                : ''
                            }
                          >
                            <label htmlFor="">Contract symbol</label>
                            <p className="input-like">
                              {clonedContractInfo.data?.symbol}
                            </p>
                          </fieldset>
                          <fieldset
                            className={
                              clonedContractInfo.isLoading
                                ? 'animate-pulse'
                                : ''
                            }
                          >
                            <label htmlFor="">Contract name</label>
                            <p className="input-like">
                              {clonedContractInfo?.data?.name}
                            </p>
                          </fieldset>
                          <fieldset
                            className={
                              clonedContractInfo.isLoading
                                ? 'animate-pulse'
                                : ''
                            }
                          >
                            <label htmlFor="">Number of decimals</label>
                            <p
                              className="input-like"
                              contentEditable="false"
                              aria-readonly={true}
                            >
                              {clonedContractInfo.data?.decimals}
                            </p>
                          </fieldset>
                        </div>
                        {!(
                          roleHashesQuery[0].isError ||
                          roleHashesQuery[1].isError ||
                          MINTER_ROLE === '' ||
                          BURNER_ROLE === ''
                        ) &&
                          clonedContractForRoles?.address && (
                            <p className="text-sm">
                              <span className="text-[var(--red10)]">
                                <ExclamationTriangleIcon />
                              </span>{' '}
                              Be sure to use Open zeppelin access control
                            </p>
                          )}
                        <SubmitButtonPair
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
                    <FormProvider {...form[2]}>
                      <form
                        onSubmit={form[2].handleSubmit(
                          (data) => {
                            //@todo impl deploy default contract, then enable following with returned address
                            // form[1].setValue('cloneContractAddress', addres);
                            stepNext();
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
                          <SubmitButtonPair
                            text="Deploy Contract"
                            stepPrev={stepPrev}
                            stepNext={stepNext}
                          />
                        </div>
                      </form>
                    </FormProvider>
                  ),
                },
              ]}
            ></Tabs>
          ),
        },
        {
          id: 'set-permissions',
          label: `Set permissions`,
          content: ({ stepPrev, stepNext }) => (
            <FormProvider {...form[3]}>
              <form
                onSubmit={form[2].handleSubmit(
                  async (data) => {
                    false &&
                      MINTER_ROLE &&
                      (await clonedContractForRoles?.grantRole(
                        MINTER_ROLE,
                        tokenManagerAddress,
                      ));
                    false &&
                      BURNER_ROLE &&
                      (await clonedContractForRoles?.grantRole(
                        BURNER_ROLE,
                        tokenManagerAddress,
                      ));
                    stepNext();
                  },
                  (err) => {},
                )}
              >
                <div className="w-2/3 m-auto flex h-full flex-col justify-center items-center">
                  <Card
                    tooltip="Burn & Mint permissions to cloned token"
                    heading={
                      <div className="flex justify-between items-center">
                        <h4 className="inline">Authorize Token Manager</h4>{' '}
                        <span
                          className={`text-sm text-[var(${
                            true ? '--gray10' : '--green10'
                          })]`}
                        >
                          Not assigned to token manager
                        </span>
                      </div>
                    }
                    className="bg-[var(--slate1)] w-full"
                  >
                    <p className="text-sm text-[var(--blue10)]">
                      Please assign minter and burner roles to the TokenManager{' '}
                    </p>
                    <div className="grid grid-cols-[1fr_max-content] mt-4 gap-4">
                      <Field<PermissionData>
                        control={() => <input type="text"></input>}
                        name="tokenManagerRoleAddress"
                        label="TokenManager Address"
                        placeholder="0x..."
                        required={`Fill address for relevant token manager on ${targetChain?.name}`}
                        pattern={{
                          value: /^0x[a-fA-F0-9]{40}$/,
                          message: 'Address is invalid',
                        }}
                      />
                      <div className="my-6 flex flex-row">
                        <button
                          className="btn btn-outline py-3"
                          onClick={(e) => e.preventDefault()}
                        >
                          Re-assign roles
                        </button>
                      </div>
                    </div>
                  </Card>
                  <SubmitButtonPair
                    text="Next"
                    stepPrev={stepPrev}
                    stepNext={stepNext}
                  />
                </div>
              </form>
            </FormProvider>
          ),
        },
        {
          id: 'map-token',
          label: `Confirm mapping`,
          content: ({ stepPrev, stepNext }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
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
                <SubmitButtonPair
                  text="Confirm"
                  stepPrev={stepPrev}
                  stepNext={stepNext}
                />
              </div>
            </form>
          ),
        },
      ]
    : [];

  return standard ? (
    <div className="grid h-full w-full rounded-lg bg-[var(--white)]">
      <Card full heading={`Add ${standard} with ${chainName}`}>
        <Stepper
          steps={steps}
          className="h-full grid grid-rows-[max-content_1fr]"
          bodyClass="flex flex-col h-full w-5/6 m-auto flex-wrap"
        />
      </Card>
    </div>
  ) : (
    <ImaConnectToken />
  );
}
