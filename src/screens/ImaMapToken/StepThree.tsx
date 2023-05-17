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
import { CheckCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
import { FormProvider } from 'react-hook-form';

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
                <span className="text-sm">
                  {tmHasMinterRole.isLoading || tmHasBurnerRole.isLoading ? (
                    <span className="text-[var(--gray10)] mx-2 w-6 h-6 flex items-center justify-center rounded-full bg-[var(--white)]">
                      <MinusCircledIcon className="animate-spin" />
                    </span>
                  ) : !tmHasBurnerRole.data || !tmHasMinterRole.data ? (
                    'Not assigned to token manager'
                  ) : (
                    <span className="text-[var(--green10)] mx-2 w-6 h-6 flex items-center justify-center rounded-full bg-[var(--white)]">
                      <CheckCircledIcon />
                    </span>
                  )}
                </span>
              </div>
            }
          >
            {tmHasMinterRole.isLoading || tmHasBurnerRole.isLoading ? (
              <></>
            ) : tmHasBurnerRole.data && tmHasMinterRole.data ? (
              <span className="text-sm">
                Minting and burning permissions are set correctly
              </span>
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
                        await grantMinterRole.writeAsync?.(true);
                        await grantBurnerRole.writeAsync?.(true);
                      }}
                    >
                      {grantBurnerRoleConfirmed.isIdle &&
                      grantMinterRoleConfirmed.isIdle
                        ? `Re-assign roles`
                        : `Reassigning roles...`}
                    </button>
                  </div>
                </div>
              </>
            )}
          </Card>
          {((!burnerRole.isLoading && !BURNER_ROLE) ||
            (!minterRole.isLoading && !MINTER_ROLE) ||
            grantBurnerRoleConfirmed.isError ||
            grantBurnerRole.isError ||
            grantMinterRoleConfirmed.isError ||
            grantMinterRole.isError) && (
            <ErrorMessage
              errors={[
                (minterRole.isError || burnerRole.isError) &&
                  `Could not fetch contract access information`,
                (!BURNER_ROLE || !BURNER_ROLE) &&
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
                    minterRole.refetch();
                    burnerRole.refetch();
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
