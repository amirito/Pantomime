import React, { createContext, useContext, useState, useMemo } from 'react';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme } from '@react-navigation/native';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  paperTheme: typeof PaperDefaultTheme;
  navTheme: typeof NavDefaultTheme;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeMode: 'light',
  setThemeMode: () => {},
  paperTheme: PaperDefaultTheme,
  navTheme: NavDefaultTheme,
});

export const ThemeProviderCustom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const value = useMemo(() => ({
    themeMode,
    setThemeMode,
    paperTheme: themeMode === 'dark' ? PaperDarkTheme : PaperDefaultTheme,
    navTheme: themeMode === 'dark' ? NavDarkTheme : NavDefaultTheme,
  }), [themeMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeMode = () => useContext(ThemeContext);
