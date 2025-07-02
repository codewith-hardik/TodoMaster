import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, toggleTodo, editTodo } from '../features/todo/todoSlice'
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa'

const TodoList = () => {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')

    const startEditing = (id, title) => {
        setEditingId(id)
        setEditText(title)
    }

    const handleEdit = (id) => {
        if (editText.trim() !== '') {
            dispatch(editTodo({ id, title: editText.trim() }))
            setEditingId(null)
            setEditText('')
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4">
            <div className="space-y-4">
                {todos.map(todo => (
                    <div 
                        key={todo.id}
                        className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-all duration-300 ${
                            todo.completed ? 'bg-gray-50' : ''
                        }`}
                    >
                        <button
                            onClick={() => dispatch(toggleTodo({ id: todo.id }))}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                todo.completed
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-gray-300 hover:border-green-500'
                            }`}
                        >
                            {todo.completed && <FaCheck className="text-white text-sm" />}
                        </button>

                        {editingId === todo.id ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => handleEdit(todo.id)}
                                onKeyPress={(e) => e.key === 'Enter' && handleEdit(todo.id)}
                                className="flex-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                                autoFocus
                            />
                        ) : (
                            <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                {todo.title}
                            </span>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={() => startEditing(todo.id, todo.title)}
                                className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => dispatch(removeTodo({ id: todo.id }))}
                                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                {todos.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No todos yet. Add some tasks to get started!
                    </div>
                )}
            </div>
        </div>
    )
}

export default TodoList
