import { RoleIcon } from '@/components/Icons/Icons';
import Popover from '@/components/Popover/Popover';
import { useTypedContracts } from '@/features/network/hooks';
import { ACRONYMS, NETWORK } from '@/features/network/literals';
import { CONTRACT } from '@/features/network/manifest';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useQueries } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { snakeToSentenceCase } from '../../utils';

type Props = {};

export default function RoleList({}: Props) {
  const contracts = useTypedContracts({
    id: Object.keys(CONTRACT),
  });

  const account = useAccount();

  const contractsWithRoles = contracts
    .filter(
      (contract) =>
        contract.abi && CONTRACT[contract.contractId].network === NETWORK.SKALE,
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

  console.log('contractsWithRoles', contractsWithRoles);

  // better be broken down, improve queryKey
  const allContractsWithRoles = useQueries({
    queries: contractsWithRoles.map((details) => {
      return {
        enabled: Boolean(details.contract),
        queryKey: ['allContractsWithRoles', details.contractId],
        queryFn: async () => {
          // tuple
          const roles: [string, any] = await Promise.all(
            details.roles.map((role: string) =>
              Promise.all([
                role,
                details.contract?.[role]().then((roleHash: string) =>
                  details.contract?.hasRole(roleHash, account.address),
                ),
              ]),
            ),
          );
          return {
            ...details,
            roles: roles.map((role) => ({
              name: role[0],
              isOfSigner: role[1],
            })),
          };
        },
      };
    }),
  });

  console.log('allContractsWithRoles', allContractsWithRoles);

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
