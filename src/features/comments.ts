import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import axios from 'axios'

type CommentState = {
  comments: Comment[],
}

const initialState = {
  comments: [],
} as CommentState;

export const fetchComments = createAsyncThunk('Comments/fetch', async (postId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  return response.data;
});

export const addComment = createAsyncThunk('Comment/add',
  async (newPost: Omit<Comment, 'id'>) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return response.data;
  });

const CommentSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })
  },
});

export default CommentSlice.reducer;
export const { actions } = CommentSlice;