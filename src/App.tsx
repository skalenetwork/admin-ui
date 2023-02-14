import {
  createBrowserRouter,
  Link,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import ChainAnalytics from '@/screens/ChainAnalytics/ChainAnalytics';
import ChainManager from '@/screens/ChainManager/ChainManager';
import ImaAutodeploy from '@/screens/ImaAutodeploy/ImaAutodeploy';
import ImaConnectChain from '@/screens/ImaConnectChain/ImaConnectChain';
import ImaConnectToken from '@/screens/ImaConnectToken/ImaConnectToken';
import ImaManager from '@/screens/ImaManager/ImaManager';
import ImaMapToken from '@/screens/ImaMapToken/ImaMapToken';
import Multisig from '@/screens/Multisig/Multisig';
import RoleAssigner from '@/screens/RoleAssigner/RoleAssigner';
import Layout from '@/views/Layout/Layout';
import Support from '@/views/Support/Support';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<Link to="ima_manager">IMA Manager</Link>;

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
            path: 'token_map',
            children: [
              {
                path: '',
                element: <ImaConnectToken />,
              },
              {
                path: ':chainName',
                element: <ImaMapToken />,
              },
            ],
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

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <div id="app">
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
