import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts';
import commentReducer from '../features/comments';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
