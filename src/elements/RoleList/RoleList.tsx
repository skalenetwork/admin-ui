import { RoleIcon } from '@/components/Icons/Icons';
import Popover from '@/components/Popover/Popover';
import { ACRONYMS } from '@/features/network/constants';
import { useTypedContracts } from '@/features/network/hooks';
import { CONTRACT } from '@/features/network/manifest';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useQueries } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { snakeToSentenceCase } from '../../utils';

type Props = {};

const role = (roleString: string) => {
  const hash = ethers.utils.id(roleString);
  console.log(roleString, hash);
  return hash;
};

export default function RoleList({}: Props) {
  const contracts = useTypedContracts({
    id: Object.keys(CONTRACT),
  });

  const account = useAccount();

  const contractsWithRoles = contracts
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

  const allContractsWithRoles = useQueries({
    queries: contractsWithRoles.map((group) => {
      return {
        enabled: Boolean(group.contract),
        queryKey: [],
        queryFn: async () => {
          // tuple
          const roles: [string, any] = await Promise.all(
            group.roles.map((role: string) =>
              Promise.all([
                role,
                group.contract?.[role]().then((roleHash: string) =>
                  group.contract?.hasRole(roleHash, account.address),
                ),
              ]),
            ),
          );
          return {
            ...group,
            roles: roles.map((role) => ({
              name: role[0],
              isOfSigner: role[1],
            })),
          };
        },
      };
    }),
  });

  console.log('kia hai', allContractsWithRoles);

  return (
    <Popover title="Chain Roles" trigger={<RoleIcon />}>
      {allContractsWithRoles.map(({ data }, index) => (
        <div
          className="my-2 min-w-[300px] rounded-lg bg-[var(--gray3)] p-4"
          key={index}
        >
          <p className="font-semibold">{data?.contractName}</p>
          {data?.roles.map(({ name, isOfSigner }, index) => (
            <div className="flex flex-row" key={index}>
              {snakeToSentenceCase(name, ACRONYMS)}{' '}
              <div className="ml-auto">
                {isOfSigner ? (
                  <CheckIcon className="text-[var(--green11)]" />
                ) : (
                  <Cross2Icon className="text-[var(--red11)]" />
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </Popover>
  );
}
