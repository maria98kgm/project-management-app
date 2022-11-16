import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './themes/theme';
import './styles/style.scss';
import './i18n';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Suspense fallback="...is loading">
        <Header />
        <Outlet />
        <Footer />
      </Suspense>
    </ThemeProvider>
  );
};
