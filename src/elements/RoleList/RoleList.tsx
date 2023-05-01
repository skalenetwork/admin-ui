import Hoverover from '@/components/Hoverover/Hoverover';
import { InfoIcon, RoleIcon } from '@/components/Icons/Icons';
import Tooltip from '@/components/Tooltip/Tooltip';
import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';
import { getSContractProp } from '@/features/network/contract';
import {
  useRolesAccess,
  useSContractRead,
  useSContracts,
} from '@/features/network/hooks';
import { ACRONYMS } from '@/features/network/literals';
import { CONTRACT, ContractId } from '@/features/network/manifest';
import {
  CheckIcon,
  CircleIcon,
  Cross2Icon,
  MinusCircledIcon,
} from '@radix-ui/react-icons';
import { Address, useAccount, useNetwork } from 'wagmi';
import { snakeToSentenceCase } from '../../utils';

type Props = {};

const RoleQuickView = ({ id }: { id: ContractId }) => {
  const contractName = getSContractProp(id, 'name');
  const { data, isLoading, isFetching } = useRolesAccess(id);

  return data.length === 0 ? (
    <></>
  ) : (
    <div className="my-2 min-w-[300px] rounded-lg bg-[var(--gray3)] p-4">
      <p className="font-semibold">{contractName}</p>
      {data.map &&
        data.map(
          (
            {
              name,
              isMultisigPuppeteer,
              isOwnerOfMultisig,
              allow: { mnm, eoa },
            },
            index,
          ) => (
            <div className="flex flex-row" key={index}>
              {snakeToSentenceCase(name, ACRONYMS)}{' '}
              <div className="ml-auto">
                {isLoading ? (
                  <MinusCircledIcon className="text-[var(--gray11)] animate-spin" />
                ) : eoa === true ? (
                  <CheckIcon className="text-[var(--green11)]" />
                ) : mnm === true ? (
                  <CircleIcon className="text-[var(--green11)]" />
                ) : (
                  <Cross2Icon className="text-[var(--red11)]" />
                )}
              </div>
            </div>
          ),
        )}
    </div>
  );
};

export function RoleList({}: Props) {
  const account = useAccount();
  const { chain } = useNetwork();
  const allContracts = useSContracts({
    id: Object.keys(CONTRACT).filter(
      (key) => !!CONTRACT[key].address,
    ) as ContractId[],
  });
  const filteredContracts = allContracts.filter(
    (contract) =>
      contract.abi && CONTRACT[contract.contractId].network === chain?.network,
  );
  const isOwnerOfMultisig = useSContractRead('MULTISIG_WALLET', {
    enabled: !!account.address,
    name: 'isOwner',
    args: [account.address as Address],
  });

  return (
    <Hoverover
      title="Chain Roles"
      trigger={<RoleIcon />}
      triggerClass="p-0 text-inherit"
    >
      <div className="absolute top-2 right-2">
        <Tooltip
          trigger={
            <div className="cursor-pointer transition-all hover:-translate-x-1">
              <InfoIcon color={'var(--gray8)'} />
            </div>
          }
          content={
            <>
              {isOwnerOfMultisig.data ? (
                <>
                  <CircleIcon className="text-[var(--green8)]" /> Multisig
                  ownership with role access via marionette.
                </>
              ) : (
                !isOwnerOfMultisig.isLoading && (
                  <span className="text-[var(--gray10)]">
                    You may have limited access to administrative functions.
                  </span>
                )
              )}
              <br />
              <CheckIcon className="text-[var(--green8)]" /> Direct access to
              role on target contract.
            </>
          }
        />
      </div>
      {filteredContracts.map((contract, index) => (
        <RoleQuickView id={contract.contractId} key={index} />
      ))}
    </Hoverover>
  );
}

export default withErrorBoundary(RoleList);
