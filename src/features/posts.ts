import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import axios from 'axios'

type PostState = {
  posts: Post[],
}

const initialState = {
  posts: [],
} as PostState;

export const fetchPosts = createAsyncThunk('Posts/fetch', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const addPost = createAsyncThunk('Posts/add',
  async (newPost: Omit<Post, 'id' | 'userId'>) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return response.data;
  });

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload];
      })
  },
});

export default PostSlice.reducer;
export const { actions } = PostSlice;