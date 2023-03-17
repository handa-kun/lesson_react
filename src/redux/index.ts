import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';

export const rootReducer = combineReducers({
    todoReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
};
