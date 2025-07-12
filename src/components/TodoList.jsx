import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, toggleTodo, editTodo } from '../features/todo/todoSlice'
import { FaTrash, FaEdit, FaCheck, FaClock, FaFlag, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const TodoList = ({ todos = null }) => {
    const allTodos = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [expandedTodos, setExpandedTodos] = useState({});

    // Use the filtered todos from props if available, otherwise use all todos from Redux
    const displayTodos = todos || allTodos;

    const startEditing = (id, title) => {
        setEditingId(id);
        setEditText(title);
    }

    const handleEdit = (id) => {
        if (editText.trim() !== '') {
            dispatch(editTodo({ id, title: editText.trim() }));
            setEditingId(null);
            setEditText('');
        }
    }

    const toggleExpandTodo = (id) => {
        setExpandedTodos(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    const getPriorityClass = (priority) => {
        switch(priority) {
            case 'high':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'medium':
            default:
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return null;
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            // Return the raw dateString if parsing fails
            return dateString;
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="space-y-4">
                {displayTodos.map(todo => {
                    const isExpanded = expandedTodos[todo.id];
                    const hasMeta = todo.description || todo.createdAt || todo.priority || todo.dueDate;
                    
                    return (
                        <div 
                            key={todo.id}
                            className={`bg-white dark:bg-gray-700 rounded-lg shadow-md transition-all duration-300 overflow-hidden ${
                                todo.completed ? 'border-l-4 border-green-500 dark:border-green-600' : 
                                todo.priority === 'high' ? 'border-l-4 border-red-500 dark:border-red-600' :
                                ''
                            }`}
                        >
                            <div className="flex items-center gap-4 p-4">
                                <button
                                    onClick={() => dispatch(toggleTodo({ id: todo.id }))}
                                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                                        todo.completed
                                            ? 'bg-green-500 border-green-500'
                                            : 'border-gray-300 hover:border-green-500 dark:border-gray-500'
                                    }`}
                                >
                                    {todo.completed && <FaCheck className="text-white text-sm" />}
                                </button>

                                <div className="flex-1">
                                    {editingId === todo.id ? (
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onBlur={() => handleEdit(todo.id)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleEdit(todo.id)}
                                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
                                            autoFocus
                                        />
                                    ) : (
                                        <div>
                                            <span className={`text-lg font-medium dark:text-white ${todo.completed ? 'line-through text-gray-500 dark:text-gray-300' : ''}`}>
                                                {todo.title}
                                            </span>
                                            
                                            {todo.priority && (
                                                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getPriorityClass(todo.priority)}`}>
                                                    {todo.priority}
                                                </span>
                                            )}
                                            
                                            {todo.createdAt && (
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                                                    <FaClock className="mr-1" /> 
                                                    Created: {formatDate(todo.createdAt)}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 items-center">
                                    {hasMeta && (
                                        <button
                                            onClick={() => toggleExpandTodo(todo.id)}
                                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                                        >
                                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => startEditing(todo.id, todo.title)}
                                        className="p-2 text-blue-500 hover:text-blue-700 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
                                        aria-label="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => dispatch(removeTodo({ id: todo.id }))}
                                        className="p-2 text-red-500 hover:text-red-700 transition-colors dark:text-red-400 dark:hover:text-red-300"
                                        aria-label="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Expandable content */}
                            {isExpanded && hasMeta && (
                                <div className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-gray-600">
                                    {todo.description && (
                                        <div className="mt-2">
                                            <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
                                                {todo.description}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {todo.dueDate && (
                                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">Due date:</span> {todo.dueDate}
                                        </div>
                                    )}
                                    
                                    {todo.completedAt && (
                                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="font-medium">Completed:</span> {formatDate(todo.completedAt)}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {displayTodos.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                        <p className="text-xl font-medium mb-2">No tasks found</p>
                        <p>Add some tasks to get started or try a different filter.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoList
