import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthFullScreenLayout from 'src/layouts/auth/full-screen'

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
// const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
// const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));

// DWT
const B2cLoginPage = lazy(() => import('src/pages/auth/b2c/login'));
const B2cCodePage = lazy(() => import('src/pages/auth/b2c/code'));
const B2cRegisterPage = lazy(() => import('src/pages/auth/b2c/register'));


// ----------------------------------------------------------------------

const authB2c = {
  path: 'b2c',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout title="Отслеживайте доставку" subTitle="в мобильном приложении">
          <B2cLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'code',
      element: (
        // <AuthClassicLayout title="Отслеживайте доставку" subTitle="в мобильном приложении">
        //   <B2cCodePage />
        // </AuthClassicLayout>
        <AuthFullScreenLayout>
          <B2cCodePage />
        </AuthFullScreenLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthFullScreenLayout>
          <B2cRegisterPage />
        </AuthFullScreenLayout>
      ),
    },
  ],
};


export const authRoutes = [
  {
    path: 'auth',
    children: [authB2c],
    // children: [authJwt],
  },
];
