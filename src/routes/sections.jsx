import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import HomeLayout from 'src/layouts/Home';

import { isAuthenticated } from '../utils/authUtils';
import Loading from 'src/ui/Loading';

// Dashboard Page
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const Profile = lazy(() => import('src/pages/profile'));
export const EmployeePage = lazy(() => import('src/pages/employee'));
export const EmployeeCreatePage = lazy(() => import('src/sections/employee/create/employee-create'));
export const EmployeeEditPage = lazy(() => import('src/sections/employee/edit/employee-edit'));
export const CustomerPage = lazy(() => import('src/pages/customer'));
export const CustomerCreatePage = lazy(() => import('src/sections/customer/create/customer-create'));
export const ReportPage = lazy(() => import('src/pages/report'));
export const PaymentPage = lazy(() => import('src/pages/payment'));
export const StatisticalPage = lazy(() => import('src/pages/statistical'));
export const NotificationPage = lazy(() => import('src/pages/notification'));
export const BackupRecoveryPage = lazy(() => import('src/pages/backup-recovery'));

// Home Page
export const IndexHomePage = lazy(() => import('src/pages/home'));
// export const HomePage = lazy(() => import('src/pages/home'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductCreatePage = lazy(() => import('src/sections/products/create/product-create'));
export const ImportProductsPage = lazy(() => import('src/pages/import-products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: isAuthenticated() ? (
        <DashboardLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        { path: 'dashboard', element: <IndexPage /> },
        { path: 'dashboard/me', element: <Profile /> },
        { path: 'dashboard/products', element: <ProductsPage /> },
        { path: 'dashboard/product/create', element: <ProductCreatePage /> },
        { path: 'dashboard/employees', element: <EmployeePage /> },
        { path: 'dashboard/employee/create', element: <EmployeeCreatePage /> },
        { path: 'dashboard/employee/edit/:id', element: <EmployeeEditPage /> },
        { path: 'dashboard/customers', element: <CustomerPage /> },
        { path: 'dashboard/customer/create', element: <CustomerCreatePage /> },
        { path: 'dashboard/import-products', element: <ImportProductsPage /> },
        { path: 'dashboard/payment', element: <PaymentPage /> },
        { path: 'dashboard/statistical', element: <StatisticalPage /> },
        { path: 'dashboard/report', element: <ReportPage /> },
        { path: 'dashboard/notification', element: <NotificationPage /> },
        { path: 'dashboard/news', element: <BlogPage /> },
        { path: 'dashboard/backup-recovery', element: <BackupRecoveryPage /> },
      ],
    },

    {
      element: (
        <HomeLayout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </HomeLayout>
      ),
      children: [
        { path: '/', element: <IndexHomePage /> },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
