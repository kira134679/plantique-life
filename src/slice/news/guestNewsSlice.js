import { guestArticleApi } from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getNews = createAsyncThunk('guestNews/getNews', async (_, { rejectWithValue }) => {
  try {
    const res = await guestArticleApi.getArticles();
    const articles = res.articles ?? [];
    return articles.filter(article => article.tag.includes('NEWS'));
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const guestNewsSlice = createSlice({
  name: 'news',
  initialState: {
    newsList: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNews.fulfilled, (state, { payload }) => {
      state.newsList = payload;
    });
    builder.addCase(getNews.rejected, state => {
      state.newsList = [];
    });
  },
});

export const selectNewsList = state => state.guestNews.newsList;
export default guestNewsSlice.reducer;
