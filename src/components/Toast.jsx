import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

// Toast types with their corresponding styles
const toastTypes = {
  success: {
    icon: <FaCheckCircle className="h-5 w-5" />,
    bgColor: 'bg-green-100 dark:bg-green-800',
    textColor: 'text-green-800 dark:text-green-100',
    borderColor: 'border-green-500',
    iconColor: 'text-green-500',
    shadow: 'shadow-lg shadow-green-200 dark:shadow-green-900/30'
  },
  error: {
    icon: <FaExclamationCircle className="h-5 w-5" />,
    bgColor: 'bg-red-100 dark:bg-red-800',
    textColor: 'text-red-800 dark:text-red-100',
    borderColor: 'border-red-500',
    iconColor: 'text-red-500',
    shadow: 'shadow-lg shadow-red-200 dark:shadow-red-900/30'
  },
  info: {
    icon: <FaInfoCircle className="h-5 w-5" />,
    bgColor: 'bg-blue-100 dark:bg-blue-800',
    textColor: 'text-blue-800 dark:text-blue-100',
    borderColor: 'border-blue-500',
    iconColor: 'text-blue-500',
    shadow: 'shadow-lg shadow-blue-200 dark:shadow-blue-900/30'
  }
};

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const toast = toastTypes[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Allow time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex items-center max-w-sm w-full p-4 rounded-lg border-l-4 transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${toast.bgColor} ${toast.borderColor} ${toast.shadow}`}
      role="alert"
    >
      <div className={`flex-shrink-0 ${toast.iconColor}`}>
        {toast.icon}
      </div>
      <div className={`ml-3 ${toast.textColor}`}>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 ${toast.textColor} hover:bg-opacity-20 hover:bg-gray-500 focus:outline-none`}
        aria-label="Close"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose && onClose(), 300);
        }}
      >
        <FaTimes className="h-4 w-4" />
      </button>
    </div>
  );
};

// Toast Container component to manage multiple toasts
const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  
  // Function to add a new toast
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    
    // Limit the number of toasts to prevent overwhelming the UI
    setToasts(prev => {
      const newToasts = [...prev, { id, message, type, duration }];
      // Keep only the 5 most recent toasts
      return newToasts.slice(Math.max(newToasts.length - 5, 0));
    });
    
    return id;
  };

  // Function to remove a toast by its ID
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Example of how to expose these functions globally
  useEffect(() => {
    window.toastManager = {
      success: (msg, duration = 4000) => addToast(msg, 'success', duration),
      error: (msg, duration = 5000) => addToast(msg, 'error', duration),
      info: (msg, duration = 4000) => addToast(msg, 'info', duration),
    };
  }, []);

  return (
    <div className="toast-container fixed bottom-0 right-0 z-50 p-4 space-y-3 flex flex-col-reverse items-end">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export { Toast, ToastContainer };
