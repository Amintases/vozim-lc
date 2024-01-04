import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home/home'));
const OrdersPage = lazy(() => import('src/pages/home/orders'));
const PageThree = lazy(() => import('src/pages/home/three'));

// ----------------------------------------------------------------------

export const homeRoutes = [
  {
    path: 'home',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <HomePage />, index: true },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'three', element: <PageThree /> },
    ],
  },
];
