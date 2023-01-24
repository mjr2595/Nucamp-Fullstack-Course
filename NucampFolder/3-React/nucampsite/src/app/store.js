import { configureStore } from "@reduxjs/toolkit";
import { campsiteReducer } from "../features/campsites/campsitesSlice";

export const store = configureStore({
    reducer: {
        counter: campsiteReducer,
    },
});
