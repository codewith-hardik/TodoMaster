import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{
        id: 1,
        title: "Learn Redux Toolkit",
        completed: false

    }]
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state,action) =>{
            const newTodo = {
                id: nanoid(),
                title: action.payload.title
            }
            state.todos.push(newTodo);
        },
        removeTodo: (state, action) =>{
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        clearTodos: (state) => {
            state.todos = [];
        },
        editTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.title = action.payload.title;
            }
        },
    }
})

export const { addTodo, removeTodo, toggleTodo, clearTodos, editTodo } = todoSlice.actions;
export default todoSlice.reducer;