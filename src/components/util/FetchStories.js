import { onSnapshot } from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import {
    colRef,
    orderedCol,
} from "../../firebase-setup";
import { setStories } from "../../redux/storyReducer";

export default function FetchStories() {
    //get realtime data
    const dispatch = useDispatch();
    try {
        onSnapshot(orderedCol, (snapshot) => {
            let stories = [];
            snapshot.docs.forEach((story) => {
                console.log(story.data());
                stories.push({
                    ...story.data(),
                    meta: {
                        ...story.data().meta,
                        publishedAt: story
                            .data()
                            .meta.publishedAt?.toDate()
                            ?.toDateString(),
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
    } catch (error) {
        console.error(error);
    }

    return null;
}
