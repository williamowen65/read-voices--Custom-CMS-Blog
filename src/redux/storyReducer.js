import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name: "story",
    initialState: {
        stories: [],
        newImg: null,
        buttons: [],
    },
    reducers: {
        setStories: (state, action) => {
            state.stories = action.payload;
        },
        setButtonsForStory: (state, action) => {
            console.log(
                "reducer ",
                action.payload
            );
            state.stories.map((story) => {
                if (
                    story.slug ===
                    action.payload.slug
                ) {
                    story.buttons =
                        action.payload.buttons;
                }
                return story;
            });
        },
        setTitleAndDescriptionForStory: (
            state,
            action
        ) => {
            state.stories.map((story) => {
                if (
                    story.slug ===
                    action.payload.slug
                ) {
                    story.title =
                        action.payload.title;
                    story.description =
                        action.payload.description;
                }
                return story;
            });
        },
        setImgUrlForStory: (state, action) => {
            /*
            payload: null || {url,name}
            */
            state.newImg = action.payload;
        },
        setButtons: (state, action) => {
            state.buttons = action.payload;
        },
    },
});

export const setStories =
    storySlice.actions.setStories;
export const setButtons =
    storySlice.actions.setButtons;
export const setImgUrlForStory =
    storySlice.actions.setImgUrlForStory;
export const setTitleAndDescriptionForStory =
    storySlice.actions
        .setTitleAndDescriptionForStory;
export const setButtonsForStory =
    storySlice.actions.setButtonsForStory;
export default storySlice.reducer;
