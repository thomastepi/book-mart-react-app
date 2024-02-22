import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import AuthHeader from "../../utils/AuthHeader";
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post("/api/users/register", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post("/api/users/login", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    console.log(thunkAPI.getState().user);
    try {
      const response = await customFetch.patch("/api/users/update", user, AuthHeader(thunkAPI));
      return response.data;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logout: (state, action) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (action.payload) {
        toast.success(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello ${user.name}!`);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log("Error: ", action);
      state.isLoading = false;
      toast.error(action.payload);
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome back ${user.name}!`);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      const message = action.payload
        ? action.payload
        : "server error. please try again later.";
      toast.error(message);
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = { ...state.user, ...user };
      const storedUser = getUserFromLocalStorage();
      const updatedUser = { ...storedUser, ...user };
      addUserToLocalStorage(updatedUser);
      toast.success("Profile updated successfully!");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      console.log("Action Error: ", action);
      state.isLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { toggleSidebar, logout } = userSlice.actions;
export default userSlice.reducer;
