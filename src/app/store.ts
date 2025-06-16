import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
