import Card from '@/components/Card/Card';
import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';
import { TOKEN_STANDARD } from '@/features/network/literals';
import { Link, useParams } from 'react-router-dom';
import { useNetwork } from 'wagmi';

export function ImaConnectToken() {
  const { chain, chains } = useNetwork();
  const { chainName } = useParams();
  return (
    <Card
      full
      heading={`Map tokens with ${chainName || 'connected chains'}`}
      bodyClass="flex flex-col justify-around gap-4"
    >
      {chainName && (
        <div className="flex flex-col justify-around gap-4">
          {Object.values(TOKEN_STANDARD).map((standard) => (
            <Link
              key={standard.name}
              to={`?standard=${standard.name}`}
              className="btn btn-wide inline-block"
            >
              {standard.label}
            </Link>
          ))}
        </div>
      )}
      <div className="w-full flex flex-row justify-center gap-10 text-[var(--primary)]">
        <Link to="/ima_manager/connect">Connect a new chain |</Link>
        <Link to="/ima_manager">Go to dashboard |</Link>
      </div>
    </Card>
  );
}

export default withErrorBoundary(ImaConnectToken);
