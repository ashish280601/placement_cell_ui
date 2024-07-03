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

export const fetchInterviewResultSlice =  createAsyncThunk(
  "get/studentResults",
  async ({ payload, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("api/results/students/marks");
      console.log("get student results data", res);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

export const addInterviewResults = createAsyncThunk(
    "interview/results",
    async (payload, { rejectWithValue }) => {
      console.log("id", payload.id);
      console.log("studentId", payload.studentId);
      console.log("result", payload.result);
      try {
        const res = await axiosInstance.post(
          `api/results/mark/${payload.id}`,
          {
            student: payload.studentId,
            result: payload.result,
          }
        );
        console.log("interview results response:", res);
        return res;
      } catch (error) {
        console.log("Error", error);
        return rejectWithValue(
          error.response ? error.response.data : { message: error.message }
        );
      }
    }
  );

  const interviewResultsSlice = createSlice({
    name: "interviewResults",
    initialState: {
      isLoading: false,
      success: false,
      message: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      // extra reducers is used to handle asynchronous data
      builder
    //   adding interview results
        .addCase(addInterviewResults.pending, (state) => {
          state.isLoading = true;
          state.success = false;
          state.message = "";
        })
        .addCase(addInterviewResults.fulfilled, (state, action) => {
          console.log("signUp payload", action.payload);
          console.log("message", action.payload.data.data.message);
          state.isLoading = false;
          state.success = action.payload.data.data.status;
          state.message = action.payload.data.data.message;
          console.log(state.message);
          addNotification({
            title: "Success",
            message: action.payload.data.data.message,
            theme: "green",
            duration: 3000,
            native: true,
          });
          return;
        })
        .addCase(addInterviewResults.rejected, (state, action) => {
          console.log("rejected payload signup", action.payload);
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
          return;
        });
    },
  });
  
  // exporting the authslice reducer to the store
  export default interviewResultsSlice.reducer;
  
  