// App routes for Collectease
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import AppLayout from './components/AppLayout';

// Lazy load page components for better initial load performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Collection = lazy(() => import('./pages/Collection'));
const ImportExport = lazy(() => import('./pages/ImportExport'));
const Share = lazy(() => import('./pages/Share'));
const Marketplace = lazy(() => import('./pages/Marketplace'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'collection', element: <Collection /> },
      { path: 'import-export', element: <ImportExport /> },
      { path: 'share', element: <Share /> },
      { path: 'marketplace', element: <Marketplace /> },
    ],
  },
];

export default routes;
