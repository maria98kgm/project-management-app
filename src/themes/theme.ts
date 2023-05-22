import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#6C3ED4',
          },
          secondary: {
            main: '#EBC20C',
          },
          background: {
            default: '#F1E6EA',
          },
          info: {
            main: '#fff',
          },
        }
      : {
          primary: {
            main: '#F1E6EA',
          },
          secondary: {
            main: '#EBC20C',
          },
          background: {
            default: '#6C3ED4',
          },
          info: {
            main: '#261436',
          },
        }),
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
});
