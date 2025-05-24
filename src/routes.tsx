// App routes for Collectease
import { RouteObject } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import ImportExport from './pages/ImportExport';
import Share from './pages/Share';
import Marketplace from './pages/Marketplace';

const routes: RouteObject[] = [
  { path: '/', element: <Dashboard /> },
  { path: '/collection', element: <Collection /> },
  { path: '/import-export', element: <ImportExport /> },
  { path: '/share', element: <Share /> },
  { path: '/marketplace', element: <Marketplace /> },
];

export default routes;
