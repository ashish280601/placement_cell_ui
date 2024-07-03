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

export const getStudentData = createAsyncThunk(
  "get/student",
  async ({ payload, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("api/student");
      console.log("student get data", res);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

export const addStudentData = createAsyncThunk(
  "add/student",
  async (payload, { rejectWithValue }) => {
    console.log("payload", payload);
    console.log(token);
    try {
      const res = await axiosInstance.post("api/student/add", payload);
      console.log("student add slice data", res);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response : { message: error.message }
      );
    }
  }
);
const studentSlice = createSlice({
  name: "student",
  initialState: {
    isLoading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // getting all the student data
      .addCase(getStudentData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(getStudentData.fulfilled, (state, action) => {
        console.log("get student fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.status;
        state.message = action.payload.data.message;
        // console.log(state.message);
      })
      .addCase(getStudentData.rejected, (state, action) => {
        console.log("get student Rejected payload", action.payload);
        state.isLoading = false;
        state.success = action.payload.status;
        state.message = action.payload
          ? action.payload.message
          : "Unknown error occurred";
        addNotification({
          title: "Error",
          message: action.payload
            ? action.payload.message
            : "Unknown error occurred",
          theme: "red",
          duration: 3000,
          native: true,
        });
        return;
      })
      .addCase(addStudentData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(addStudentData.fulfilled, (state, action) => {
        // console.log("add student fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.status;
        state.message = action.payload.data.message;
        console.log(state.message);
        addNotification({
          title: "Success",
          message: action.payload.data.message,
          native: true,
        });
      })
      .addCase(addStudentData.rejected, (state, action) => {
        console.log("add student Rejected payload", action.payload);
        state.isLoading = false;
        state.success = action.payload.status;
        state.message = action.payload
          ? action.payload.message
          : "Unknown error occurred";
        addNotification({
          title: "Error",
          message: action.payload
            ? action.payload.message
            : "Unknown error occurred",
          theme: "red",
          duration: 3000,
          native: true,
        });
        return;
      })
  },
});

export default studentSlice.reducer;
