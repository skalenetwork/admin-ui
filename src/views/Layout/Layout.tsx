import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useKey from 'react-use/lib/useKey';
import SideNavigation from '@/views/SideNavigation/SideNavigation';

import { ConnectKitButton } from 'connectkit';

import { useNetwork } from 'wagmi';

export default function Layout() {
  const [inspectMode, setInspectMode] = useState(false);

  useKey(
    (e) => e.ctrlKey && e.key === '.',
    () => {
      setInspectMode(!inspectMode);
    },
  );

  const { chain } = useNetwork();

  return (
    <>
      <header className="flex h-min w-full items-center justify-between border-b-2 border-[var(--gray3)] bg-[var(--white)] p-4 text-[var(--black)]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="w-8 rounded" />
          <h3 className="">SKALE Chain UI</h3>
        </Link>
        <div className="flex items-center gap-4">
          <ConnectKitButton />
          <a href="" className="font-mono">
            github_icon
          </a>
          <a href="" className="font-mono">
            link_icon
          </a>
        </div>
      </header>

      <main className={`flex ${inspectMode ? 'inspect' : ''}`}>
        <SideNavigation />
        <section className="h-full w-full bg-[var(--gray3)] px-6 py-4">
          <Outlet />
        </section>
      </main>

      <footer
        className="
        flex h-min items-center bg-[var(--gray2)]
        px-8 py-3 text-sm text-[var(--gray10)]"
      >
        <p>Powered by Dirt Road Dev</p>
        <p></p>
        <p className="ml-auto flex items-center justify-between gap-4">
          <span>Chain: {chain?.name}</span>
          <span>ID: {chain?.id}</span>
          <span>Type: Staging</span>
          <button
            className="py-1"
            onClick={(e) => setInspectMode(!inspectMode)}
          >
            Dev Mode: {inspectMode ? 1 : 0}
          </button>
        </p>
      </footer>
    </>
  );
}
