import Card from '@/components/Card/Card';
import Stepper from '@/components/Stepper/Stepper';
import { Tabs } from '@/components/Tabs/Tabs';
import Field from '@/elements/Field/Field';
import { NiceAddress } from '@/elements/NiceAddress/NiceAddress';
import { useTokenManager } from '@/features/bridge';
import { ABI } from '@/features/network/abi/abi';
import * as addresses from '@/features/network/address';
import { CONTRACT } from '@/features/network/contract';
import { useExplorer, useSContractWrite } from '@/features/network/hooks';
import { NETWORK, TOKEN_STANDARD } from '@/features/network/literals';
import ImaConnectToken from '@/screens/ImaConnectToken/ImaConnectToken';
import Prelay from '@/screens/Prelay';
import {
  CaretLeftIcon,
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { getContract } from '@wagmi/core';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { tw } from 'twind';
import {
  Address,
  useContract,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useSigner,
  useSwitchNetwork,
  useToken,
  useWaitForTransaction,
} from 'wagmi';

import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';
import { useSTokenDeploy } from '@/features/control/hooks';
import imaAbi from '@/features/network/abi/abi-ima.union';
import { useQueries, useQuery } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { useEffect, useMemo } from 'react';

const wildcardAddresses = Object.values(addresses).map((x) => x.toLowerCase());

function liteEncodeAbiFunctions(abi: Abi) {
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
  isReady = false,
  isLoading = false,
}: {
  isReady: boolean;
  isLoading?: boolean;
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
      <button
        className={tw('btn', isLoading ? 'loading' : '')}
        type="submit"
        disabled={!isReady || isLoading}
      >
        {text}
      </button>
    </div>
  );
};

type Token = { address: string; name: string };

const supportsInterfaceAbi = [
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

type StandardName =
  (typeof TOKEN_STANDARD)[keyof typeof TOKEN_STANDARD]['name'];
type StandardKey = Uppercase<StandardName>;

const INTERFACE_ID = {
  [TOKEN_STANDARD.ERC20.name]: '0x36372b07',
  [TOKEN_STANDARD.ERC721.name]: '0x80ac58cd',
  [TOKEN_STANDARD.ERC721_WITH_METADATA.name]: '0x5b5e139f',
  [TOKEN_STANDARD.ERC1155.name]: '0xd9b67a26',
};

function getStandardTokenInterfaceId(standardName: keyof typeof INTERFACE_ID) {
  return INTERFACE_ID[standardName] as Address;
}

const OZ_ROLE_FRAGMENT = {
  inputs: [],
  outputs: [
    {
      internalType: 'bytes32',
      name: '',
      type: 'bytes32',
    },
  ],
  stateMutability: 'view',
  type: 'function',
};

function getStandardTokenAbi(name: StandardKey) {
  const key = `${name}OnChain_abi` as const;
  let abi = imaAbi[key];
  if (!abi.some((f) => f.name === 'MINTER_ROLE')) {
    abi.push({
      name: 'MINTER_ROLE',
      ...OZ_ROLE_FRAGMENT,
    });
  }
  if (!abi.some((f) => f.name === 'BURNER_ROLE')) {
    abi.push({
      name: 'BURNER_ROLE',
      ...OZ_ROLE_FRAGMENT,
    });
  }
  return abi;
}

export function useMapTokenContext<S extends StandardName>({
  targetChainId,
  originChainId,
  standardName,
}: {
  targetChainId?: number;
  originChainId?: number;
  standardName: S;
}) {
  const { chains } = useNetwork();
  const originChain = originChainId
    ? chains.find((chain) => chain.id === originChainId)
    : undefined;
  const targetChain = targetChainId
    ? chains.find((chain) => chain.id === targetChainId)
    : undefined;

  if (!(originChain && targetChain && standardName)) {
    return {};
  }

  const standard = standardName && (standardName.toUpperCase() as StandardKey);
  const standardInterfaceId = getStandardTokenInterfaceId(standardName);

  return {
    standard,
    standardInterfaceId,
    originChain,
    targetChain,
  };
}

/**
 * Fetch token details for contracts on ethereum mainnet
 * @param param0
 * @returns
 */
export function useEthereumTokens({
  enabled,
  count = 50,
}: {
  enabled?: boolean;
  count?: number;
}) {
  return useQuery({
    enabled: enabled !== undefined ? enabled : true,
    queryKey: ['custom', 'ethereumTokens', 'name,address', count],
    initialData: () => [],
    queryFn: async () => {
      return fetch('https://tokens.coingecko.com/ethereum/all.json')
        .then((res) => res.json())
        .then((result: { tokens: Token[] }) => {
          return result.tokens.slice(0, count).map((token) => ({
            name: token.name,
            address: token.address,
          }));
        });
    },
  });
}

type CommonTokenAbi = (typeof imaAbi)['ERC20OnChain_abi'];

/**
 * Use and modify access control of SChain token mintability and burnability
 * @param param0
 * @returns
 */
export function useSTokenMintBurnAccess({
  chainId,
  originChainId,
  standardName,
  tokenAddress,
}: {
  chainId?: number;
  originChainId?: number;
  standardName: StandardName;
  tokenAddress?: Address;
}) {
  const standard = standardName && (standardName.toUpperCase() as StandardKey);

  const { chain: activeChain, chains } = useNetwork();
  const { data: signer } = useSigner();
  const provider = useProvider({ chainId });
  const originChain = chains.find((chain) => chain.id === originChainId);
  const signerOrProvider = activeChain?.id === chainId ? signer : provider;

  const tokenAbi = useMemo(() => {
    return standard && getStandardTokenAbi(standard);
  }, [standard]);

  const targetContract = useContract({
    abi: tokenAbi as CommonTokenAbi,
    address: tokenAddress,
    signerOrProvider,
  });

  // `network` allows selecting either token_manager or deposit_box
  const { contract: originTokenManager } = useTokenManager({
    standard,
    network: originChain?.network,
  });

  const roleHashesQuery = useQueries({
    queries: [
      {
        enabled: !!targetContract?.address,
        queryKey: ['custom', targetContract?.address, 'role', 'MINTER_ROLE'],
        queryFn: async () => {
          if (!targetContract?.MINTER_ROLE) {
            throw Error('Cloned token role check is misconfigured');
          }
          return await targetContract?.MINTER_ROLE();
        },
      },
      {
        enabled: !!targetContract?.address,
        queryKey: ['custom', targetContract?.address, 'role', 'BURNER_ROLE'],
        queryFn: async () => {
          if (!targetContract?.BURNER_ROLE) {
            throw Error('Cloned token role check is misconfigured');
          }
          return await targetContract?.BURNER_ROLE();
        },
      },
    ],
  });

  const MINTER_ROLE = roleHashesQuery[0].data;
  const BURNER_ROLE = roleHashesQuery[1].data;

  const tmHasMinterRole = useQuery({
    enabled: !!(MINTER_ROLE && originTokenManager),
    queryFn: async () => {
      return targetContract?.hasRole
        ? targetContract.hasRole(
            MINTER_ROLE as Address,
            originTokenManager?.address as Address,
          )
        : false;
    },
  });

  const tmHasBurnerRole = useQuery({
    enabled: !!(BURNER_ROLE && originTokenManager),
    queryFn: async () => {
      return targetContract?.hasRole
        ? targetContract.hasRole(
            BURNER_ROLE as Address,
            originTokenManager?.address as Address,
          )
        : false;
    },
  });

  const { config: grantMinterRoleConfig } = usePrepareContractWrite({
    enabled: !!(tokenAddress && MINTER_ROLE && originTokenManager?.address),
    address: tokenAddress,
    abi: tokenAbi as CommonTokenAbi,
    functionName: 'grantRole',
    args: [MINTER_ROLE as Address, originTokenManager?.address as Address],
  });
  const grantMinterRole = useContractWrite(grantMinterRoleConfig);
  const grantMinterRoleConfirmed = useWaitForTransaction({
    hash: grantMinterRole.data?.hash,
    onSuccess: () => {
      tmHasMinterRole.refetch();
    },
  });

  const { config: grantBurnerRoleConfig } = usePrepareContractWrite({
    enabled: !!(tokenAddress && BURNER_ROLE && originTokenManager?.address),
    address: tokenAddress,
    abi: tokenAbi as CommonTokenAbi,
    functionName: 'grantRole',
    args: [BURNER_ROLE as Address, originTokenManager?.address as Address],
  });
  const grantBurnerRole = useContractWrite(grantBurnerRoleConfig);
  const grantBurnerRoleConfirmed = useWaitForTransaction({
    hash: grantBurnerRole.data?.hash,
    onSuccess: () => {
      tmHasBurnerRole.refetch();
    },
  });

  return {
    MINTER_ROLE,
    BURNER_ROLE,
    hasAccessControl: MINTER_ROLE && BURNER_ROLE,
    isMinterOriginTM: tmHasMinterRole,
    isBurnerOriginTM: tmHasBurnerRole,
    grantMinterRoleToOriginTM: {
      ...grantMinterRole,
      confirmed: grantMinterRoleConfirmed,
    },
    grantBurnerRoleToOriginTM: {
      ...grantBurnerRole,
      confirmed: grantBurnerRoleConfirmed,
    },
  };
}

/**
 * Use final registration of cloned tokens with token manager and deposit box
 * @param param0
 * @returns
 */
export function useSTokenRegistration({
  chainId,
  originChainId,
  standardName,
  tokenAddress,
  originTokenAddress,
  enabled,
}: {
  chainId?: number;
  originChainId?: number;
  standardName: StandardName;
  tokenAddress?: Address;
  originTokenAddress?: Address;
  enabled?: boolean;
}) {
  const _enabled = enabled === undefined ? true : !!enabled;
  const standard = standardName && (standardName.toUpperCase() as StandardKey);

  const { chains } = useNetwork();
  const targetChain = chains.find((chain) => chain.id === chainId);
  const originChain = chains.find((chain) => chain.id === originChainId);

  const mode =
    originChain === undefined
      ? undefined
      : originChain.network === NETWORK.SKALE
      ? 's2s'
      : 'f2s';

  const registerOnForeignChain = useSContractWrite(`DEPOSIT_BOX_${standard}`, {
    enabled:
      _enabled && !!(targetChain && originTokenAddress && mode === 'f2s'),
    name: `add${standard}TokenByOwner`,
    args: [targetChain?.name, originTokenAddress],
  });

  const registerOnSchain = useSContractWrite(
    `TOKEN_MANAGER_${standard as StandardKey}`,
    {
      enabled:
        _enabled && !!(originChain && originTokenAddress && tokenAddress),
      name: `add${standard}TokenByOwner`,
      args: [
        originChain?.network === NETWORK.ETHEREUM
          ? 'Mainnet'
          : originChain?.name,
        originTokenAddress,
        tokenAddress,
      ],
    },
  );

  return {
    mode,
    registerOnForeignChain,
    registerOnSchain,
  };
}

/**
 * Extract SChain deployed tokens with network metadata
 * @param param0
 * @returns
 */
export function useSchainTokens({
  chainId,
  standardName,
}: {
  chainId?: number;
  standardName: StandardName;
}) {
  const { chains } = useNetwork();
  const chain = chainId
    ? chains.find(
        (chain) => chain.id === chainId && chain.network === NETWORK.SKALE,
      )
    : undefined;
  const provider = useProvider({
    chainId: chain?.id,
  });

  const standardInterfaceId = getStandardTokenInterfaceId(standardName);

  const page = 1;
  const offset = 100;

  const [contractList] = useExplorer(
    [
      {
        module: 'contract',
        action: 'listcontracts',
        args: {
          page: String(page),
          offset: String(offset),
          filter: 'verified',
        },
      },
    ],
    {
      enabled: !!chain,
      chainId: chain?.id,
    },
  );

  const standard = standardName && (standardName.toUpperCase() as StandardKey);

  const { contract: tokenManager } = useTokenManager({
    standard,
    network: chain?.network,
  });

  const enabled = !!(chain?.id && standard && tokenManager?.contract);

  const tokens = useQueries({
    queries: (contractList?.data?.result || []).map((c) => ({
      enabled,
      queryKey: ['custom', chain?.id, 'contractlistItemExt', c.Address],
      queryFn: async () => {
        const abi = JSON.parse(c['ABI']);
        const matchable = liteEncodeAbiFunctions(abi);
        const abiMatches = wildcardLiteEncodedAbis.some((wildcard) => {
          const foundInWildcard = matchable.filter((func) =>
            wildcard.includes(func),
          ).length;
          const ratio = foundInWildcard / wildcard.length;
          return ratio > 0.9;
        });
        const isPredeployed =
          abiMatches ||
          wildcardAddresses.some(
            (a) => a.toLowerCase() === c.Address.toLowerCase(),
          );

        const fetchIsClone = tokenManager?.contract?.addedClones(c.Address) as
          | undefined
          | Promise<boolean | undefined>;
        const contract = getContract({
          address: c.Address,
          abi: supportsInterfaceAbi,
          signerOrProvider: provider,
        });
        const fetchIsStandard = !standardInterfaceId
          ? true
          : isPredeployed
          ? false
          : contract.supportsInterface(standardInterfaceId);
        const fetchName = contract.name();
        return Promise.allSettled([
          fetchIsClone,
          fetchIsStandard,
          fetchName,
        ]).then(([isClone, isStandard, name]) => {
          return {
            address: c.Address,
            name: name.status === 'fulfilled' ? name.value : c.ContractName,
            supportsInterface:
              isStandard.status === 'fulfilled'
                ? isStandard.value
                : standard === 'ERC20',
            isClone: isClone.status === 'fulfilled' && isClone.value,
            isPredeployed,
          };
        });
      },
    })),
  });

  return {
    isLoading: enabled && tokens.some((ot) => ot.isLoading),
    data: tokens,
  };
}

export function ImaMapToken() {
  const { chain: activeChain, chains } = useNetwork();
  const { data: signer } = useSigner();

  const { chainName } = useParams();
  const [searchParam] = useSearchParams();
  const originChainId = chains.find((c) => c.name === chainName)?.id;

  const standardName = searchParam.get('standard') as StandardName;

  const { standard, targetChain, originChain } = useMapTokenContext({
    standardName,
    targetChainId: Number(searchParam.get('t')),
    originChainId: originChainId,
  });
  const originIsForeign = originChain?.network !== NETWORK.SKALE;

  const handleOrigin = useSwitchNetwork({ chainId: originChain?.id });
  const handleTarget = useSwitchNetwork({ chainId: targetChain?.id });

  const { contract: tokenManager } = useTokenManager({
    standard,
    network: originChain?.network,
  });

  const { data: originTokens, isLoading: isOriginTokensLoading } =
    useSchainTokens({
      chainId: originChain?.id,
      standardName,
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

  // form start

  type OriginTokenData = {
    originContractAddress: Address;
  };
  type CloneTokenPreData = {
    name: string;
    symbol: string;
    decimals: number;
  };
  type CloneTokenData = {
    cloneContractAddress: Address;
  };
  type PermissionData = {
    tokenManagerRoleAddress: Address;
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
        tokenManagerRoleAddress: tokenManager?.address,
      },
    }),
  ] as const;

  const originContractAddress = form[0].watch('originContractAddress');
  const cloneContractAddress = form[1].watch('cloneContractAddress');
  const cloneContractAddressIsValid = !form[1].getFieldState(
    'cloneContractAddress',
  ).invalid;
  const tokenAddress = useMemo(() => {
    return cloneContractAddressIsValid ? cloneContractAddress : '';
  }, [cloneContractAddressIsValid]);

  // form end

  const targetContractInfo = useToken({
    address: tokenAddress,
  });

  const {
    BURNER_ROLE,
    MINTER_ROLE,
    grantBurnerRoleToOriginTM: grantBurnerRole,
    grantMinterRoleToOriginTM: grantMinterRole,
    isBurnerOriginTM: tmHasBurnerRole,
    isMinterOriginTM: tmHasMinterRole,
  } = useSTokenMintBurnAccess({
    chainId: targetChain?.id,
    standardName,
    tokenAddress,
  });
  const grantMinterRoleConfirmed = grantMinterRole.confirmed;
  const grantBurnerRoleConfirmed = grantBurnerRole.confirmed;

  const { name, symbol, decimals } = form[2].watch();

  const deployment = useSTokenDeploy({
    name,
    symbol,
    decimals: BigNumber.from(decimals),
    standard: 'erc20',
  });

  useEffect(() => {
    deployment.deploy?.isSuccess &&
      form[1].setValue(
        'cloneContractAddress',
        deployment.deploy?.data?.address,
      );
  }, [deployment.deploy?.isSuccess]);

  const { registerOnSchain, registerOnForeignChain } = useSTokenRegistration({
    chainId: targetChain?.id,
    originChainId: originChain?.id,
    standardName,
    tokenAddress: tokenAddress as Address,
    originTokenAddress: originContractAddress as Address,
    enabled: form[0].formState.isValid,
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
                <p className="font-medium pb-4">
                  Available tokens on origin:{' '}
                  {tokensFiltered.isLoading
                    ? 'ʕ￫ᴥ￩ʔ'
                    : tokensFiltered.data.length}
                </p>
                <div className="flex flex-col h-36 overflow-auto ">
                  {tokensFiltered.isFetching || tokensFiltered.isLoading ? (
                    <Prelay>
                      <span className="animate-bounce px-2">ʕ￫ᴥ￩ʔ</span>{' '}
                      Holdon... Fetching the tokens that can be cloned!
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
                          form[0].trigger('originContractAddress');
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
                <SubmitButtonPair
                  isReady={form[0].formState.isValid}
                  stepNext={stepNext}
                  text="Next"
                />
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
                              targetContractInfo.isFetching
                                ? 'animate-pulse'
                                : ''
                            }
                          >
                            <label htmlFor="">Contract symbol</label>
                            <p className="input-like">
                              {targetContractInfo.data?.symbol}
                            </p>
                          </fieldset>
                          <fieldset
                            className={
                              targetContractInfo.isFetching
                                ? 'animate-pulse'
                                : ''
                            }
                          >
                            <label htmlFor="">Contract name</label>
                            <p className="input-like">
                              {targetContractInfo?.data?.name}
                            </p>
                          </fieldset>
                          <fieldset
                            className={
                              targetContractInfo.isFetching
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
                    <FormProvider {...form[2]}>
                      <form
                        onSubmit={form[2].handleSubmit(
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
                                form[2].formState.isValid &&
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
                    className="!bg-[var(--slate1)] w-full"
                    tooltip="Burn & Mint permissions to cloned token"
                    heading={
                      <div className="flex justify-between items-center">
                        <h4 className="inline">Authorize Token Manager</h4> {}
                        <span
                          className={tw`text-sm text-[var(${
                            !tmHasBurnerRole.data || !tmHasMinterRole.data
                              ? '--gray10'
                              : '--green10'
                          })]`}
                        >
                          {!tmHasBurnerRole.data || !tmHasMinterRole.data ? (
                            'Not assigned to token manager'
                          ) : (
                            <CheckCircledIcon />
                          )}
                        </span>
                      </div>
                    }
                  >
                    {tmHasBurnerRole.data && tmHasMinterRole.data ? (
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
                              disabled={
                                !MINTER_ROLE ||
                                !BURNER_ROLE ||
                                !grantBurnerRoleConfirmed.isIdle ||
                                !grantMinterRoleConfirmed.isIdle ||
                                !(
                                  !tmHasMinterRole.data &&
                                  grantMinterRole.writeAsync
                                ) ||
                                !(
                                  !tmHasBurnerRole.data &&
                                  grantBurnerRole.writeAsync
                                )
                              }
                              className="btn btn-outline py-3"
                              onClick={async (e) => {
                                e.preventDefault();
                                await grantMinterRole.write?.();
                                await grantBurnerRole.write?.();
                              }}
                            >
                              {grantBurnerRoleConfirmed.isIdle ||
                              grantMinterRoleConfirmed.isIdle
                                ? `Re-assign roles`
                                : `Reassigning roles...`}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </Card>
                  {grantBurnerRoleConfirmed.isError ||
                  grantBurnerRole.isError ||
                  grantMinterRoleConfirmed.isError ||
                  grantMinterRole.isError ? (
                    <p className="text-sm py-4">
                      <span className="text-[var(--red10)]">
                        <ExclamationTriangleIcon />
                      </span>{' '}
                      {(grantBurnerRoleConfirmed.isError ||
                        grantBurnerRole.isError) &&
                        `Failed to grant burner role - ${
                          grantBurnerRole.error?.message ||
                          grantBurnerRoleConfirmed.error?.message ||
                          ''
                        }`}
                      <br></br>
                      {(grantMinterRoleConfirmed.isError ||
                        grantMinterRole.isError) &&
                        `Failed to grant minter role - ${
                          grantMinterRole.error?.message ||
                          grantMinterRoleConfirmed.error?.message ||
                          ''
                        }`}
                      <br></br>
                      <button
                        className="underline"
                        onClick={(e) => {
                          e.preventDefault();
                          grantMinterRole.reset();
                          grantBurnerRole.reset();
                        }}
                      >
                        Reset to try again
                      </button>
                    </p>
                  ) : (
                    <></>
                  )}
                  <SubmitButtonPair
                    isReady={Boolean(
                      tmHasBurnerRole.data && tmHasMinterRole.data,
                    )}
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
          content: ({ stepPrev, stepNext, markComplete }) => (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await registerOnSchain.writeAsync?.(true);
                form.forEach((f) => f.reset());
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
          ),
        },
      ]
    : [];

  const mainnetStep: Parameters<typeof Stepper>[0]['steps'][number] = {
    id: 'register-ethereum',
    label: `Register on ${originChain?.name}`,
    content: ({ stepPrev, stepNext }) => (
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
          completeElement={
            <div className="w-1/2 m-auto flex h-full flex-col justify-center gap-4">
              <h3 className="text-[#B16F0A] text-center">
                You have finished mapping your token!
              </h3>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Link className="btn text-center w-64" to="/ima_manager">
                  Map another token
                </Link>
                <Link
                  className="btn text-center w-64"
                  to="/ima_manager/connect"
                >
                  Connect a new chain
                </Link>
                <Link className="btn text-center w-64" to="/">
                  Go to dashboard
                </Link>
              </div>
            </div>
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

export default withErrorBoundary(ImaMapToken);
