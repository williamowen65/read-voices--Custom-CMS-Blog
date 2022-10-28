import { onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
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
        useEffect(() => {
            const unsub = onSnapshot(
                orderedCol,
                (snapshot) => {
                    let stories = [];
                    snapshot.docs.forEach(
                        (story) => {
                            stories.push({
                                ...story.data(),
                                meta: {
                                    ...story.data()
                                        .meta,
                                    publishedAt:
                                        story
                                            .data()
                                            .meta.publishedAt?.toDate()
                                            ?.toDateString(),
                                    createdAt:
                                        story
                                            .data()
                                            .meta.createdAt.toDate()
                                            .toDateString(),
                                },
                                id: story.id,
                            });
                        }
                    );
                    dispatch(setStories(stories));
                }
            );

            return () => {
                unsub();
            };
        }, []);
    } catch (error) {
        console.error(error);
    }

    return null;
}
