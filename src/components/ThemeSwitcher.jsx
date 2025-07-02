import React, { useContext, useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import ThemeContext from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
      aria-label="Toggle Dark Mode"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <FaSun className="h-6 w-6 text-yellow-500 transition-transform duration-300 transform rotate-0 hover:rotate-90" />
      ) : (
        <FaMoon className="h-6 w-6 text-blue-700 transition-transform duration-300 transform rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
