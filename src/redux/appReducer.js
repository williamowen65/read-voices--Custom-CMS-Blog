import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        loggedIn: false,
        verboseLog: [],
    },
    reducers: {
        setLoggedIn: (state, action) => {
            // console.log(state, action);
            state.loggedIn = action.payload;
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
    },
});

export const setLoggedIn =
    appSlice.actions.setLoggedIn;
export const setVerboseLog =
    appSlice.actions.setVerboseLog;

export default appSlice.reducer;
