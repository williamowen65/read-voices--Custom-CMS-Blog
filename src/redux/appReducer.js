import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        loggedIn: false,
        verboseLog: [],
        isEditing: false,
        activeSlug: null,
        website: [],
    },
    reducers: {
        setLoggedIn: (state, action) => {
            // console.log(state, action);
            state.loggedIn = action.payload;
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        setVerboseLog: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.verboseLog = action.payload;
            } else {
                state.verboseLog.push(
                    action.payload
                );
            }
        },
        setActiveSlug: (state, action) => {
            state.activeSlug = action.payload;
        },
        setWebsite: (state, action) => {
            state.website = action.payload;
        },
    },
});

export const setLoggedIn =
    appSlice.actions.setLoggedIn;
export const setWebsite =
    appSlice.actions.setWebsite;
export const setActiveSlug =
    appSlice.actions.setActiveSlug;
export const setIsEditing =
    appSlice.actions.setIsEditing;
export const setVerboseLog =
    appSlice.actions.setVerboseLog;

export default appSlice.reducer;
