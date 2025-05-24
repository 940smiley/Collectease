import { useState } from 'react'
import { CssBaseline, ThemeProvider, Container, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Collectease
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Organize, value, and share your collectibles with ease.
        </Typography>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </Container>
    </ThemeProvider>
  )
}

export default App
