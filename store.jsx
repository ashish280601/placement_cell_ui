import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./src/slice/authSlice";
import studentSlice from "./src/slice/studentSlice";
import companySlice from "./src/slice/companySlice";
import interviewSlice from "./src/slice/interviewSlice";
import interviewResultsSlice from "./src/slice/interviewResultsSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        student: studentSlice,
        company: companySlice,
        interview: interviewSlice,
        interviewResults: interviewResultsSlice
    }
});

export default store
