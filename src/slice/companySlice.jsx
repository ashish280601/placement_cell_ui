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

export const getCompanyData = createAsyncThunk(
  "get/company",
  async ({ payload, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("api/interview");
      console.log("company get data", res);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

export const addCompanyData = createAsyncThunk(
  "add/company",
  async (payload, { rejectWithValue }) => {
    console.log("payload", payload);
    console.log(token);
    try {
      const res = await axiosInstance.post("api/interview/add", payload);
      console.log("company add slice data", res);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    isLoading: false,
    success: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // case to get company
      .addCase(getCompanyData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(getCompanyData.fulfilled, (state, action) => {
        console.log("add company fulfilled", action.payload);
        state.isLoading = false;
        state.success = action.payload.data.status;
        state.message = action.payload.data.message;
        console.log(state.message);
        // addNotification({
        //   title: "Success",
        //   message: action.payload.data.message,
        //   native: true,
        // });
      })
      .addCase(getCompanyData.rejected, (state, action) => {
        console.log("add company Rejected payload", action.payload);
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
      // case to add company
      .addCase(addCompanyData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(addCompanyData.fulfilled, (state, action) => {
        console.log("add company fulfilled", action.payload);
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
      .addCase(addCompanyData.rejected, (state, action) => {
        console.log("add company Rejected payload", action.payload);
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
      });
  },
});

export default companySlice.reducer;
