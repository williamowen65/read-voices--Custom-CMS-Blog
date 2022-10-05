import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import storyReducer from "./storyReducer";

export const store = configureStore({
    reducer: {
        app: appReducer,
        stories: storyReducer,
    },
});
