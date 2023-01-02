import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useKey from 'react-use/lib/useKey';
import SideNavigation from '@/views/SideNavigation/SideNavigation';

export default function Layout() {
  const [inspectMode, setInspectMode] = useState(false);

  useKey(
    (e) => e.ctrlKey && e.key === '.',
    () => {
      setInspectMode(!inspectMode);
    },
  );

  return (
    <>
      <header className="flex h-min w-full items-center justify-between border-b-2 border-slate-100 bg-white p-4 dark:bg-black">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="w-8 rounded" />
          <h3 className="">SKALE Chain UI</h3>
        </Link>
        <div className="flex items-center gap-4">
          <button className="py-1">Connect</button>
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
        <section className="h-full w-full bg-gray-100 px-6 py-4 dark:bg-gray-900">
          <Outlet />
        </section>
      </main>

      <footer
        className="
        flex h-min items-center bg-[var(--gray2)]
        px-8 py-3 text-sm text-slate-400 dark:bg-slate-800 dark:text-slate-200"
      >
        <p>Powered by Dirt Road Dev</p>
        <p></p>
        <p className="ml-auto">
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
