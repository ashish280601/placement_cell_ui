import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../../configApi";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: apiURL
})

// Function to retrieve token and status from sessionStorage
// const getUserToken = () => sessionStorage.getItem("userToken") || null;
// const getStatus = () => sessionStorage.getItem("status") || null;

export const createSignUp = createAsyncThunk(
  "api/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("api/auth/user/signup", payload);
      console.log("sing up response:", res.data);
      return res;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("api/auth/user/login", payload);
      console.log("login response", res);
      return res;
    } catch (error) {
      console.log("error from login", error);
      // rejectWithValue is used to handle the rejected promise error
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isTogglePassword: false,
    token: sessionStorage.getItem("userToken") || null,
    success: false,
    status: sessionStorage.getItem("status") || null,
    message: "",
  },
  reducers: {
    // it is used to manage the synchronous data
    togglePasswordVisibility: (state, action) => {
      state.isTogglePassword = !state.isTogglePassword;
    },
  },
  extraReducers: (builder) => {
    // extra reducers is used to handle asynchronous data
    builder
      // SingUp cases
      .addCase(createSignUp.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(createSignUp.fulfilled, (state, action) => {
        console.log("signUp payload", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.status;
        state.message = action.payload.data.message;
        toast.success(state.message, {
          autoClose: 3000,
          position: "bottom-right"
        })
      })
      .addCase(createSignUp.rejected, (state, action) => {
        console.log("rejected payload signup", action.payload);
        state.isLoading = false;
        state.success = action.payload.status;
        state.message = action.payload
          ? action.payload.message
          : "Unknown error occurred";
        toast.error(state.message, {
          autoClose: 3000,
          position: "bottom-right"
        })
      })
      // Login add case function
      .addCase(loginUser.pending, (state, action) => {
        console.log("login pending action payload", action.payload);
        state.isLoading = true;
        state.message = "";
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("login fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.data.status;
        state.message = action.payload.data.data.message;
        // state.token = action.payload.data.data.token
        sessionStorage.setItem("userToken", action.payload.data.data.token);
        sessionStorage.setItem("status", action.payload.data.data.status);
        // Update state with new token and status
        state.token = action.payload.data.data.token;
        state.status = action.payload.data.data.status;
        console.log("token...........", state.token);
        console.log("status.........", state.status);
        console.log(token);
        toast.success(state.message, {
          autoClose: 3000,
          position: "bottom-right"
        })
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login Rejected payload", action.payload);
        state.isLoading = false;
        state.success = action.payload.status;
        state.message = action.payload
          ? action.payload.message
          : "Unknown error occurred";
        toast.error(state.message, {
          autoClose: 3000,
          position: "bottom-right"
        })
      });
  },
});

// exporting auth action
export const { token } = authSlice.actions;
// exporting the authslice reducer to the store
export default authSlice.reducer;
