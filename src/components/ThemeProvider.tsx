'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { themes, ThemeType } from '@/lib/theme';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = 'root' 
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(initialTheme);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      <MuiThemeProvider theme={themes[currentTheme]}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 