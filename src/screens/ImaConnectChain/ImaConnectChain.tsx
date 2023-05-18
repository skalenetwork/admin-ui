import Card from '@/components/Card/Card';
import { withErrorBoundary } from '@/elements/ErrorBoundary/ErrorBoundary';
import { SButton } from '@/elements/SButton/SButton';
import { useChainConnect } from '@/features/bridge';
import { NETWORK } from '@/features/network/literals';
import NotSupported from '@/screens/NotSupported';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNetwork } from 'wagmi';

export function ImaConnectChain() {
  const { chains, chain: originChain } = useNetwork();
  const [selectedChainName, setSelectedChainName] = useState('');

  const chain = useChainConnect({
    chainName: selectedChainName,
  });

  const navigate = useNavigate();

  return originChain?.network !== NETWORK.SKALE ? (
    <NotSupported>
      <strong>Interchain Connections:</strong> Connect from one Schain to
      another.
    </NotSupported>
  ) : (
    <div className="grid grid-rows-[1fr_max-content] h-full rounded-lg bg-[var(--white)] p-2">
      <Card full heading="Connect chains">
        <ToggleGroup.Root
          type="single"
          disabled={chain?.connect.isLoading}
          value={selectedChainName}
          onValueChange={(value) => setSelectedChainName(value)}
          className="flex flex-row flex-wrap h-auto w-full
      overflow-auto gap-4"
        >
          {chains.map((someChain) => {
            const chain = useChainConnect({
              chainName: someChain.name,
            });
            return Boolean(originChain.testnet) !==
              Boolean(someChain.testnet) ||
              someChain.network !== NETWORK.SKALE ||
              chain.status !== 'none' ||
              someChain.name === originChain?.name ? (
              <></>
            ) : (
              <>
                <ToggleGroup.Item
                  key={someChain.id}
                  className="
              flex-[1_0_21%] h-[calc(25%-1rem)] relative flex flex-col justify-center items-center p-4
              text-center text-sm border rounded-lg cursor-pointer hover:bg-[var(--gray1)]
              group radix-state-on:rounded-tr-2xl radix-state-on:border-[var(--green8)]
              transition-all
              "
                  value={someChain.name}
                >
                  <CheckCircleIcon
                    className="transition-all opacity-0 group-radix-state-on:opacity-100 absolute top-1 right-1 text-[var(--green8)]"
                    width={20}
                  />
                  <p className="font-semibold">{someChain.name}</p>
                  <p className="text-[var(--gray11)]">{someChain.id}</p>
                </ToggleGroup.Item>
              </>
            );
          })}
        </ToggleGroup.Root>
      </Card>
      <div className="flex justify-center items-center p-4">
        <SButton
          className="btn btn-wide"
          writer={chain?.connect}
          toast={{
            pending: `Connecting to chain`,
            success: `Connected to chain`,
            error: `Failed to connect to chain`,
          }}
          onPromise={(promise) => {
            promise.then((res) => {
              navigate(`/ima_manager/token_map/${selectedChainName}`);
              chain?.connect.reset?.();
            });
          }}
        >
          Connect
        </SButton>
      </div>
    </div>
  );
}

export default withErrorBoundary(ImaConnectChain);
