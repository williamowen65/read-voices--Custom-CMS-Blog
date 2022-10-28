import {
    deleteField,
    doc,
    updateDoc,
} from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { db, storage } from "../firebase-setup";
import { setImgUrlForStory } from "../redux/storyReducer";

export default function useUploadImg({ story }) {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const { stories } = useSelector(
        (state) => state.stories
    );
    const handleFileUpload = (newStoryId) => {
        // if (newStoryId) {
        //     story = stories.filter(
        //         (el) => el.id == newStoryId
        //     )[0];
        //     console.log(
        //         "STORIES ",
        //         stories,
        //         newStoryId,
        //         story
        //     );
        // }
        if (story?.img) {
            // console.log(
            //     "TRYING TO DELETE THIS IMG",
            //     story.img
            // );
            const storageRef = ref(
                storage,
                `${story.img.name}`
            );
            deleteObject(storageRef);
            const docRef = doc(
                db,
                "stories",
                story?.id || newStoryId
            );
            const docc = {
                img: deleteField(),
            };
            updateDoc(docRef, docc)
                .then(() => {})
                .catch((err) => {
                    console.error(err);
                });
        }
        const file = document.getElementById(
            "fileDialogId"
        ).files[0];
        if (!file) return;
        const fileName = `/files/${
            file.name +
            "." +
            Math.random() +
            10000
        }`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(
            storageRef,
            file
        );
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred /
                        snapshot.totalBytes) *
                        100
                );
                setProgress(progress);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(
                    uploadTask.snapshot.ref
                ).then((url) => {
                    console.log("STORY ", story);
                    const docRef = doc(
                        db,
                        "stories",
                        story?.id || newStoryId
                    );

                    const docc = {
                        img: {
                            url,
                            name: fileName,
                        },
                    };
                    updateDoc(docRef, docc)
                        .then(() => {
                            // console.log(
                            //     "success uploading img"
                            // );
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                });
            }
        );
    };

    return { handleFileUpload, progress };
}
