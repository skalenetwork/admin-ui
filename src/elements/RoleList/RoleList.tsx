import Hoverover from '@/components/Hoverover/Hoverover';
import { RoleIcon } from '@/components/Icons/Icons';
import {
  useSContractReads,
  useSContractRoles,
  useSContracts,
} from '@/features/network/hooks';
import { ACRONYMS } from '@/features/network/literals';
import { CONTRACT, ContractId } from '@/features/network/manifest';
import { CheckIcon, CircleIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Address, useAccount, useNetwork } from 'wagmi';
import { snakeToSentenceCase } from '../../utils';

type Props = {};

const RoleQuickView = ({ id }: { id: ContractId }) => {
  const account = useAccount();
  const { name: contractName } = CONTRACT[id];
  const { data, isLoading } = useSContractRoles(id);
  const puppeteerRoleHash = useSContractReads('MARIONETTE', {
    reads: [
      {
        name: 'PUPPETEER_ROLE',
      },
    ],
  });
  console.log('puppy', puppeteerRoleHash);
  const isMultisigPuppeteer = useSContractReads('MARIONETTE', {
    enabled: puppeteerRoleHash.isSuccess,
    reads: [
      {
        name: 'hasRole',
        args: [
          puppeteerRoleHash.data as Address,
          CONTRACT.MULTISIG_WALLET.address,
        ],
      },
    ],
  });
  const isSignerMultisigOwner = useSContractReads('MULTISIG_WALLET', {
    enabled: !!account.address,
    reads: [
      {
        name: 'isOwner',
        args: [account.address],
      },
    ],
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
              {isLoading ? (
                '?'
              ) : signer === true ? (
                <CheckIcon className="text-[var(--green11)]" />
              ) : isSignerMultisigOwner &&
                isMultisigPuppeteer &&
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
  const allContracts = useSContracts({
    id: Object.keys(CONTRACT),
  });
  const { chain } = useNetwork();

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
