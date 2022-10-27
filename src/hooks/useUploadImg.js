import {
    doc,
    updateDoc,
} from "firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { db, storage } from "../firebase-setup";
import { setImgUrlForStory } from "../redux/storyReducer";

export default function useUploadImg({ story }) {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const handleFileUpload = (e) => {
        const file = document.getElementById(
            "fileDialogId"
        ).files[0];
        if (!file) return;
        const storageRef = ref(
            storage,
            `/files/${file.name}`
        );
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
                    const docRef = doc(
                        db,
                        "stories",
                        story.id
                    );

                    const docc = {
                        img: {
                            url,
                            name: `/files/${file.name}`,
                        },
                    };
                    updateDoc(docRef, docc)
                        .then(() => {
                            console.log(
                                "success uploading img"
                            );
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
