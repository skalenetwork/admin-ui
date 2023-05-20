import Prelay from '@/app/screens/Prelay';
import { InformationCircleIcon, PowerIcon } from '@heroicons/react/24/outline';
import { NETWORK } from '@skalenetwork/feat/network/literals';
import { PropsWithChildren } from 'react';
import { tw } from 'twind';

export default function NotSupported({
  children,
  type = 'network',
  theme = 'solid',
}: {
  type?: 'network' | 'authority';
  theme?: 'solid' | 'blur';
} & PropsWithChildren) {
  return (
    <Prelay
      className={tw(
        'rounded-lg',
        theme === 'solid'
          ? 'bg-[var(--white)]'
          : theme === 'blur'
          ? '!absolute left-0 right-0 top-0 bottom-0 w-full h-full z-[110000] backdrop-blur-xl border-[var(--whiteA5)]'
          : '',
      )}
    >
      <div className="p-2">
        {type === 'network' ? (
          <p className="text-lg">
            <PowerIcon className="h-8" /> Connect to a SKALE SChain to use this
            feature&emsp;
            <code className="inline-block">
              <span className="text-[var(--primary)]">&gt;</span> chain.network:
              <span className="text-[var(--green11)] font-semibold">
                {' '}
                '{NETWORK.SKALE}'
              </span>
            </code>
          </p>
        ) : type === 'authority' ? (
          <p className="text-lg">
            <InformationCircleIcon className="h-8" /> Connect to a SKALE SChain
            to use this feature&emsp;
            <code>
              <span className="text-[var(--primary)]">&gt;</span> chain.network:
              '{NETWORK.SKALE}'
            </code>
          </p>
        ) : (
          <></>
        )}
        <br />
        <br />
        {children}
      </div>
    </Prelay>
  );
}
