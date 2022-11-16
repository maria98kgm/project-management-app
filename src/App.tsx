import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './themes/theme';
import './styles/style.scss';
import './App.scss';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
};
