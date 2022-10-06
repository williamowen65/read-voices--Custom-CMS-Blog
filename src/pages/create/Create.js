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

export default function Create() {
    const dispatch = useDispatch();
    const { loggedIn } = useSelector(
        (state) => state.app
    );
    const navigate = useNavigate();
    const [isOffline, setIsOffline] =
        useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] =
        useState();

    const [buttons, setButtons] = useState([]);
    const [submitted, setSubmitted] =
        useState(false);

    if (!loggedIn) {
        return <PageNotFound />;
    }

    const setTitleAndDescription = () => {
        //     const description =
        //         document.querySelector(
        //             `#summernote`
        //         ).value;
        //     const title =
        //         document.querySelector(
        //             `#title`
        //         ).value;
        //     setDescription(description);
        //     setTitle(title);
        //     return {
        //         description,
        //         title,
        //     };
    };

    return (
        <div className='storyStyle create'>
            <input
                placeholder='Title'
                autoComplete='off'
                type='text'
                id='title'
            />
            <input
                placeholder='Publish date'
                autoComplete='off'
                type='date'
                id='date'
            />
            <textarea
                className='summernote'
                id='summernote'
            ></textarea>
            <div>
                <header>Add Links</header>
                <div className='links'>
                    <div className='addLinkContainer'>
                        <input
                            type='text'
                            name='text'
                            id='text'
                            placeholder='text'
                        />
                        <input
                            type='text'
                            name='link'
                            id='link'
                            placeholder='link'
                            autoComplete='off'
                        />
                    </div>
                    <div
                        onClick={(e) => {
                            const text =
                                document.querySelector(
                                    "input#text"
                                ).value;
                            const link =
                                document.querySelector(
                                    "input#link"
                                ).value;
                            if (link && text) {
                                /* Add a check that the link works, just ping it */

                                setTitleAndDescription();
                                setButtons([
                                    ...buttons,
                                    {
                                        text,
                                        link,
                                    },
                                ]);
                            }
                        }}
                    >
                        <div className='add'>
                            +
                        </div>
                    </div>
                    <div className='newButtons'>
                        {buttons.map((e, i) => (
                            <button key={i}>
                                {e.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={() => {
                    const { title, description } =
                        setTitleAndDescription();
                    if (
                        title &&
                        description &&
                        buttons.length
                    ) {
                        // dispatch(
                        //     setNewStoryAndStatus(
                        //         {
                        //             title,
                        //             description,
                        //             meta: {
                        //                 datePublished:
                        //                     new Date()
                        //                         .toDateString()
                        //                         .slice(
                        //                             4
                        //                         ),
                        //                 status: "public",
                        //                 buttons,
                        //                 slug: slugify(
                        //                     title
                        //                 ),
                        //             },
                        //         }
                        //     )
                        // );
                        // navigate("/");
                    } else {
                        // dispatch(
                        //     setVerboseLog({
                        //         title: "must have title, description, and at least one button to publish",
                        //     })
                        // );
                    }
                }}
            >
                Publish
            </button>
            <button
                onClick={() => {
                    // const {
                    //     title,
                    //     description,
                    // } =
                    // setTitleAndDescription();

                    if (title) {
                        // dispatch(
                        //     setNewStoryAndStatus({
                        //         title,
                        //         description,
                        //         meta: {
                        //             datePublished:
                        //                 null,
                        //             status: "draft",
                        //             buttons,
                        //             slug: slugify(
                        //                 title
                        //             ),
                        //         },
                        //     })
                        // );
                        // navigate("/");
                    } else {
                        // dispatch(
                        //     setVerboseLog({
                        //         title: "must have title to save as draft",
                        //     })
                        // );
                    }
                }}
            >
                Save as Draft
            </button>
        </div>
    );
}
// const CreateStyled = styled.div``;
