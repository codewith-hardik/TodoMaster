import React, { useState, useEffect } from 'react'
import ThemeContext from './ThemeContext'

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      // Get initial dark mode state from localStorage or system preference
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === 'true') return true;
      if (savedMode === 'false') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.error('Error reading dark mode preference:', error);
      return false;
    }
  });

  // Apply theme class to html element whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Also save the preference
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
