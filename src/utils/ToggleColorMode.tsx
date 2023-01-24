import React, { useState, useMemo, createContext } from 'react';
import { Theme } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export interface ContextProps {
  mode: 'light' | 'dark' | undefined;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  toggleColorMode: () => void;
}

type ModeProps = 'light' | 'dark' | undefined;

export const ColorModeContext = createContext({});

const ToggleColorMode = ({ children }: any) => {
  const [mode, setMode] = useState<ModeProps>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
