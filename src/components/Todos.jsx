import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'



const Todos = () => {
    const todos = useSelector((state) => state.todos.todos)
    const dispatch = useDispatch()


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Todos</h2>
      <div className="space-y-4">

        {
            todos.map((todo) => (
                <div key={todo.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                    <div className="text-lg">{todo.title}</div>
                    <button 
                        onClick={() => dispatch(removeTodo(todo.id))} 
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ))
        }

      </div>
    </div>
  )
}

export default Todos
