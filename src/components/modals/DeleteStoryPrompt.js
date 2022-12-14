import React, {
    useEffect,
    useState,
} from "react";
import styled from "styled-components";
import BasicModal from "./BasicModal";
import "./modalStyles.scss";
import {
    doc,
    deleteDoc,
    serverTimestamp,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { db } from "../../firebase-setup";
import { useNavigate } from "react-router-dom";

export default function DeleteStoryPrompt({
    story,
    cancel,
}) {
    const nav = useNavigate();
    const [userInput, setUserInput] =
        useState("");
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (userInput === story.slug) {
            setMatches(true);
        } else {
            setMatches(false);
        }
    }, [userInput]);

    useEffect(() => {
        const btn =
            document.querySelector(".confirm");
        if (matches) {
            btn.removeAttribute("disabled");
        } else {
            btn.setAttribute("disabled", "true");
        }
    }, [matches]);

    const handleDelete = () => {
        const docRef = doc(
            db,
            "stories",
            story.id
        );
        deleteDoc(docRef).then(() => {
            nav("/");
        });
    };

    return (
        <BasicModal>
            <h4>
                Enter the slug from the url...
                /story/:slug
            </h4>
            <form
                className='deletePrompt'
                onSubmit={(e) =>
                    e.preventDefault()
                }
            >
                <input
                    type='text'
                    name='slug'
                    id='slug'
                    onChange={(e) =>
                        setUserInput(
                            e.target.value
                        )
                    }
                />
                <div className='btns'>
                    <button
                        className='confirm'
                        onClick={handleDelete}
                    >
                        Confirm Delete
                    </button>
                    <button
                        className='cancel'
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </BasicModal>
    );
}
