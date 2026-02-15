// App routes for Collectease
import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import type { RouteObject } from 'react-router-dom';
import AppLayout from './components/AppLayout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Collection = lazy(() => import('./pages/Collection'));
const ImportExport = lazy(() => import('./pages/ImportExport'));
const Share = lazy(() => import('./pages/Share'));
const Marketplace = lazy(() => import('./pages/Marketplace'));

const Loading = (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '200px' }}>
    <CircularProgress />
  </Box>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Suspense fallback={Loading}><Dashboard /></Suspense> },
      { path: 'collection', element: <Suspense fallback={Loading}><Collection /></Suspense> },
      { path: 'import-export', element: <Suspense fallback={Loading}><ImportExport /></Suspense> },
      { path: 'share', element: <Suspense fallback={Loading}><Share /></Suspense> },
      { path: 'marketplace', element: <Suspense fallback={Loading}><Marketplace /></Suspense> },
    ],
  },
];

export default routes;
