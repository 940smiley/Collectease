import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useRoutes } from 'react-router-dom';

import AppLayout from './components/AppLayout';
import routes from './routes';

import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
});

function App() {
  const routing = useRoutes([
    {
      path: '/',
      element: <AppLayout>{useRoutes(routes)}</AppLayout>,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App
