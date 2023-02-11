import Card from '@/components/Card/Card';
import { useToggleAutodeploy } from '@/features/bridge/hooks';
import { TOKEN_STANDARD } from '@/features/network/constants';

const standards = Object.values(TOKEN_STANDARD);

const SingleConfig = ({
  title,
  status,
  tokenStandard,
  onClick,
}: {
  title: string;
  status: boolean;
  tokenStandard: (typeof standards)[number]['name'];
  onClick: () => void;
}) => {
  const { isEnabled, toggle, isLoading } = useToggleAutodeploy({
    standard: tokenStandard.toUpperCase(),
  });
  return (
    <div className="flex flex-row items-center rounded-lg border border-[var(--gray4)] py-2 px-4">
      <div>
        <p className="font-medium">{title}</p>
        {isEnabled === true ? (
          <p className="text-sm leading-none text-[var(--green7)]">Enabled</p>
        ) : (
          <p className="text-sm leading-none text-[var(--red7)]">Disabled</p>
        )}
      </div>
      <div className="ml-auto">
        {isEnabled === true ? (
          <button
            className="btn slim negative w-44"
            onClick={() => toggle?.()}
            disabled={isLoading}
          >
            {isLoading ? 'Disabling...' : 'Disable'}
          </button>
        ) : (
          <button
            className="btn slim positive w-44"
            onClick={() => toggle?.()}
            disabled={isLoading}
          >
            {isLoading ? 'Enabling...' : 'Enable'}
          </button>
        )}
      </div>
    </div>
  );
};

export default function ImaAutodeploy() {
  return (
    <div className="grid h-full w-full rounded-lg bg-[var(--white)] p-4">
      <Card
        full
        className="max-w-xl"
        heading="SKALE Chain automatic deployment manager"
      >
        <div className="flex flex-col gap-4 py-4">
          {standards.map((standard) => (
            <SingleConfig
              key={standard}
              title={`${standard.label} Token Manager`}
              status={true}
              tokenStandard={standard.name}
              onClick={() => {
                toggle;
              }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
