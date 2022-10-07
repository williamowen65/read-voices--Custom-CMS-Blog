import React, {
    useEffect,
    useState,
} from "react";
import styled from "styled-components";
import BasicModal from "./BasicModal";
import "./modalStyles.scss";

export default function DeleteStoryPrompt({
    story,
    cancel,
}) {
    const [userInput, setUserInput] =
        useState("");
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (userInput === story.meta.slug) {
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
                        className='cancel'
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                    <button className='confirm'>
                        Confirm Delete
                    </button>
                </div>
            </form>
        </BasicModal>
    );
}
