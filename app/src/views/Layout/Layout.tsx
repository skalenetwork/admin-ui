const env = import.meta.env;

import SideNavigation from '@/app/views/SideNavigation/SideNavigation';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useKey from 'react-use/lib/useKey';

import { ConnectKitButton } from 'connectkit';

import { FlagIcon } from '@heroicons/react/24/solid';
import {
  CaretDownIcon,
  CaretRightIcon,
  GlobeIcon,
} from '@radix-ui/react-icons';
import { useConfigController } from '@skalenetwork/feat/control/hooks';
import { useNetworkInfo } from '@skalenetwork/feat/network/hooks';
import {
  FcdIcon,
  GithubIcon,
  MtmIcon,
} from '@skalenetwork/ux/components/Icons/Icons';
import RoleList from '@skalenetwork/ux/elements/RoleList/RoleList';
import RouterCrumb from '@skalenetwork/ux/elements/RouterCrumb/RouterCrumb';
import { useIsFetching } from '@tanstack/react-query';
import { useAsyncFn } from 'react-use';
import { tw } from 'twind';
import { useNetwork, useQueryClient } from 'wagmi';

const useWatchMutations = () => {
  const queryClient = useQueryClient();
  const value = useAsyncFn(async () => {
    return await queryClient.isMutating();
  }, [queryClient]);
};

export default function Layout() {
  const [inspectMode, setInspectMode] = useState(false);

  useKey(
    (e) => e.ctrlKey && e.key === '.',
    () => {
      setInspectMode(!inspectMode);
    },
  );

  const { chain } = useNetwork();
  const { flags, connected } = useConfigController();

  const fetchingCount = useIsFetching();

  const { chainInfo } = useNetworkInfo();

  return (
    <>
      <header className="grid grid-cols-[20vw_1fr_max-content] grid-flow-col w-full border-b-2 border-b-[var(--gray3)] bg-[var(--white)] py-2 px-6 text-[var(--black)]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="w-8 rounded" />
          <h3 className="">SKALE Chain UI</h3>
        </Link>
        <div className="flex items-center h-full">
          <RouterCrumb />
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            <ConnectKitButton.Custom>
              {({ isConnected, show, truncatedAddress, ensName }) => {
                return (
                  <button
                    className="bg-gray-50 text-black py-1.5 border px-8 text-sm rounded-full"
                    onClick={show}
                  >
                    {isConnected
                      ? ensName ?? truncatedAddress
                      : 'Connect Wallet'}
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          </div>
          <a
            target={'_blank'}
            href="https://github.com/skalenetwork/admin-ui"
            className="font-mono"
          >
            <GithubIcon />
          </a>
          {/* <a href="" className="font-mono">
            <LinkIcon className="h-32" />
          </a> */}
        </div>
      </header>

      <main className={`${tw`flex`} ${inspectMode ? 'inspect' : ''}`}>
        <SideNavigation />
        <section className="h-full w-full bg-[var(--gray2)] p-3">
          <Outlet />
        </section>
      </main>

      <footer
        className="
        flex h-12 items-center bg-[var(--bg-color-footer)]
        px-8 text-sm text-[var(--color-footer)]"
      >
        <p>Powered by Dirt Road Dev</p>
        <div className="flex items-center justify-center gap-2 pl-20">
          {connected ? (
            <>
              <span
                className={tw`opacity-[${flags?.fcdEnabled ? '1' : '0.5'}]`}
              >
                <FcdIcon /> FCD
              </span>
              <span
                className={tw`opacity-[${flags?.mtmEnabled ? '1' : '0.5'}]`}
              >
                <MtmIcon /> MTM
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="text-xs opacity-50 w-6 text-center flex-grow">
          {fetchingCount > 0 && (
            <>
              <CaretDownIcon /> {fetchingCount}
            </>
          )}
        </div>
        <div className="ml-auto flex items-center justify-between gap-4">
          {chain ? (
            <>
              <p className="align-middle">
                {chain?.network} <GlobeIcon />
                &emsp;
                {chain?.testnet ? 'Testnet' : 'Mainnet'}
              </p>
              <span className="opacity-75">
                <CaretRightIcon />
              </span>
              <p>
                <span className="font-medium">Chain:</span>{' '}
                {chainInfo?.alias || chain?.name}
              </p>
              <p>
                <span className="font-medium">ID:</span> {chain?.id}
              </p>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {' '}
              <span className="h-2 w-2 rounded-full bg-[var(--gray8)]"></span>{' '}
              Not Connected
            </div>
          )}
          {chain && (
            <div className="cursor-pointer">
              <RoleList />
            </div>
          )}
          {env.DEV && (
            <button
              className={`btn btn-outline ${!inspectMode ? 'opacity-50' : ''}`}
              onClick={(e) => setInspectMode(!inspectMode)}
            >
              <FlagIcon className="h-5" />
            </button>
          )}
        </div>
      </footer>
    </>
  );
}
