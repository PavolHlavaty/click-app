import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layouts/RootLayout/RootLayout';
import LeaderBoard from '../routes/LeaderBoard/LeaderBoard';
import Login from '../routes/Login/Login';
import TeamDetail from '../routes/TeamDetail/TeamDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <LeaderBoard />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: ':teamName',
        element: <TeamDetail />,
      },
    ],
  },
]);
