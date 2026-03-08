// AppLayout: Main layout with MUI AppBar, Drawer, and content area
import { Suspense, type ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Box, CircularProgress } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ShareIcon from '@mui/icons-material/Share';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link, useLocation, Outlet } from 'react-router-dom';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Collection', icon: <CategoryIcon />, path: '/collection' },
  { text: 'Import/Export', icon: <ImportExportIcon />, path: '/import-export' },
  { text: 'Share', icon: <ShareIcon />, path: '/share' },
  { text: 'Marketplace', icon: <StorefrontIcon />, path: '/marketplace' },
];

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
    <CircularProgress />
  </Box>
);

export default function AppLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Collectease
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        {/* ⚡ Performance: Suspense boundary for lazy-loaded routes */}
        <Suspense fallback={<PageLoader />}>
          {children || <Outlet />}
        </Suspense>
      </Box>
    </Box>
  );
}
