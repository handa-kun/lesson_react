import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../interface/slice';

interface TodoState {
    todos: Todo[]
};

const initialState: TodoState = {
    todos: []
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addItem(state, action) {
            state.todos.push({
                id: Number(new Date()),
                userId: Number(new Date()),
                title: action.payload,
                completed: false,
                isDeleted: false,
            });
        },
        deleteItem(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        toggleItem(state, action) {
            const toggled = state.todos.find(todo => todo.id === action.payload);
            toggled.completed = !toggled.completed
        },
    }
});

export const { addItem, deleteItem, toggleItem } = todoSlice.actions;

export default todoSlice.reducer;