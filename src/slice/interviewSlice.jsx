import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import addNotification from "react-push-notification";
import apiURL from "../../configApi";

function getToken(){
  return sessionStorage.getItem("userToken");
}

const axiosInstance = axios.create({
  baseURL: apiURL,
});

// Axios interceptor to set token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const allocateInterview = createAsyncThunk(
  "interview/allocate",
  async (payload, { rejectWithValue }) => {
    // console.log(payload.id);
    // console.log(payload.studentsId);
    try {
      const res = await axiosInstance.post(
        `api/interview/allocate-interview/${payload.companyId}`,
        { studentsId: payload.studentsId }
      );
      console.log("sing up response:", res);
      return res;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    isLoading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // extra reducers is used to handle asynchronous data
    builder
      // SingUp cases
      .addCase(allocateInterview.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(allocateInterview.fulfilled, (state, action) => {
        // console.log("signUp payload", action.payload);
        console.log("message", action.payload.data.data.message);
        state.isLoading = false;
        state.success = action.payload.data.data.status;
        state.message = action.payload.data.data.message;
        console.log(state.message);
        addNotification({
          title: "Success",
          message: state.message,
          native: true
        })
      })
      .addCase(allocateInterview.rejected, (state, action) => {
        // console.log("rejected payload signup", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.status;
        state.message = action.payload
          ? action.payload.data.message
          : "Unknown error occurred";
        addNotification({
          title: "Error",
          message: action.payload
            ? action.payload.data.message
            : "Unknown error occurred",
          theme: "red",
          duration: 3000,
          native: true,
        });
      });
  },
});

// exporting the authslice reducer to the store
export default interviewSlice.reducer;
