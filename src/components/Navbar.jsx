import React from 'react'
import { FaTasks, FaGithub, FaTwitter } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-blue-50">
              <FaTasks className="h-7 w-7 text-blue-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                TodoMaster
              </span>
            </div>
          </div>
            
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"              
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-200"
            >
              <FaGithub className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FaTwitter className="h-5 w-5" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
