import { guestArticleApi } from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getArticles = createAsyncThunk('guestArticle/getArticles', async (_, { rejectWithValue }) => {
  try {
    return await guestArticleApi.getArticles({ preventGlobalLoading: true });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const guestArticleSlice = createSlice({
  name: 'article',
  initialState: {
    articleList: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getArticles.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(getArticles.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.articleList = payload.articles;
    });

    builder.addCase(getArticles.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });
  },
});

export default guestArticleSlice.reducer;
