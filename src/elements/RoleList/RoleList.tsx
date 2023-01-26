import { CONTRACT } from '@/features/network/manifest';

import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { RoleIcon } from '@/components/Icons/Icons';
import Popover from '@/components/Popover/Popover';

type Props = {};

export default function RoleList({}: Props) {
  return (
    <Popover title="Chain Roles" trigger={<RoleIcon />}>
      {Object.values(CONTRACT).map((contract) => (
        <div className="my-2 min-w-[300px] rounded-lg bg-[var(--gray3)] p-4">
          <p className="font-semibold">{contract.name}</p>
          <div className="flex flex-row">
            Role Name{' '}
            <div className="ml-auto">
              <CheckIcon className="text-[var(--green11)]" />
              <Cross2Icon className="text-[var(--red11)]" />
            </div>
          </div>
        </div>
      ))}
    </Popover>
  );
}
