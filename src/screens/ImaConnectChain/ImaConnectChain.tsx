import Card from '@/components/Card/Card';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useState } from 'react';
import { useNetwork } from 'wagmi';

export default function ImaConnectChain() {
  const { chains } = useNetwork();
  const [selectedChainName, setSelectedChainName] = useState('');

  return (
    <div className="grid grid-rows-[1fr_max-content] h-full rounded-lg bg-[var(--white)] p-2">
      <Card full heading="Connect chains">
        <ToggleGroup.Root
          type="single"
          value={selectedChainName}
          onValueChange={(value) => setSelectedChainName(value)}
          className="flex flex-row flex-wrap h-full w-full
      overflow-auto gap-4"
        >
          {chains.map((chain) => (
            <>
              <ToggleGroup.Item
                className="
              flex-[1_0_21%] h-[calc(25%-1rem)] relative flex flex-col justify-center items-center p-4
              text-center text-sm border rounded-lg cursor-pointer hover:bg-[var(--gray1)]
              group radix-state-on:rounded-tr-2xl radix-state-on:border-[var(--green8)]"
                value={chain.name}
              >
                <CheckCircleIcon
                  className="hidden group-radix-state-on:block absolute top-1 right-1 text-[var(--green8)]"
                  width={20}
                />
                <p className="font-semibold">{chain.name}</p>
                <p className="text-[var(--gray11)]">{chain.id}</p>
              </ToggleGroup.Item>
            </>
          ))}
        </ToggleGroup.Root>
      </Card>
      <div className="flex justify-center items-center p-4">
        <button
          className="btn"
          onClick={() => {
            alert(selectedChainName);
            debugger;
          }}
        >
          Connect
        </button>
      </div>
    </div>
  );
}
