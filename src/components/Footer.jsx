import React from 'react'
import { FaHeart, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Made with</span>
            <FaHeart className="text-red-500" />
            <span>by Hardik Chavda</span>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <FaGithub className="h-6 w-6" />
            </a>
             

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TodoMaster. All rights reserved.
          </p>
           
        </div>
      </div>
    </footer>
  )
}
 
export default Footer
