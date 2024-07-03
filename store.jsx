import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./src/slice/authSlice";
import studentSlice from "./src/slice/studentSlice";
import companySlice from "./src/slice/companySlice";
import interviewResultsSlice from "./src/slice/interviewResultsSlice";
import interviewSlice from "./src/slice/interviewSlice";

const store = configureStore({
    reducer:{
        auth: authSlice,
        student: studentSlice,
        company: companySlice,
        interview: interviewSlice,
        interviewResults: interviewResultsSlice,
    }
});

export default store
