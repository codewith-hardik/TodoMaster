import { createContext } from 'react';

// Create context for dark mode that can be used throughout the app
const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export default ThemeContext;
