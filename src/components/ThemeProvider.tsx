import React, { ReactNode } from 'react';
import { ThemeContext, useThemeState, Theme } from '../hooks/useTheme';

interface ThemeProviderProps {
  children: ReactNode;
  availableThemes: Theme[];
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, availableThemes }) => {
  const themeState = useThemeState(availableThemes);

  return (
    <ThemeContext.Provider value={{ ...themeState, availableThemes }}>
      <div className={`theme-${themeState.theme} min-h-screen transition-colors duration-700`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};