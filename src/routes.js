import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Transactions from './pages/Transactions';
import Floors from './pages/Floors';
import Payments from './sections/payments/Payments';
import HomePayment from './sections/payments/homePage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'products', element: <Products /> },
        { path: 'floors', element: <Floors /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/payment',
      element: <Payments />,
    },
    {
      path: '/homePayment',
      element: <HomePayment />,
    },
    {
      path: '/mainPage',
      element: <HomePayment />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
