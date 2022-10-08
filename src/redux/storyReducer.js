import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name: "story",
    initialState: {
        stories: [],
    },
    reducers: {
        setStories: (state, action) => {
            state.stories = action.payload;
        },
        setButtonsForStory: (state, action) => {
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
    },
});

export const setStories =
    storySlice.actions.setStories;
export const setTitleAndDescriptionForStory =
    storySlice.actions
        .setTitleAndDescriptionForStory;
export const setButtonsForStory =
    storySlice.actions.setButtonsForStory;
export default storySlice.reducer;
