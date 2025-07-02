import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'
import { FaPlus, FaClock } from 'react-icons/fa'

const TodoForm = ({ onSuccess }) => {
    const [title, setTitle] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('medium')
    const inputRef = useRef(null)
    const formRef = useRef(null)
    const dispatch = useDispatch()

    // Focus input when expanded
    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isExpanded])

    // Handle click outside to collapse form
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Only collapse if form is empty and click is outside the form
            if (
                isExpanded && 
                formRef.current && 
                !formRef.current.contains(event.target) && 
                title.trim() === '' &&
                description.trim() === ''
            ) {
                setIsExpanded(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isExpanded, title, description])

    const handleFormClick = () => {
        if (!isExpanded) {
            setIsExpanded(true)
        }
    }

    const addTodoHandler = (e) => {
        e.preventDefault()
        if (title.trim() === '') {
            return
        }
        
        setIsSubmitting(true)
        
        // Dispatch the addTodo action with all fields
        dispatch(addTodo({ 
            title: title.trim(),
            completed: false,
            description: description.trim(),
            priority
        }))
        
        // Clear the form fields
        setTitle('')
        setDescription('')
        setPriority('medium')
        
        // Show success notification
        if (onSuccess) {
            onSuccess('Todo added successfully!')
        }
        
        // Reset states after a short delay
        setTimeout(() => {
            setIsSubmitting(false)
            
            // Only collapse if user wants a clean form after submit
            // setIsExpanded(false) // Commented out to keep form expanded
            
            // Re-focus the input for quick additional todos
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 300)
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg mb-6 transition-all duration-300">
            <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">Quick Add Task</h2>
            <form 
                ref={formRef}
                className="flex flex-col gap-3" 
                onSubmit={addTodoHandler}
                onClick={handleFormClick}
            >
                <div className="relative flex-1">
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="✍️ What needs to be done?" 
                        className="w-full p-3 pl-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        disabled={isSubmitting}
                    />
                </div>
                
                {isExpanded && (
                    <>
                        <div className="relative flex-1">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add description (optional)"
                                className="w-full p-3 pl-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                rows="2"
                                disabled={isSubmitting}
                            />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">Priority:</span>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    disabled={isSubmitting}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all flex items-center justify-center gap-2 ml-auto ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                <FaPlus className="h-4 w-4" />
                                <span>Add Task</span>
                            </button>
                        </div>
                    </>
                )}
                
                {!isExpanded && (
                    <button 
                        type="button"
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all flex items-center justify-center gap-2"
                        onClick={() => setIsExpanded(true)}
                    >
                        <FaPlus className="h-4 w-4" />
                        <span>Add Task</span>
                    </button>
                )}
            </form>
        </div>
    )
}

export default TodoForm
