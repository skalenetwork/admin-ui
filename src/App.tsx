import { useDispatch, useSelector } from '@/app/hooks';

import {
  RouteObject,
  useRoutes,
  Outlet,
  Link,
  NavLink,
} from 'react-router-dom';

import Home from '@/pages/Home';

import * as Collapsible from '@radix-ui/react-collapsible';
import { useMemo, useState } from 'react';
import ChainManager from './pages/ChainManager';
import Multisig from './pages/Multisig';
import RoleAssigner from './pages/RoleAssigner';
import ImaManager from './pages/ImaManager';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'chain_manager',
        element: <ChainManager />,
      },
      {
        path: 'ima_manager',
        element: <ImaManager />,
      },
      {
        path: 'multisig',
        element: <Multisig />,
      },
      {
        path: 'role_assigner',
        element: <RoleAssigner />,
      },
    ],
  },
];

const activeStyle = {
  background: '#3763E4',
  color: '#fff',
  borderRadius: '10px',
};

const CHide = Collapsible.Content;

function Layout() {
  // const dispatch = useDispatch();
  // const counterList = useSelector((state) => state.counter.list);

  return (
    <>
      <header
        className="
      w-full flex justify-between items-center p-4
      bg-white dark:bg-black h-min border-b-2 border-slate-100
      "
      >
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="w-8 rounded" />
          <h3 className="">SKALE Chain UI</h3>
        </Link>
        <div className="flex gap-4 items-center">
          <button className="py-1">Connect</button>
          <a href="" className="font-mono">
            github_icon
          </a>
          <a href="" className="font-mono">
            link_icon
          </a>
        </div>
      </header>

      <main className="flex">
        <SideNavigation />
        <section className="px-6 py-4 w-full h-full bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </section>
      </main>

      <footer
        className="
      h-min px-8 py-3 flex
      items-center bg-indigo-200 bg-opacity-40 dark:bg-slate-800 text-slate-400 dark:text-slate-200 text-sm"
      >
        <p>Powered by Dirt Road Dev</p>
        <p></p>
      </footer>
    </>
  );
}

function SideNavigation() {
  const [navOpen, setNavOpen] = useState(true);

  const linkProps = useMemo(() => {
    return {
      className: `flex items-center gap-2 p-4 ${
        !navOpen ? 'justify-center' : ''
      }`,
      style: ({ isActive }: { isActive: boolean }) =>
        isActive ? activeStyle : undefined,
    };
  }, [navOpen]);

  return (
    <Collapsible.Root
      open={navOpen}
      onOpenChange={setNavOpen}
      className="
          grid h-full py-4 
          bg-white dark:bg-black
    
          "
      style={{
        width: navOpen ? '320px' : 'min-content',
        gridTemplateRows: 'min-content 1fr min-content',
        transition: 'width 1s ease',
      }}
    >
      <div className="p-4 flex items-center justify-between">
        <CHide
          className="uppercase slate-300 text-xs text-slate-400"
          style={{ letterSpacing: '2px' }}
        >
          Main Menu
        </CHide>
        <div className="font-mono text-sm">dark_mode</div>
      </div>
      <nav className="p-4 text-slate-400 font-medium">
        <ul>
          <li>
            <NavLink {...linkProps} to="">
              ◼️ <CHide>Dashboard</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="chain_manager">
              ◼️ <CHide>Chain Manager</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="ima_manager">
              ◼️ <CHide>IMA Manager</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="multisig">
              ◼️ <CHide>Multisig</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="role_assigner">
              ◼️ <CHide>Role Assigner</CHide>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Collapsible.Trigger className="py-4 text-black">
        <div>{navOpen ? '<< Collapse menu' : '>>'}</div>
      </Collapsible.Trigger>
    </Collapsible.Root>
  );
}

export default function App() {
  const currentRouteElement = useRoutes(routes);
  return <>{currentRouteElement}</>;
}
