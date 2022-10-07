import React, {
    useEffect,
    useState,
} from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "../404/PageNotFound";
import "./create.scss";
import { CgClose } from "react-icons/cg";
import {
    serverTimestamp,
    Timestamp,
    addDoc,
} from "firebase/firestore";
import { colRef } from "../../firebase-setup";
import { FormTemplate } from "./FormTemplate";

const slugify = (str) => {
    if (str.indexOf(" ") === -1) {
        return str.toLowerCase();
    }
    return str.replaceAll(" ", "-").toLowerCase();
};

export default function Create() {
    const dispatch = useDispatch();
    const { loggedIn } = useSelector(
        (state) => state.app
    );
    const navigate = useNavigate();
    // const [isOffline, setIsOffline] =
    //     useState(false);
    // const [title, setTitle] = useState();
    // const [description, setDescription] =
    //     useState();

    if (!loggedIn) {
        return <PageNotFound />;
    }

    const handleSave = (status, buttons) => {
        const form = document.querySelector(
            "form.create"
        );

        const title = form.title.value;
        const date = form.date.value;
        const description =
            form.description.value;

        if (status === "draft") {
            if (!title) {
                alert(
                    "Must provide a title to save a draft"
                );
                return;
            }
        }
        if (status === "public") {
            if (
                !title ||
                !description ||
                !buttons.length
            ) {
                alert(
                    "Must provide a title, description, and at least one button to make publish"
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

        // console.log(serverTimestamp);

        const doc = {
            title,
            description,
            status,
            buttons: buttons.map((btn) => {
                delete btn.id;
                return btn;
            }),

            slug: slugify(title),
            meta: {
                createdAt: serverTimestamp(),
                publishedAt: date
                    ? Timestamp.fromDate(
                          new Date(date)
                      )
                    : status === "public"
                    ? serverTimestamp()
                    : null,
            },
        };

        addDoc(colRef, doc)
            .then((res) => {
                console.log("success saving doc");
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            });

        // console.log(doc, colRef);
    };

    return (
        <FormTemplate handleSave={handleSave} />
    );
}
// const CreateStyled = styled.div``;
