import React, {
    Suspense,
    useEffect,
    useState,
} from "react";
import { BiShareAlt } from "react-icons/bi";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "../404/PageNotFound";
import "./story.scss";
import StoryItem from "./StoryItem";
import {
    setActiveSlug,
    setIsEditing,
} from "../../redux/appReducer";
import LoadingSpinner from "../../components/UX/Spinner";
import {
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-setup";
import { FormTemplate } from "../create/FormTemplate";
const DeleteStoryPrompt = React.lazy(() =>
    import(
        "../../components/modals/DeleteStoryPrompt"
    )
);

export default function Story() {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const { stories } = useSelector(
        (state) => state.stories
    );
    const { loggedIn, isEditing } = useSelector(
        (state) => state.app
    );
    const story = stories.filter(
        (story) => story.slug === slug
    )[0];
    useEffect(() => {
        dispatch(setActiveSlug(slug));
    }, [slug]);
    const [showDelPrompt, setShowDelPrompt] =
        useState(false);
    const handleDelPrompt = () => {
        setShowDelPrompt(true);
    };
    const handleCancelDel = () => {
        setShowDelPrompt(false);
    };
    const handleEditMode = () => {
        dispatch(setIsEditing(!isEditing));
    };
    const handleUpdate = (status) => {
        // console.log(story, story.meta.id);
        const docRef = doc(
            db,
            "stories",
            story.id
        );

        console.log("STATEUS: ", status);
        if (status === "public") {
            if (
                !story.title ||
                !story.description ||
                !story.buttons.length
            ) {
                alert(
                    "Hey man, You can only publish this if you have a title, description, and at least one button"
                );
                return;
            }
            if (!story.meta.publishedAt) {
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
            meta: {
                createdAt: Timestamp.fromDate(
                    new Date(story.meta.createdAt)
                ),
                publishedAt: story.meta
                    .publishedAt
                    ? Timestamp.fromDate(
                          new Date(
                              story.meta.publishedAt
                          )
                      )
                    : null,
            },
        };

        if (!story.meta.publishedAt) {
            docc["meta"].publishedAt =
                serverTimestamp();
        }

        updateDoc(docRef, docc)
            .then(() => {
                console.log("sucess");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    if (stories.length === 0) {
        return <LoadingSpinner />;
    }

    if (story) {
        if (
            story.status === "draft" &&
            !loggedIn
        ) {
            return <PageNotFound />;
        }
        return (
            <StoryStyled className='storyPage'>
                <Suspense>
                    {showDelPrompt ? (
                        <DeleteStoryPrompt
                            story={story}
                            cancel={
                                handleCancelDel
                            }
                        />
                    ) : null}
                </Suspense>
                {loggedIn && (
                    <>
                        <div className='draftBtns'>
                            {isEditing ? (
                                <button
                                    onClick={
                                        handleEditMode
                                    }
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    onClick={
                                        handleEditMode
                                    }
                                >
                                    Edit
                                </button>
                            )}
                            {story.status ===
                            "draft" ? (
                                <>
                                    <button
                                        onClick={() =>
                                            handleUpdate(
                                                "public"
                                            )
                                        }
                                    >
                                        Publish
                                    </button>
                                    {isEditing && (
                                        <button
                                            onClick={() =>
                                                handleUpdate(
                                                    "public"
                                                )
                                            }
                                        >
                                            Save
                                            Draft
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    {isEditing && (
                                        <button>
                                            Re-Publish
                                        </button>
                                    )}
                                    <button
                                        onClick={() =>
                                            handleUpdate(
                                                "draft"
                                            )
                                        }
                                    >
                                        Revert to
                                        Draft
                                    </button>
                                </>
                            )}
                        </div>
                        <button
                            className='delDocBtn'
                            onClick={
                                handleDelPrompt
                            }
                        >
                            Delete
                        </button>
                    </>
                )}

                <ul>
                    {isEditing ? (
                        <FormTemplate
                            story={story}
                        />
                    ) : (
                        <StoryItem
                            story={story}
                        />
                    )}
                </ul>
            </StoryStyled>
        );
    } else {
        return null;
    }
}

const StoryStyled = styled.div``;
