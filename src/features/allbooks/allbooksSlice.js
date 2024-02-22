import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import AuthHeader from "../../utils/AuthHeader";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  books: [],
  totalBooks: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  ...initialFilterState,
};

export const getAllBooks = createAsyncThunk(
  "allBooks/getAllBooks",
  async (_, thunkAPI) => {
    let url = "/api/books/getBooks";
    try {
      const response = await customFetch(url, AuthHeader(thunkAPI));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const showStats = createAsyncThunk(
  "allBooks/showStats",
  async (_, thunkAPI) => {
    let url = "/api/books/stats";
    try {
      const response = await customFetch(url, AuthHeader(thunkAPI));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const allBooksSlice = createSlice({
  name: "allBooks",
  initialState,
  reducers: {
    showLoading: (state) => {
        state.isLoading = true;
        },
    hideLoading: (state) => {
        state.isLoading = false;
        },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.books;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.defaultStats;
      })
      .addCase(showStats.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { showLoading, hideLoading } = allBooksSlice.actions;
export default allBooksSlice.reducer;
