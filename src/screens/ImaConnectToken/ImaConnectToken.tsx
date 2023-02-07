import Card from '@/components/Card/Card';
import { TOKEN_STANDARD } from '@/features/network/manifest';
import { Link, useParams } from 'react-router-dom';
import { useNetwork } from 'wagmi';

export default function ImaConnectToken() {
  const { chains } = useNetwork();
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
