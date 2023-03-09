import Hoverover from '@/components/Hoverover/Hoverover';
import { RoleIcon } from '@/components/Icons/Icons';
import { getSContractProp } from '@/features/network/contract';
import {
  useSContractRead,
  useSContractRoles,
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
  const account = useAccount();
  const contractName = getSContractProp(id, 'name');
  const { data, isLoading, isFetching } = useSContractRoles(id);
  const puppeteerRoleHash = useSContractRead('MARIONETTE', {
    name: 'PUPPETEER_ROLE',
  });
  const isMultisigPuppeteer = useSContractRead('MARIONETTE', {
    enabled: puppeteerRoleHash.isSuccess,
    name: 'hasRole',
    args: [puppeteerRoleHash.data as Address, CONTRACT.MULTISIG_WALLET.address],
  });
  const isSignerMultisigOwner = useSContractRead('MULTISIG_WALLET', {
    enabled: !!account.address,
    name: 'isOwner',
    args: [account.address as Address],
  });
  return data.length === 0 ? (
    <></>
  ) : (
    <div className="my-2 min-w-[300px] rounded-lg bg-[var(--gray3)] p-4">
      <p className="font-semibold">{contractName}</p>
      {data.map &&
        data.map(({ name, permissions: { marionette, signer } }, index) => (
          <div className="flex flex-row" key={index}>
            {snakeToSentenceCase(name, ACRONYMS)}{' '}
            <div className="ml-auto">
              {signer === undefined ||
              marionette === undefined ||
              isMultisigPuppeteer.isLoading ||
              isSignerMultisigOwner.isLoading ? (
                <MinusCircledIcon className="text-[var(--gray11)] animate-spin" />
              ) : signer === true ? (
                <CheckIcon className="text-[var(--green11)]" />
              ) : isSignerMultisigOwner.data === true &&
                isMultisigPuppeteer.data === true &&
                marionette === true ? (
                <CircleIcon className="text-[var(--green11)]" />
              ) : (
                <Cross2Icon className="text-[var(--red11)]" />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default function RoleList({}: Props) {
  const { chain } = useNetwork();
  const allContracts = useSContracts({
    id: Object.keys(CONTRACT) as ContractId[],
  });
  const filteredContracts = allContracts.filter(
    (contract) =>
      contract.abi && CONTRACT[contract.contractId].network === chain?.network,
  );

  return (
    <Hoverover title="Chain Roles" trigger={<RoleIcon />}>
      {filteredContracts.map((contract, index) => (
        <RoleQuickView id={contract.contractId} key={index} />
      ))}
    </Hoverover>
  );
}
