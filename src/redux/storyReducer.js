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
            // const story = state.stories.filter(
            //     (story) => {
            //         return (
            //             story.slug ===
            //             action.payload.slug
            //         );
            //     }
            // )[0];
            // console.log(action.payload, story);
            // story.buttons.push(
            //     action.payload.buttons
            // );

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
    },
});

export const setStories =
    storySlice.actions.setStories;
export const setButtonsForStory =
    storySlice.actions.setButtonsForStory;
export default storySlice.reducer;
