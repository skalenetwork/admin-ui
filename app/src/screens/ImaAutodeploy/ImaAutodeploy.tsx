import { useToggleAutodeploy } from '@skalenetwork/feat/bridge/hooks';
import { TOKEN_STANDARD } from '@skalenetwork/feat/network/literals';
import Card from '@skalenetwork/ux/components/Card/Card';
import { withErrorBoundary } from '@skalenetwork/ux/elements/ErrorBoundary/ErrorBoundary';

const standards = [
  TOKEN_STANDARD.ERC20,
  TOKEN_STANDARD.ERC721,
  TOKEN_STANDARD.ERC721_WITH_METADATA,
  TOKEN_STANDARD.ERC1155,
];

const SingleConfig = ({
  title,
  status,
  tokenStandard,
  onClick,
}: {
  title: string;
  status: boolean;
  tokenStandard: (typeof standards)[number]['name'];
  onClick?: () => void;
}) => {
  const { isEnabled, toggle, isLoading } = useToggleAutodeploy({
    standard: tokenStandard.toUpperCase(),
  });
  return (
    <div className="flex flex-row items-center rounded-lg border border-[var(--gray4)] py-2 px-4">
      <div>
        <p className="font-medium">{title}</p>
        {isEnabled === true ? (
          <p className="text-sm leading-none text-[var(--green10)]">Enabled</p>
        ) : (
          <p className="text-sm leading-none text-[var(--red10)]">Disabled</p>
        )}
      </div>
      <div className="ml-auto">
        {isEnabled === true ? (
          <button
            className="btn slim negative w-44"
            onClick={() => toggle?.()}
            disabled={isLoading || !toggle}
          >
            {isLoading ? 'Disabling...' : 'Disable'}
          </button>
        ) : (
          <button
            className="btn slim positive w-44"
            onClick={() => toggle?.()}
            disabled={isLoading || !toggle}
          >
            {isLoading ? 'Enabling...' : 'Enable'}
          </button>
        )}
      </div>
    </div>
  );
};

export function ImaAutodeploy() {
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
              key={standard.name}
              title={`${standard.label} Token Manager`}
              status={true}
              tokenStandard={standard.name}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default withErrorBoundary(ImaAutodeploy);
