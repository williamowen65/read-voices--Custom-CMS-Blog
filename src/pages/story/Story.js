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
        updateDoc(docRef, {
            status: status,
        })
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
                                <button
                                    onClick={() =>
                                        handleUpdate(
                                            "public"
                                        )
                                    }
                                >
                                    Publish
                                </button>
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
                            className='delBtn'
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
                        <FormTemplate />
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
