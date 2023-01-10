import React, { useMemo, useState, useEffect } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../../src/hooks';

const activeStyle = {
  background: 'var(--bg-color-menuitem-active)',
  color: '#fff',
  borderRadius: '10px',
};

const CHide = Collapsible.Content;

export default function SideNavigation() {
  const [navOpen, setNavOpen] = useState(true);
  const { darkMode, setDarkMode } = useTheme();

  // useEffect(() => {
  //   document.documentElement.classList[darkMode ? 'add' : 'remove'](
  //     'dark-theme',
  //   );
  // }, [darkMode]);

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
      className="grid h-full bg-[var(--white)] py-4 text-[var(--black)]"
      style={{
        width: navOpen ? '320px' : 'min-content',
        gridTemplateRows: 'min-content 1fr min-content',
        transition: 'width 1s ease',
      }}
    >
      <div className="flex items-center justify-between p-4">
        <CHide
          className="text-xs uppercase text-[var(--gray8)]"
          style={{ letterSpacing: '2px' }}
        >
          Main Menu
        </CHide>
        <div
          className="cursor-pointer font-mono text-sm text-[var(--black)]"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'make_light' : 'make_dark'}
        </div>
      </div>
      <nav className="p-4 font-medium text-slate-400">
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
          <li>
            <NavLink {...linkProps} to="support">
              ◼️ <CHide>Support</CHide>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Collapsible.Trigger className="py-4 text-[var(--black)]">
        <div>{navOpen ? '<< Collapse menu' : '>>'}</div>
      </Collapsible.Trigger>
    </Collapsible.Root>
  );
}
