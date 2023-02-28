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
import {
  CaretLeftIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import {
  Address,
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
  useSwitchNetwork,
} from 'wagmi';

import imaAbi from '@/features/network/abi/abi-ima.union';
import { useQueries, useQuery } from '@tanstack/react-query';

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

type Token = { address: string; name: string };

export default function ImaMapToken() {
  const { chainName } = useParams();
  const [searchParam] = useSearchParams();

  const { chain: activeChain, chains } = useNetwork();
  const account = useAccount();

  const targetChainId = Number(searchParam.get('t'));
  const targetChain = chains.find((c) => c.id === targetChainId);

  const { data: signer } = useSigner();
  const targetChainProvider = useProvider({ chainId: targetChainId });

  const standard = (
    searchParam.get('standard') || ''
  ).toUpperCase() as keyof typeof TOKEN_STANDARD;
  const key = `${standard}OnChain_abi` as const;
  const tokenAbi = imaAbi[key];

  const originChain = chains.find((c) => c.name === chainName);
  const originIsForeign = originChain?.network !== NETWORK.SKALE;

  const handleOrigin = useSwitchNetwork({ chainId: originChain?.id });
  const handleTarget = useSwitchNetwork({ chainId: targetChain?.id });

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

  const ethereumTokens = useQuery({
    enabled: originIsForeign,
    queryKey: ['CUSTOM:ethereumTokens', 'name,address', 75],
    initialData: () => [],
    queryFn: async () => {
      return fetch('https://tokens.coingecko.com/ethereum/all.json')
        .then((res) => res.json())
        .then((result: { tokens: Token[] }) => {
          return result.tokens.slice(0, 75).map((token) => ({
            name: token.name,
            address: token.address,
          }));
        });
    },
  });

  const { api: tokenManagerApi, contract: tokenManager } = useTokenManager({
    standard,
    network: originChain?.network,
  });

  const originTokensFiltered: Token[] =
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

  const tokensFiltered = originIsForeign
    ? ethereumTokens
    : { ...originTokens, data: originTokensFiltered };

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
        tokenManagerRoleAddress: tokenManager.address,
      },
    }),
  ] as const;

  const cloneContractAddress = form[1].watch('cloneContractAddress');

  const clonedContractForRoles = useContract({
    abi: tokenAbi as (typeof imaAbi)['ERC20OnChain_abi'],
    address: form[1].getFieldState('cloneContractAddress').invalid
      ? ''
      : cloneContractAddress,
    signerOrProvider:
      activeChain?.id === targetChainId ? signer : targetChainProvider,
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

  const MINTER_ROLE = roleHashesQuery[0].data;
  const BURNER_ROLE = roleHashesQuery[1].data;

  const { data: tmHasMinterRole } = useQuery({
    enabled: Boolean(MINTER_ROLE && tokenManager),
    queryFn: async () => {
      return clonedContractForRoles?.hasRole
        ? clonedContractForRoles.hasRole(
            MINTER_ROLE as Address,
            tokenManager.address,
          )
        : false;
    },
  });

  const { data: tmHasBurnerRole } = useQuery({
    enabled: Boolean(BURNER_ROLE && tokenManager),
    queryFn: async () => {
      return clonedContractForRoles?.hasRole
        ? clonedContractForRoles.hasRole(
            BURNER_ROLE as Address,
            tokenManager.address,
          )
        : false;
    },
  });

  const clonedContractInfo = useQuery({
    enabled: !!clonedContractForRoles,
    queryKey: [`CUSTOM:${clonedContractForRoles?.address}`, 'constructor_data'],
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
                <div className="flex flex-col h-36 overflow-auto ">
                  {tokensFiltered.isFetching || tokensFiltered.isLoading ? (
                    <Prelay>
                      <span className="animate-bounce px-2">ʕ￫ᴥ￩ʔ</span>{' '}
                      Holdon... Bera fetching alot of tokens!
                    </Prelay>
                  ) : (
                    tokensFiltered.data.map((token) => (
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
                        {!Boolean(MINTER_ROLE && BURNER_ROLE) &&
                          clonedContractForRoles?.address && (
                            <p className="text-sm text-center">
                              <span className="text-[var(--red10)]">
                                <ExclamationTriangleIcon />
                              </span>{' '}
                              Contract is not using Open zeppelin access control{' '}
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
                        <h4 className="inline">Authorize Token Manager</h4> {}
                        <span
                          className={tw`text-sm text-[var(${
                            !tmHasBurnerRole || !tmHasMinterRole
                              ? '--gray10'
                              : '--green10'
                          })]`}
                        >
                          {!tmHasBurnerRole || !tmHasMinterRole ? (
                            'Not assigned to token manager'
                          ) : (
                            <CheckCircledIcon />
                          )}
                        </span>
                      </div>
                    }
                    className="bg-[var(--slate1)] w-full"
                  >
                    {tmHasBurnerRole && tmHasMinterRole ? (
                      <>Minting and burning permissions are set correctly</>
                    ) : (
                      <>
                        <p className="text-sm text-[var(--blue10)]">
                          Please assign minter and burner roles to the
                          TokenManager{' '}
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
                              onClick={async (e) => {
                                e.preventDefault();
                                MINTER_ROLE &&
                                  !tmHasMinterRole &&
                                  (await clonedContractForRoles?.grantRole(
                                    MINTER_ROLE,
                                    tokenManager.address,
                                  ));
                                BURNER_ROLE &&
                                  !tmHasBurnerRole &&
                                  (await clonedContractForRoles?.grantRole(
                                    BURNER_ROLE,
                                    tokenManager.address,
                                  ));
                              }}
                            >
                              Re-assign roles
                            </button>
                          </div>
                        </div>
                      </>
                    )}
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
              onSubmit={async (e) => {
                e.preventDefault();
                await tokenManagerApi.api?.addTokenByOwner(
                  originChain?.network === NETWORK.ETHEREUM
                    ? 'Mainnet'
                    : originChain?.name,
                  form[0].getValues('originContractAddress'),
                  form[1].getValues('cloneContractAddress'),
                  {
                    address: account.address,
                  },
                );
                stepNext();
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

  // @todo close
  const mainnetStep: Parameters<typeof Stepper>[0]['steps'][number] = {
    id: 'register-ethereum',
    label: `Register on ${originChain?.name}`,
    content: ({ stepPrev, stepNext }) => (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            // @todo split actions
            await handleOrigin.switchNetworkAsync?.();
            console.log('tokenManagerApi', tokenManagerApi);
            const addTokenByOwnerResponse =
              false &&
              (await tokenManagerApi.api?.addTokenByOwner(
                targetChain?.name,
                form[0].getValues('originContractAddress'),
                {
                  address: account.address,
                },
              ));
          } catch (e) {
            console.error('tokenManagerApi tokenByOwner', e);
            // handle error
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
              <br></br>
            </p>
          )}
          <SubmitButtonPair
            text="Confirm"
            stepPrev={async () => {
              await handleTarget.switchNetworkAsync?.();
              stepPrev();
            }}
            stepNext={stepNext}
          />
        </div>
      </form>
    ),
  };

  return standard ? (
    <div className="grid h-full w-full rounded-lg bg-[var(--white)]">
      <Card full heading={`Add ${standard} with ${chainName}`}>
        <Stepper
          steps={
            !originIsForeign
              ? steps
              : [...steps.slice(0, 3), mainnetStep, ...steps.slice(3)]
          }
          className="h-full grid grid-rows-[max-content_1fr]"
          bodyClass="flex flex-col h-full w-5/6 m-auto flex-wrap"
        />
      </Card>
    </div>
  ) : (
    <ImaConnectToken />
  );
}
