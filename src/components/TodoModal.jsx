import React, { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaTag, FaFlag } from 'react-icons/fa';

const TodoModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [todoData, setTodoData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    tags: [],
  });
  
  // Ref for title input to focus on it when modal opens
  const titleInputRef = React.useRef(null);

  useEffect(() => {
    if (initialData) {
      setTodoData(initialData);
    } else {
      // Reset form when opening for new todo
      setTodoData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        tags: [],
      });
    }
  }, [initialData, isOpen]);
  
  // Add effect to prevent Escape key from closing the modal, handle touch events, and focus title input
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default Escape key behavior that might close the modal
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // Don't call onClose
      }
    };
    
    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      
      // Focus the title input when the modal opens
      if (titleInputRef.current) {
        setTimeout(() => {
          titleInputRef.current.focus();
        }, 100); // Small timeout to ensure the modal is fully rendered
      }
      
      // Prevent scrolling of the background content
      document.body.style.overflow = 'hidden';
      
      // Enable pointer events and touch actions on modal
      document.body.style.touchAction = 'none';
      document.documentElement.style.touchAction = 'none';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    if (todoData.title.trim() === '') {
      // Could show an error message here
      return;
    }
    
    onSubmit(todoData);
    // Let App.jsx handle the modal closing
  };
  
  // Prevent click events from propagating outside the modal content
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ touchAction: 'none' }}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" style={{ pointerEvents: 'none' }}></div>
        </div>

        {/* Modal Content */}
        <div 
          className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          style={{ position: 'relative', zIndex: 60, touchAction: 'manipulation', pointerEvents: 'auto' }}
          onClick={handleModalContentClick}
        >
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {initialData ? 'Edit Todo' : 'Create New Todo'}
                  </h3>
                  <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}>
                  {/* Title */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      ref={titleInputRef}
                      type="text"
                      name="title"
                      value={todoData.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Enter todo title"
                      required
                      style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={todoData.description}
                      onChange={handleChange}
                      rows="3"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Enter description"
                      style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                    ></textarea>
                  </div>

                  {/* Due Date */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-500" /> Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={todoData.dueDate}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                    />
                  </div>

                  {/* Priority */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <FaFlag className="mr-2 text-blue-500" /> Priority
                    </label>
                    <select
                      name="priority"
                      value={todoData.priority}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      <FaTag className="mr-2 text-blue-500" /> Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={Array.isArray(todoData.tags) ? todoData.tags.join(', ') : ''}
                      onChange={(e) => {
                        const tagsArray = e.target.value.split(',').map(tag => tag.trim());
                        setTodoData(prev => ({
                          ...prev,
                          tags: tagsArray.filter(tag => tag !== '')
                        }));
                      }}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Enter tags separated by commas"
                      style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                    >
                      {initialData ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
