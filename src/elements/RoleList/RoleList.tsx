import { CONTRACT } from '@/features/network/manifest';

import { RoleIcon } from '@/components/Icons/Icons';
import Popover from '@/components/Popover/Popover';
import { ACRONYMS } from '@/features/network/constants';
import { useTypedContracts } from '@/features/network/hooks';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useAccount } from 'wagmi';
import { snakeToSentenceCase } from '../../utils';

type Props = {};

export default function RoleList({}: Props) {
  const contracts = useTypedContracts({
    id: Object.keys(CONTRACT),
  });

  const account = useAccount();

  const contractRoles = contracts
    .filter((contract) => contract.abi)
    .map(({ contract, abi, contractId }) => ({
      contract,
      abi,
      contractId,
      contractName: CONTRACT[contractId].name,
      roles: (abi || [])
        .filter(
          ({ type, name }) => type === 'function' && name.includes('_ROLE'),
        )
        .map((fragment) => fragment.name),
    }));

  // useContractReads({
  //   contracts: [
  //     {
  //       abi: contractRoles[0].abi,
  //       address: CONTRACT[contractRoles[0].contractId],
  //       functionName: 'hasRole',
  //       args: [contractRoles[0].roles[0], account.address],
  //     },
  //   ],
  // });

  return (
    <Popover title="Chain Roles" trigger={<RoleIcon />}>
      {contractRoles.map(({ contractName, roles }, index) => (
        <div
          className="my-2 min-w-[300px] rounded-lg bg-[var(--gray3)] p-4"
          key={index}
        >
          <p className="font-semibold">{contractName}</p>
          {roles.map((role: string, index) => (
            <div className="flex flex-row" key={index}>
              {snakeToSentenceCase(role, ACRONYMS)}{' '}
              <div className="ml-auto">
                <CheckIcon className="text-[var(--green11)]" />
                <Cross2Icon className="text-[var(--red11)]" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </Popover>
  );
}
