import Hoverover from '@/components/Hoverover/Hoverover';
import { RoleIcon } from '@/components/Icons/Icons';
import { useSContracts } from '@/features/network/hooks';
import { ACRONYMS } from '@/features/network/literals';
import { CONTRACT } from '@/features/network/manifest';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useQueries } from '@tanstack/react-query';
import { useAccount, useNetwork } from 'wagmi';
import { snakeToSentenceCase } from '../../utils';

type Props = {};

export default function RoleList({}: Props) {
  const allContracts = useSContracts({
    id: Object.keys(CONTRACT),
  });

  const account = useAccount();
  const { chain } = useNetwork();

  const filteredContracts = allContracts
    .filter(
      (contract) =>
        contract.abi &&
        CONTRACT[contract.contractId].network === chain?.network,
    )
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

  const rolesOfFilteredContracts = useQueries({
    queries: filteredContracts.map((details) => {
      return {
        enabled: Boolean(details.contract),
        queryKey: ['rolesOfFilteredContracts', details.contractId],
        queryFn: async () => {
          // tuple
          const roles: [string, any] = await Promise.all(
            details.roles.map((role: string) =>
              Promise.all([
                role,
                details.contract?.[role]().then(
                  (roleHash: string) =>
                    details.contract?.hasRole(roleHash, account.address), // special rules should extend this
                ),
              ]),
            ),
          );
          return roles.map((role) => ({
            name: role[0],
            isOfSigner: role[1],
          }));
        },
      };
    }),
  });

  const listOfContractsWithRoles = filteredContracts.map((data, index) => {
    const roles = rolesOfFilteredContracts[index].data;
    return {
      ...data,
      roles:
        roles ||
        (data.roles
          ? data.roles.map((roleName: string) => ({ name: roleName }))
          : []),
    };
  });

  return (
    <Hoverover title="Chain Roles" trigger={<RoleIcon />}>
      {listOfContractsWithRoles.map((data, index) => (
        <div
          className="my-2 min-w-[300px] rounded-lg bg-[var(--gray3)] p-4"
          key={index}
        >
          <p className="font-semibold">{data?.contractName}</p>
          {data.roles.map &&
            data.roles.map(({ name, isOfSigner }, index) => (
              <div className="flex flex-row" key={index}>
                {snakeToSentenceCase(name, ACRONYMS)}{' '}
                <div className="ml-auto">
                  {isOfSigner === undefined ? (
                    '?'
                  ) : isOfSigner === true ? (
                    <CheckIcon className="text-[var(--green11)]" />
                  ) : (
                    <Cross2Icon className="text-[var(--red11)]" />
                  )}
                </div>
              </div>
            ))}
        </div>
      ))}
    </Hoverover>
  );
}
