import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { theme } from './themes/theme';
import './styles/style.scss';
import './i18n';

const boxStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Suspense
        fallback={
          <Box sx={boxStyle}>
            <CircularProgress />
          </Box>
        }
      >
        <Header />
        <Outlet />
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
};
