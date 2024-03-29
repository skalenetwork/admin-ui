import * as Collapsible from '@radix-ui/react-collapsible';
import {
  BridgeIcon,
  CrownIcon,
  DashboardIcon,
  IIcon,
  ManagerIcon,
  PeopleIcon,
} from '@skalenetwork/ux/components/Icons/Icons';
import DarkModeToggle from '@skalenetwork/ux/elements/DarkModeToggle/DarkModeToggle';
import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { tw } from 'twind';
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

  const linkProps = useMemo(() => {
    return {
      className: `flex items-center gap-2 p-4 rounded-lg transition-all hover:bg-[var(--slate)] my-1 ${
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
        width: navOpen ? '24vw' : '7rem',
        gridTemplateRows: 'min-content 1fr min-content',
        transition: 'width 0.3s ease',
      }}
    >
      <div
        className={tw`flex items-center justify-${
          navOpen ? 'between' : 'center'
        } p-4`}
      >
        <CHide
          className="text-xs uppercase text-[var(--gray8)]"
          style={{ letterSpacing: '2px' }}
        >
          Main Menu
        </CHide>
        <DarkModeToggle
          value={darkMode}
          onChange={(value) => setDarkMode(value)}
          size={5}
        />
      </div>
      <nav className="p-4 font-medium text-[var(--color-menu)]">
        <ul>
          <li>
            <NavLink {...linkProps} to="">
              <DashboardIcon /> <CHide>Dashboard</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="chain_manager">
              <ManagerIcon /> <CHide>Chain Manager</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="ima_manager">
              <BridgeIcon /> <CHide>IMA Manager</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="multisig">
              <PeopleIcon /> <CHide>Multisig</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="role_assigner">
              <CrownIcon /> <CHide>Role Assigner</CHide>
            </NavLink>
          </li>
          <li>
            <NavLink {...linkProps} to="support">
              <IIcon /> <CHide>Support</CHide>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Collapsible.Trigger className="py-4 text-slate-400">
        <div>{navOpen ? '<< Collapse menu' : '>>'}</div>
      </Collapsible.Trigger>
    </Collapsible.Root>
  );
}
