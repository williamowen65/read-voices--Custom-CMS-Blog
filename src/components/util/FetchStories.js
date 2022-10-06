import { onSnapshot } from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import { colRef } from "../../firebase-setup";
import { setStories } from "../../redux/storyReducer";

export default function FetchStories() {
    //get realtime data
    const dispatch = useDispatch();

    onSnapshot(colRef, (snapshot) => {
        let stories = [];
        snapshot.docs.forEach((story) => {
            stories.push({
                ...story.data(),
                meta: {
                    ...story.data().meta,
                    publishedAt: story
                        .data()
                        .meta.publishedAt.toDate()
                        .toDateString(),
                    createdAt: story
                        .data()
                        .meta.createdAt.toDate()
                        .toDateString(),
                },
                id: story.id,
            });
            // console.log(story.data());
        });
        dispatch(setStories(stories));
        // console.log(stories);
    });
    return <div></div>;
}
