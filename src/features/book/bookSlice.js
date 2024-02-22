import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { logout } from "../user/userSlice";
import {
  showLoading,
  hideLoading,
  getAllBooks,
} from "../allbooks/allbooksSlice";
import AuthHeader from "../../utils/AuthHeader";

const initialState = {
  isLoading: false,
  title: "",
  price: 0,
  author: "",
  genreOptions: [
    "Science",
    "Poetry",
    "Religion",
    "Technology",
    "History",
    "Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
  ],
  genre: "Romance",
  availabilityOptions: [
    "in-stock",
    "out-of-stock",
    "coming-soon",
    "pre-order",
    "sold-out",
  ],
  availability: "in-stock",
  isEditing: false,
  editBookId: "",
};

export const addBook = createAsyncThunk(
  "book/addBook",
  async (book, thunkAPI) => {
    try {
      const { data } = await customFetch.post(
        "/api/books/create",
        book,
        AuthHeader(thunkAPI)
      );
      thunkAPI.dispatch(clearValues());
      return data;
    } catch (error) {
      console.log("Error: ", error);
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Unauthorized! Please login again.");
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "allBooks/deleteBook",
  async (id, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const response = await customFetch.delete(
        `/api/books/delete/${id}`,
        AuthHeader(thunkAPI)
      );
      thunkAPI.dispatch(hideLoading());
      thunkAPI.dispatch(getAllBooks());
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Unauthorized! Please login again.");
      }
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (book, thunkAPI) => {
    try {
      const { data } = await customFetch.patch(
        `/api/books/update/${book.id}`,
        book,
        AuthHeader(thunkAPI)
      );
      thunkAPI.dispatch(clearValues());
      return data;
    } catch (error) {
      console.log("Error: ", error);
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Unauthorized! Please login again.");
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearValues: () => {
      return { ...initialState };
    },
    setEditBook: (state, action) => {
      const newState = action.payload;
      return { ...state, isEditing: true, ...newState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Book added successfully");
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success(action.payload);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
    builder.addCase(updateBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Book updated successfully");
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { handleChange, clearValues, setEditBook } = bookSlice.actions;
export default bookSlice.reducer;
