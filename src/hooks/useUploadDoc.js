import {
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import React from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-setup";
import { setIsEditing } from "../redux/appReducer";
import { slugify } from "../utilFns/slugify";

export default function useUploadDoc(
    type,
    { story }
) {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { isEditing } = useSelector(
        (state) => state.app
    );
    const { buttons } = useSelector(
        (state) => state.stories
    );

    const handleUpdate = (status, buttons) => {
        if (type == "update") {
            const docRef = doc(
                db,
                "stories",
                story.id
            );
            const title =
                document.querySelector("#title")
                    ?.value || story.title;
            const description =
                document.querySelector(
                    "#summernote"
                )?.value || story.description;
            let date = !isEditing
                ? story.meta.publishedAt
                : document.querySelector("#date")
                      ?.value || "";

            // console.log(date, date.length);

            // console.log("STATEUS: ", status);
            if (status === "public") {
                if (
                    !title ||
                    !description ||
                    !story.buttons.length
                ) {
                    alert(
                        "Hey man, You can only publish this if you have a title, description, and at least one button"
                    );
                    return;
                }
                if (!date) {
                    // eslint-disable-next-line no-restricted-globals
                    const res = confirm(
                        "You provided no publish date. Do you want to just use today as the date? You can change it later."
                    );
                    if (!res) {
                        return;
                    }
                }
            }

            let docc = {
                status: status,
                title,
                description,
                slug: slugify(title),
                buttons: story.buttons,
                meta: {
                    createdAt: Timestamp.fromDate(
                        new Date(
                            story.meta.createdAt
                        )
                    ),
                    publishedAt: date
                        ? Timestamp.fromDate(
                              new Date(date)
                          )
                        : null,
                },
            };

            if (
                status === "public" &&
                !docc.meta.publishedAt
            ) {
                docc["meta"].publishedAt =
                    serverTimestamp();
            }

            updateDoc(docRef, docc)
                .then(() => {
                    // console.log("success");
                    nav(`/story/${docc.slug}`);
                    dispatch(setIsEditing(false));
                })
                .catch((err) => {
                    console.error(err);
                });
        } else if (type == "create") {
            alert("crate");
        }
    };
    return { handleUpdate };
}
