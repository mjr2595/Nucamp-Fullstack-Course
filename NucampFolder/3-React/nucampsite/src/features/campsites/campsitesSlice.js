import { CAMPSITES } from "../../app/shared/CAMPSITES";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    campsitesArray: CAMPSITES,
};

const campsiteSlice = createSlice({
    name: "campsites",
    initialState,
});

export const campsiteReducer = campsiteSlice.reducer;

export const selectAllCampsites = (state) => {
    return state.campsites.campsitesArray;
};

export const selectCampsiteById = (id) => (state) => {
    return state.campsites.campsitesArray.find((campsite) => campsite.id === parseInt(id));
};

export const selectFeaturedCampsite = (state) => {
    return state.campsites.campsitesArray.find((campsite) => campsite.featured);
};
