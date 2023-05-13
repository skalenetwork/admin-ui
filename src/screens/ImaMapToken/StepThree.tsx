import Card from '@/components/Card/Card';
import Field from '@/elements/Field/Field';
import { useSTokenMintBurnAccess } from '@/features/bridge';
import { StandardName } from '@/features/network/literals';
import {
  PermissionData,
  useImaMapTokenContext,
} from '@/screens/ImaMapToken/context';
import { ErrorMessage } from '@/screens/ImaMapToken/ErrorMessage';
import { SubmitButtonPair } from '@/screens/ImaMapToken/SubmitButtonPair';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { FormProvider } from 'react-hook-form';
import { tw } from 'twind';

export const StepThree = (props: {
  stepNext: () => void;
  stepPrev: () => void;
}) => {
  const { stepNext, stepPrev } = props;
  const { forms, targetChain, standard, cloneTokenAddress } =
    useImaMapTokenContext();
  const form = forms.permission;
  const standardName = standard?.toLowerCase() as StandardName;
  const {
    minterRole,
    burnerRole,
    BURNER_ROLE,
    MINTER_ROLE,
    grantBurnerRoleToOriginTM: grantBurnerRole,
    grantMinterRoleToOriginTM: grantMinterRole,
    isBurnerOriginTM: tmHasBurnerRole,
    isMinterOriginTM: tmHasMinterRole,
  } = useSTokenMintBurnAccess({
    chainId: targetChain?.id,
    standardName,
    tokenAddress: cloneTokenAddress,
  });
  const grantMinterRoleConfirmed = grantMinterRole.confirmed;
  const grantBurnerRoleConfirmed = grantBurnerRole.confirmed;

  const isRoleGrantingDisabled =
    (!minterRole.isLoading &&
      !burnerRole.isLoading &&
      (!MINTER_ROLE || !BURNER_ROLE)) ||
    !grantBurnerRoleConfirmed.isIdle ||
    !grantMinterRoleConfirmed.isIdle ||
    !(!tmHasMinterRole.data && grantMinterRole.writeAsync) ||
    !(!tmHasBurnerRole.data && grantBurnerRole.writeAsync);

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
                      disabled={isRoleGrantingDisabled}
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
          {(!MINTER_ROLE ||
            !BURNER_ROLE ||
            grantBurnerRoleConfirmed.isError ||
            grantBurnerRole.isError ||
            grantMinterRoleConfirmed.isError ||
            grantMinterRole.isError) && (
            <ErrorMessage
              errors={[
                (!BURNER_ROLE || !MINTER_ROLE) &&
                  `Contract does not seem to have OZ minter and burner roles`,
                (grantBurnerRoleConfirmed.isError || grantBurnerRole.isError) &&
                  `Failed to grant burner role - ${
                    grantBurnerRole.error?.message ||
                    grantBurnerRoleConfirmed.error?.message ||
                    ''
                  }`,
                (grantMinterRoleConfirmed.isError || grantMinterRole.isError) &&
                  `Failed to grant minter role - ${
                    grantMinterRole.error?.message ||
                    grantMinterRoleConfirmed.error?.message ||
                    ''
                  }`,
                <button
                  className="underline"
                  onClick={(e) => {
                    e.preventDefault();
                    grantMinterRole.reset();
                    grantBurnerRole.reset();
                  }}
                >
                  Reset to try again
                </button>,
              ]}
            />
          )}
          <SubmitButtonPair
            isReady={Boolean(tmHasBurnerRole.data && tmHasMinterRole.data)}
            text="Next"
            stepPrev={stepPrev}
            stepNext={stepNext}
          />
        </div>
      </form>
    </FormProvider>
  );
};
