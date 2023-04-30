import { Navigate, useRoutes, } from 'react-router-dom';
import { useSession, useSessionContext } from '@supabase/auth-helpers-react';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Calendar from './pages/CalendarPage';
import CalNowPage from './pages/CallNowPage';
import CallFirst from './components/call/first';
import CallSecond from './components/call/second';

// ----------------------------------------------------------------------

export default function Router() {
  const { isLoading } = useSessionContext();
  const session = useSession();


  const routes = useRoutes([
    {
      path: '/',
      element: session ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'contacts', element: <UserPage /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'call', element: <CalNowPage /> },
        { path: 'callf', element: <CallFirst /> },
        { path: 'calls', element: <CallSecond /> }

      ],
    },
    {
      path: 'login',
      element: session ? <Navigate to="/app" /> : <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  if (isLoading) {
    return <></>;
  }
  return routes;
}
