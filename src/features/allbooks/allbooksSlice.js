import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import AuthHeader from "../../utils/AuthHeader";

const initialFilterState = {
  search: "",
  price: "",
  availability: "all",
  genre: "all",
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
    const { search, availability, genre, sort, page, price } =
      thunkAPI.getState().allBooks;
    let url = `/api/books/getBooks?title=${search}&availability=${availability}&genre=${genre}&sort=${sort}&page=${page}&price=${price}`;
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
    handleChange: (state, action) => {
      state.page = 1;
      state[action.payload.name] = action.payload.value;
    },
    resetFilter: (state) => {
      Object.assign(state, initialFilterState);
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllBooks.fulfilled,
        (state, { payload: { books, totalBooks, numOfPages } }) => {
          state.isLoading = false;
          state.books = books;
          state.totalBooks = totalBooks;
          state.numOfPages = numOfPages;
        }
      )
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

export const {
  showLoading,
  hideLoading,
  handleChange,
  resetFilter,
  changePage,
} = allBooksSlice.actions;
export default allBooksSlice.reducer;
