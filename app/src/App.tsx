import {
  createBrowserRouter,
  Link,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import ChainAnalytics from '@/app/screens/ChainAnalytics/ChainAnalytics';
import ChainManager from '@/app/screens/ChainManager/ChainManager';
import ImaAutodeploy from '@/app/screens/ImaAutodeploy/ImaAutodeploy';
import ImaConnectChain from '@/app/screens/ImaConnectChain/ImaConnectChain';
import ImaConnectToken from '@/app/screens/ImaConnectToken/ImaConnectToken';
import ImaManager from '@/app/screens/ImaManager/ImaManager';
import ImaMapToken from '@/app/screens/ImaMapToken/ImaMapToken';
import Multisig from '@/app/screens/Multisig/Multisig';
import RoleAssigner from '@/app/screens/RoleAssigner/RoleAssigner';
import Layout from '@/app/views/Layout/Layout';
import Support from '@/app/views/Support/Support';
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
  {
    path: '*',
    element: <Navigate to={'/'} />,
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
