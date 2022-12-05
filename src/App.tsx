import { Outlet } from 'react-router-dom';
import { Suspense, useState, useMemo, createContext } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Box,
  PaletteMode,
  createTheme,
} from '@mui/material';
import { getDesignTokens } from './themes/theme';
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

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const currentMode = (localStorage.getItem('themeMode') || 'light') as PaletteMode;

export const App = () => {
  const toast = useAppSelector(selectToast);
  const [mode, setMode] = useState<PaletteMode>(currentMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const currentMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', currentMode);
          return currentMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
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
    </ColorModeContext.Provider>
  );
};
