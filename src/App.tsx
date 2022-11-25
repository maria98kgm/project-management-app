import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { theme } from './themes/theme';
import { useAppSelector } from './redux/hooks';
import { selectToast } from './redux/features/toastSlice';
import './styles/style.scss';
import './i18n';

const boxStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export const App = () => {
  const toast = useAppSelector(selectToast);

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
        <Toast isOpen={toast.isOpen} severity={toast.severity} message={toast.message} />
      </Suspense>
    </ThemeProvider>
  );
};
