import { useState } from 'react'
import { CssBaseline, ThemeProvider, Container, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import AppLayout from './components/AppLayout';
import routes from './routes';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
});

function App() {
  const [count, setCount] = useState(0)

  const AppRoutes = () => useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
