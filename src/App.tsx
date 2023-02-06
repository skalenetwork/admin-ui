import { RouteObject, useRoutes } from 'react-router-dom';

import Layout from '@/views/Layout/Layout';

import ChainAnalytics from '@/screens/ChainAnalytics/ChainAnalytics';
import ChainManager from '@/screens/ChainManager/ChainManager';
import ImaAutodeploy from '@/screens/ImaAutodeploy/ImaAutodeploy';
import ImaConnectChain from '@/screens/ImaConnectChain/ImaConnectChain';
import ImaManager from '@/screens/ImaManager/ImaManager';
import ImaMapToken from '@/screens/ImaMapToken/ImaMapToken';
import Multisig from '@/screens/Multisig/Multisig';
import RoleAssigner from '@/screens/RoleAssigner/RoleAssigner';
import Support from '@/views/Support/Support';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <ChainAnalytics />,
      },
      {
        path: 'chain_manager',
        element: <ChainManager />,
      },
      {
        path: 'ima_manager',
        children: [
          {
            path: '',
            element: <ImaManager />,
          },
          {
            path: 'autodeployer',
            element: <ImaAutodeploy />,
          },
          {
            path: 'connect',
            element: <ImaConnectChain />,
          },
          {
            path: 'maptoken/:chainName',
            element: <ImaMapToken />,
          },
        ],
      },
      {
        path: 'multisig',
        element: <Multisig />,
      },
      {
        path: 'role_assigner',
        element: <RoleAssigner />,
      },
      {
        path: 'support',
        element: <Support />,
      },
    ],
  },
];

export default function App() {
  const currentRouteElement = useRoutes(routes);
  return <div id="app">{currentRouteElement}</div>;
}
