import React, { useEffect, useRef, useCallback, useState } from 'react'
import { FaTasks, FaGithub, FaTwitter, FaSearch, FaBell, FaUserCircle, FaCog, FaLinkedin } from 'react-icons/fa'

const Navbar = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navbarRef = useRef(null);
  
  // Close mobile menu when clicking outside
  const handleClickOutside = useCallback((event) => {
    if (
      navbarRef.current && 
      !navbarRef.current.contains(event.target) && 
      menuOpen
    ) {
      setMenuOpen(false);
    }
  }, [menuOpen]);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Add click outside listener
  useEffect(() => {
    // Only add the event listener if the menu is open
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      
      // Add ESC key listener
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          setMenuOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen, handleClickOutside]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch(searchTerm);
  };

  return (
    <nav 
      ref={navbarRef}
      className={`bg-white dark:bg-gray-800 transition-all duration-300 sticky top-0 z-50 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <FaTasks className="h-7 w-7 text-blue-500 dark:text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
                TodoMaster
              </span>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form className="relative w-full" onSubmit={handleSearchSubmit}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Search tasks..."
              />
            </form>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FaBell className="h-5 w-5" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-white">3</span>
              </button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <FaUserCircle className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                </button>
              </div>
            </div>
            
            {/* Settings */}
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <FaCog className="h-5 w-5" />
            </button>
          </div>
          
          {/* Hamburger menu for mobile */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menuOpen state */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} transition-all duration-200 ease-in-out`} id="mobile-menu">
          {/* Mobile Search */}
          <div className="px-2 pt-2 pb-3">
            <form className="relative" onSubmit={handleSearchSubmit}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Search tasks..."
              />
            </form>
          </div>
          
          <div className="pt-2 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4 py-2 space-x-3">
              <FaUserCircle className="h-10 w-10 text-blue-500 dark:text-blue-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Hardik Chavda</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">chavdahardik3690@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="pt-2 pb-4 space-y-1 flex flex-col items-start border-t border-gray-200 dark:border-gray-700">
            {/* Menu Items */}
            <button className="flex items-center space-x-2 px-4 py-3 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
              <FaBell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>Notifications</span>
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-3 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">
              <FaCog className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>Settings</span>
            </button>
            
            <div className="border-t border-gray-200 dark:border-gray-700 w-full pt-2 mt-2">
              <a
                href="https://github.com/codewith-hardik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-full"
              >
                <FaGithub className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/Hardik02032007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-full mt-2"
              >
                <FaTwitter className="h-5 w-5" />
                <span>Twitter</span>
              </a>
              <a
                href="https://www.linkedin.com/in/chavdahardik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg w-full mt-2"
              >
                <FaLinkedin className="h-5 w-5" />
                <span>
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
