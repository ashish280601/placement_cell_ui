import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import addNotification from "react-push-notification";
import apiURL from "../../configApi";

const axiosInstance = axios.create({
  baseURL: apiURL,
});

export const getStudentData = createAsyncThunk(
  "get/student",
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem("userToken");
    console.log("token", token);
    try {
      const res = await axiosInstance.get("api/student", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("student get data", res);
      return res;
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
    const token = sessionStorage.getItem("userToken");
    console.log("token", token);
    console.log(token);
    try {
      const res = await axiosInstance.post("api/student/add", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("student add slice data", res);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
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
      // Getting all the student data
      .addCase(getStudentData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(getStudentData.fulfilled, (state, action) => {
        console.log("get student fulfilled", action.payload);
        state.isLoading = false;
        state.success = true;
        state.message = action.payload.data.message;
      })
      .addCase(getStudentData.rejected, (state, action) => {
        console.log("get student rejected payload", action.payload);
        state.isLoading = false;
        state.success = false;
        state.message = action.payload.data.message || "Unknown error occurred";
        addNotification({
          title: "Error",
          message: state.message,
          theme: "red",
          duration: 3000,
          native: true,
        });
      })
      .addCase(addStudentData.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.message = "";
      })
      .addCase(addStudentData.fulfilled, (state, action) => {
        console.log("add student fulfilled", action.payload);
        state.isLoading = false;
        state.success = true;
        state.message = action.payload.data.message;
        addNotification({
          title: "Success",
          message: state.message,
          native: true,
        });
      })
      .addCase(addStudentData.rejected, (state, action) => {
        console.log("add student rejected payload", action.payload);
        state.isLoading = false;
        state.success = false;
        state.message = action.payload ? action.payload.data.message : "Unknown error occurred";
        addNotification({
          title: "Error",
          message: state.message,
          theme: "red",
          duration: 3000,
          native: true,
        });
      });
  },
});

export default studentSlice.reducer;
