import { createSlice } from '@reduxjs/toolkit';

import { fetchUserByIdQuery, searchUsersQuery } from './users.query';

const initialState = {
  searchTerm: '',
  searchResults: [],
  byId: {},
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'chatUsers',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      if (!String(action.payload).trim()) state.searchResults = [];
    },
    clearUserSearch: (state) => {
      state.searchTerm = '';
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUsersQuery.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(searchUsersQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload || [];
      })
      .addCase(searchUsersQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload || '';
        state.searchResults = [];
      })
      .addCase(fetchUserByIdQuery.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
      });
  },
});

export const { clearUserSearch, setSearchTerm } = usersSlice.actions;

export default usersSlice.reducer;
