import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StatsCard from "./components/StatsCard";
import FilterBar from "./components/FilterBar";
import UserProfileCard from "./components/UserProfileCard";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { ToastContainer } from "./components/Toast";
import TodoModal from "./components/TodoModal";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, editTodo } from "./features/todo/todoSlice";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [sortType, setSortType] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  
  const completedTodos = todos?.filter(todo => todo.completed)?.length || 0;
  const pendingTodos = (todos?.length || 0) - completedTodos;
  
  // Update lastUpdated timestamp whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      const timestamp = new Date().toLocaleString();
      setLastUpdated(timestamp);
      
      // Store the last updated time in localStorage
      localStorage.setItem('todosLastUpdated', timestamp);
    }
  }, [todos]);
  
  // On initial load, get the last updated time from localStorage
  useEffect(() => {
    const storedTimestamp = localStorage.getItem('todosLastUpdated');
    if (storedTimestamp) {
      setLastUpdated(storedTimestamp);
    }
  }, []);

  // Apply filters, sorting, and search to todos
  useEffect(() => {
    let result = [...todos];
    
    // Apply filters
    if (filterType === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (filterType === 'pending') {
      result = result.filter(todo => !todo.completed);
    }
    
    // Apply search
    if (searchTerm) {
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply sorting
    if (sortType === 'newest') {
      // Sort by createdAt if available, otherwise by id
      result.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return b.id - a.id;
      });
    } else if (sortType === 'oldest') {
      result.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return a.id - b.id;
      });
    } else if (sortType === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'z-a') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredTodos(result);
  }, [todos, filterType, sortType, searchTerm]);

  const handleAddNewTodo = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleSubmitTodo = (todoData) => {
    if (editData) {
      // Edit existing todo
      dispatch(editTodo({ 
        id: editData.id, 
        title: todoData.title,
        // Add other fields as needed
        ...(todoData.description && { description: todoData.description }),
        ...(todoData.dueDate && { dueDate: todoData.dueDate }),
        ...(todoData.priority && { priority: todoData.priority }),
        ...(todoData.tags && { tags: todoData.tags })
      }));
      window.toastManager?.success('Todo updated successfully!');
    } else {
      // Add new todo
      dispatch(addTodo({ 
        title: todoData.title,
        completed: false,
        // Add other fields
        ...(todoData.description && { description: todoData.description }),
        ...(todoData.dueDate && { dueDate: todoData.dueDate }),
        ...(todoData.priority && { priority: todoData.priority }),
        ...(todoData.tags && { tags: todoData.tags })
      }));
      window.toastManager?.success('Todo added successfully!');
    }
    // Close the modal after successful submission
    setIsModalOpen(false);
  };

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  const handleSortChange = (sort) => {
    setSortType(sort);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const showToast = (message, type = 'success') => {
    // Ensure the toastManager is available and the message is provided
    if (window.toastManager && message) {
      // Add a small delay to ensure the toast appears after the UI update
      setTimeout(() => {
        window.toastManager[type](message);
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-200">
      <Navbar onSearch={handleSearch} />
      <main className="flex-grow py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="md:flex md:space-x-6">
            <div className="md:w-1/4 mb-6 md:mb-0">
              <UserProfileCard />
              
              {lastUpdated && (
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mt-4">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Last Updated</h3>
                  <p className="text-gray-800 dark:text-gray-200 text-sm mt-1">{lastUpdated}</p>
                </div>
              )}
            </div>
            
            <div className="md:w-3/4">
              <StatsCard 
                totalTasks={todos?.length || 0}
                completedTasks={completedTodos}
                pendingTasks={pendingTodos}
              />
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Tasks</h2>
                <button
                  onClick={handleAddNewTodo}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  Create Detailed Todo
                </button>
              </div>
              
              <FilterBar 
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onSearch={handleSearch}
              />
              
              <TodoForm onSuccess={showToast} />
              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ThemeSwitcher />
      <ToastContainer />
      <TodoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTodo}
        initialData={editData}
      />
    </div>
  );
}

export default App;
