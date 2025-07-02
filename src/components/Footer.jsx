import React from 'react'
import { FaHeart, FaTwitter, FaGithub, FaLinkedin, FaEnvelope, FaCode, FaTasks, FaStar } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <FaTasks className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">TodoMaster</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              TodoMaster helps you organize your tasks with a beautiful, intuitive interface. 
              Built with React, Redux, and Tailwind CSS.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Home</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
            </div>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Contact</h3>
            <a 
              href="mailto:chavdahardik3690@gmail.com" 
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FaEnvelope />
              <span>chavdahardik3690@gmail.com</span>
            </a>
            
            <div className="flex space-x-4 mt-2">
              <a
                href="https://x.com/Hardik02032007"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/codewith-hardik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/chavdahardik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>by Hardik Chavda</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <FaCode className="mr-2" /> with
            </span>
            <span className="flex items-center text-yellow-500">
              <FaStar className="h-4 w-4" />
              <FaStar className="h-4 w-4" />
              <FaStar className="h-4 w-4" />
              <FaStar className="h-4 w-4" />
              <FaStar className="h-4 w-4" />
            </span>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} TodoMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
 
export default Footer
