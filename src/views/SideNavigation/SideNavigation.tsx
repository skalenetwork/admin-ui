import React, { useMemo, useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  background: '#3763E4',
  color: '#fff',
  borderRadius: '10px',
};

const CHide = Collapsible.Content;

export default function SideNavigation() {
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
      className="grid h-full bg-white py-4 dark:bg-black"
      style={{
        width: navOpen ? '320px' : 'min-content',
        gridTemplateRows: 'min-content 1fr min-content',
        transition: 'width 1s ease',
      }}
    >
      <div className="flex items-center justify-between p-4">
        <CHide
          className="slate-300 text-xs uppercase text-slate-400"
          style={{ letterSpacing: '2px' }}
        >
          Main Menu
        </CHide>
        <div className="font-mono text-sm">dark_mode</div>
      </div>
      <nav className="p-4 font-medium text-slate-400">
        <ul>
          <li>
            <NavLink {...linkProps} to="">
              ◼️ <CHide>ChainAnalytics</CHide>
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
          <li>
            <NavLink {...linkProps} to="support">
              ◼️ <CHide>Support</CHide>
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
