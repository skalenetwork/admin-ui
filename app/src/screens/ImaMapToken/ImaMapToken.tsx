import ImaConnectToken from '@/app/screens/ImaConnectToken/ImaConnectToken';
import { useMapTokenContext } from '@/app/screens/ImaMapToken/hooks';
import { StepComplete } from '@/app/screens/ImaMapToken/StepComplete';
import { StepFourMainnet } from '@/app/screens/ImaMapToken/StepFourMainnet';
import { StepLast } from '@/app/screens/ImaMapToken/StepLast';
import { StepOne } from '@/app/screens/ImaMapToken/StepOne';
import { StepThree } from '@/app/screens/ImaMapToken/StepThree';
import { StepTwo } from '@/app/screens/ImaMapToken/StepTwo';
import { useTokenManager } from '@skalenetwork/feat/bridge';
import { NETWORK, StandardName } from '@skalenetwork/feat/network/literals';
import Card from '@skalenetwork/ux/components/Card/Card';
import Stepper from '@skalenetwork/ux/components/Stepper/Stepper';
import { withErrorBoundary } from '@skalenetwork/ux/elements/ErrorBoundary/ErrorBoundary';
import { useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { Address, useNetwork } from 'wagmi';
import {
  CloneTokenData,
  CloneTokenPreData,
  ImaMapTokenContext,
  OriginTokenData,
  PermissionData,
  useWatchValidField,
} from './context';

export function ImaMapToken() {
  const { chain: activeChain, chains } = useNetwork();

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

  const { contract: tokenManager } = useTokenManager({
    standard,
    network: originChain?.network,
  });

  // form start

  const form = {
    originToken: useForm<OriginTokenData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        originContractAddress: '',
      },
    }),
    cloneToken: useForm<CloneTokenData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        cloneContractAddress: '',
      },
    }),
    cloneTokenInit: useForm<CloneTokenPreData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        name: '',
        symbol: '',
        cloneContractAddress: '',
      },
    }),
    permission: useForm<PermissionData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        tokenManagerRoleAddress: tokenManager?.address,
      },
    }),
  } as const;

  const alreadyCloneTokenAddress = useWatchValidField(
    form.cloneToken,
    'cloneContractAddress',
  );
  const deployedCloneTokenAddress = useWatchValidField(
    form.cloneTokenInit,
    'cloneContractAddress',
  );

  // form end

  const steps: Parameters<typeof Stepper>[0]['steps'] = standard
    ? [
        {
          id: 'select-origin',
          label: `Select ${originIsForeign ? 'ethereum' : 'origin'} token`,
          content: ({ stepNext, stepPrev }) => (
            <StepOne stepNext={stepNext} stepPrev={stepPrev} />
          ),
        },
        {
          id: 'select-target',
          label: `Select clone token`,
          content: ({ stepNext, stepPrev }) => (
            <StepTwo stepNext={stepNext} stepPrev={stepPrev} />
          ),
        },
        {
          id: 'set-permissions',
          label: `Set permissions`,
          content: ({ stepPrev, stepNext }) => (
            <StepThree stepPrev={stepPrev} stepNext={stepNext} />
          ),
        },
        {
          id: 'map-token',
          label: `Confirm mapping`,
          content: ({ stepPrev, stepNext, markComplete }) => (
            <StepLast
              stepPrev={stepPrev}
              stepNext={stepNext}
              markComplete={markComplete}
            />
          ),
        },
      ]
    : [];

  const mainnetStep: Parameters<typeof Stepper>[0]['steps'][number] = {
    id: 'register-ethereum',
    label: `Register on ${originChain?.name}`,
    content: ({ stepPrev, stepNext }) => (
      <StepFourMainnet stepPrev={stepPrev} stepNext={stepNext} />
    ),
  };

  const cloneTokenAddress = (deployedCloneTokenAddress ||
    alreadyCloneTokenAddress) as Address;

  return standard ? (
    <ImaMapTokenContext.Provider
      value={{
        standard,
        originChain,
        targetChain,
        cloneTokenAddress,
        forms: form,
      }}
    >
      <div className="grid h-full w-full rounded-lg bg-[var(--white)]">
        <Card full heading={`Add ${standard} with ${chainName}`}>
          <Stepper
            steps={
              !originIsForeign
                ? steps
                : [...steps.slice(0, 3), mainnetStep, ...steps.slice(3)]
            }
            completeElement={<StepComplete />}
            className="h-full grid grid-rows-[max-content_1fr]"
            bodyClass="flex flex-col h-full w-5/6 m-auto flex-wrap"
          />
        </Card>
      </div>
    </ImaMapTokenContext.Provider>
  ) : (
    <ImaConnectToken />
  );
}

export default withErrorBoundary(ImaMapToken);
