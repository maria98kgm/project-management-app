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

export const App = () => {
  const toast = useAppSelector(selectToast);
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
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
