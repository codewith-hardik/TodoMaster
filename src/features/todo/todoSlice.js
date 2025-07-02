import { createSlice, nanoid } from "@reduxjs/toolkit";

// Load todos from local storage if available, otherwise use default
const loadTodosFromStorage = () => {
    try {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            return JSON.parse(storedTodos);
        }
    } catch (error) {
        console.error("Error loading todos from localStorage:", error);
    }
    
    // Default initial todo
    return [{
        id: 1,
        title: "Learn Redux Toolkit",
        completed: false
    }];
};

const initialState = {
    todos: loadTodosFromStorage()
};

// Helper function to save todos to local storage
const saveTodosToStorage = (todos) => {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error("Error saving todos to localStorage:", error);
    }
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                title: action.payload.title,
                completed: action.payload.completed !== undefined ? action.payload.completed : false,
                createdAt: new Date().toISOString(),
                // Support for additional fields if provided
                ...(action.payload.description && { description: action.payload.description }),
                ...(action.payload.dueDate && { dueDate: action.payload.dueDate }),
                ...(action.payload.priority && { priority: action.payload.priority }),
                ...(action.payload.tags && { tags: action.payload.tags })
            }
            state.todos.push(newTodo);
            saveTodosToStorage(state.todos);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            saveTodosToStorage(state.todos);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? new Date().toISOString() : null;
                saveTodosToStorage(state.todos);
            }
        },
        clearTodos: (state) => {
            state.todos = [];
            saveTodosToStorage(state.todos);
        },
        editTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                // Update all provided fields
                Object.assign(todo, action.payload);
                todo.updatedAt = new Date().toISOString();
                saveTodosToStorage(state.todos);
            }
        },
        // New action to import todos (for backup/restore functionality)
        importTodos: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.todos = action.payload;
                saveTodosToStorage(state.todos);
            }
        }
    }
})

export const { 
    addTodo, 
    removeTodo, 
    toggleTodo, 
    clearTodos, 
    editTodo,
    importTodos 
} = todoSlice.actions;
export default todoSlice.reducer;