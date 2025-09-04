import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'forest' | 'galaxy' | 'vintage';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = (availableThemes: Theme[]) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('mythic-chronicles-theme') as Theme;
    return saved && availableThemes.includes(saved) ? saved : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('mythic-chronicles-theme', theme);
    
    // Apply theme-specific CSS variables
    const root = document.documentElement;
    
    switch (theme) {
      case 'light':
        root.style.setProperty('--theme-bg-primary', '#FFFFFF');
        root.style.setProperty('--theme-bg-secondary', '#F8FAFC');
        root.style.setProperty('--theme-bg-accent', '#EEF2FF');
        root.style.setProperty('--theme-text-primary', '#1E293B');
        root.style.setProperty('--theme-text-secondary', '#475569');
        root.style.setProperty('--theme-border', '#E2E8F0');
        root.style.setProperty('--theme-accent', '#6366F1');
        break;
      case 'dark':
        root.style.setProperty('--theme-bg-primary', '#0F172A');
        root.style.setProperty('--theme-bg-secondary', '#1E293B');
        root.style.setProperty('--theme-bg-accent', '#312E81');
        root.style.setProperty('--theme-text-primary', '#F1F5F9');
        root.style.setProperty('--theme-text-secondary', '#CBD5E1');
        root.style.setProperty('--theme-border', '#334155');
        root.style.setProperty('--theme-accent', '#8B5CF6');
        break;
      case 'forest':
        root.style.setProperty('--theme-bg-primary', '#0F2F1F');
        root.style.setProperty('--theme-bg-secondary', '#1A4D2E');
        root.style.setProperty('--theme-bg-accent', '#2D5A3D');
        root.style.setProperty('--theme-text-primary', '#E8F5E8');
        root.style.setProperty('--theme-text-secondary', '#B8D4B8');
        root.style.setProperty('--theme-border', '#3A6B47');
        root.style.setProperty('--theme-accent', '#10B981');
        break;
      case 'galaxy':
        root.style.setProperty('--theme-bg-primary', '#0C0A1A');
        root.style.setProperty('--theme-bg-secondary', '#1A1625');
        root.style.setProperty('--theme-bg-accent', '#2D1B69');
        root.style.setProperty('--theme-text-primary', '#E0E7FF');
        root.style.setProperty('--theme-text-secondary', '#C7D2FE');
        root.style.setProperty('--theme-border', '#4338CA');
        root.style.setProperty('--theme-accent', '#A855F7');
        break;
      case 'vintage':
        root.style.setProperty('--theme-bg-primary', '#2A1F14');
        root.style.setProperty('--theme-bg-secondary', '#3E2723');
        root.style.setProperty('--theme-bg-accent', '#5D4037');
        root.style.setProperty('--theme-text-primary', '#F5E6D3');
        root.style.setProperty('--theme-text-secondary', '#D7CCC8');
        root.style.setProperty('--theme-border', '#8D6E63');
        root.style.setProperty('--theme-accent', '#FF8A65');
        break;
    }
  }, [theme]);

  return { theme, setTheme };
};