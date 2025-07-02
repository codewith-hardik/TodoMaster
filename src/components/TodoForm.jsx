import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

const TodoForm = () => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        if (title.trim() === '') {
            return
        }
        dispatch(addTodo({ title: title.trim(), completed: false }))
        setTitle('')
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Todo App</h1>
            <form 
                className="flex gap-4 mb-8" 
                onSubmit={addTodoHandler}
            >
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="✍️ What needs to be done?" 
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default TodoForm
